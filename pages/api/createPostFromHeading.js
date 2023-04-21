
import { promptResponse } from 'utils/apiHelpers'
import { setDoc, doc } from 'firebase/firestore'
import { firebaseDb } from 'utils/firebase'
import timestamp from 'time-stamp'
import { cleanSlug,  translateString } from 'utils/helpers'
import { languages } from 'utils/languages'
import { EditorState, ContentState } from 'draft-js'
import { convertToHTML } from 'draft-convert'

export default async function handler(req, res) {
    const { host, prompt, publishedDate, map, keywords, lang } = req.query

    const headingPrompt = `
    
        You are a professional copy writer, you are creating content meant to be read by an average 8th grader.

        Please write an article who's heading would be ${prompt}
    
    `

    try {
        const articleResponse = await promptResponse(headingPrompt)
        const headingResponse = prompt
    
        const rawArticleResponse = articleResponse.length > 0 ? articleResponse : ''
            .slice(1)
            .slice(0, -1)
            .trim()
    
        const cleanHeading = (heading) => {
            if(heading.startsWith('"')) heading = heading.slice(1)
            if(heading.endsWith('"')) heading = heading.slice(0, -1)
    
            return heading
        }
        
        const heading = cleanHeading(headingResponse)
        const content = ContentState.createFromText(rawArticleResponse)
        const editorState = EditorState.createWithContent(content)
        const html = convertToHTML(editorState.getCurrentContent())
        
        const slug = cleanSlug(heading)
        const createdAt = timestamp('YYYY/MM/DD:mm:ss')
    
        const slugs = await Promise.all(languages.map(async (language) => {
            const translatedHeading = await translateString(heading, language.code)
            const transltedSlug = cleanSlug(translatedHeading)
    
            return { lang: language.code, slug:  transltedSlug}
        }))
        
        const post = {
            slug,
            heading,
            createdAt,
            lastModified: createdAt,
            map: map || '',
            keywords,
            rawArticleResponse,
            slugs,
            articleHtml: html,
            status: 'scheduled',
            publishedDate
        }

        await setDoc(doc(firebaseDb, `/sites/${host}/langs/${lang}/posts`, slug), post)       
        return res.status(200).json(post)
    } catch (e) {
        const errorMessage = 'there was an error while running the createPost api, '
        console.log(errorMessage, e)
        res.status(500).json(errorMessage, e)
    }
}