
import { promptResponse } from 'utils/apiHelpers'
import { setDoc, doc } from 'firebase/firestore'
import { firebaseDb } from 'utils/firebase'
import timestamp from 'time-stamp'
import { cleanSug, getContentFromText } from 'utils/helpers'

export default async function handler(req, res) {
    const { host, prompt, headingText, map, keywords, lang } = req.query

    const articlePromt = `Using at least 900 words and including each the following phrases at least once '${keywords}' within the main contents body create an article realted to "${prompt}"`
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
    
    const heading = cleanHeading(headingResponse)

    const article = getContentFromText(rawArticleResponse)

    const slug = cleanSug(heading)

    const createdAt = timestamp('YYYY/MM/DD:mm:ss')

    const post = {
        article,
        slug,
        heading,
        createdAt,
        map,
        keywords,
        rawArticleResponse
    }

    await setDoc(doc(firebaseDb, `/sites/${host}/langs/${lang}/posts`, slug), post)
        .then(() => {
            res.status(200).json(post)
        }).catch((e) => {
            console.log('error: ', e)
            res.status(500).json(e)
        })
}