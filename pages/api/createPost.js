
import { promptResponse } from 'utils/apiHelpers'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import slugify from 'slugify'
import { setDoc, doc } from 'firebase/firestore'
import { firebaseDb } from 'utils/firebase'
import timestamp from 'time-stamp'

export default async function handler(req, res) {
    const { host, prompt, headingText } = req.query

    const articlePromt = `Create an article related to ${prompt}, use at least 900 words`
    const headingPrompt = `Create an article heading description for the previous ${prompt} article`

    const articleResponse = await promptResponse(articlePromt)
    const headingResponse = headingText ? headingText : await promptResponse(headingPrompt)

    const rawArticleResponse = articleResponse
        .slice(1)
        .slice(0, -1)
        .trim()

    const cleanHeading = (heading) => {
        if(heading.startsWith('"')) heading = heading.slice(1)
        if(heading.endsWith('"')) heading = heading.slice(0, -1)

        return heading
    }
    
    let heading = cleanHeading(headingResponse)

    const content = ContentState.createFromText(rawArticleResponse)
    const editorState = EditorState.createWithContent(content)
    const contentFromText = editorState.getCurrentContent()
    const article = JSON.stringify(convertToRaw(contentFromText))    

    const cleanSug = (rawSlug) => {
        let slug = slugify(rawSlug).trim().toLowerCase()
        slug = slug.replace("'", '')
        slug = slug.replace('"', '')
        slug = slug.replace(":", '')
        slug = slug.replace(".", '')

        return slug
    }

    const slug = cleanSug(heading)

    const createdAt = timestamp('YYYY/MM/DD:mm:ss')

    const post = {
        article: article,
        slug,
        heading,
        createdAt
    }

    await setDoc(doc(firebaseDb, "sites", host, "posts", slug), post)
        .then(() => {
            res.status(200).json(post)
        }).catch((e) => {
            res.status(500).json(e)
        })
}