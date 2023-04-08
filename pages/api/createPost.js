
import { promptResponse } from 'utils/apiHelpers'
import { setDoc, doc } from 'firebase/firestore'
import { firebaseDb } from 'utils/firebase'
import timestamp from 'time-stamp'
import { cleanSug,  translateString } from 'utils/helpers'
import { languages } from 'utils/languages'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import { convertToHTML } from 'draft-convert'

export default async function handler(req, res) {
    const { host, prompt, headingText, map, keywords, lang } = req.query

    const articlePromt = `Using at least 900 words and including each the following phrases at least once '${keywords}' within the main contents body create an article realted to "${prompt}"`
    const headingPrompt = `Create an article heading description for the previous ${prompt} article`

    try {
        const articleResponse = await promptResponse(articlePromt)
        const headingResponse = headingText ? headingText : await promptResponse(headingPrompt)
    
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
        const contentFromText = editorState.getCurrentContent()
        const article = JSON.stringify(convertToRaw(contentFromText))    
        const html = convertToHTML(editorState.getCurrentContent())
        console.log(html)

        
        const slug = cleanSug(heading)
        const createdAt = timestamp('YYYY/MM/DD:mm:ss')
    
        const slugs = await Promise.all(languages.map(async (language) => {
            const translatedHeading = await translateString(heading, language.code)
            const transltedSlug = cleanSug(translatedHeading)
    
            return { lang: language, slug:  transltedSlug}
        }))
    

        
        const post = {
            article,
            slug,
            heading,
            createdAt,
            map,
            keywords,
            rawArticleResponse,
            slugs,
            articleHtml: html
        }        

        await setDoc(doc(firebaseDb, `/sites/${host}/langs/${lang}/posts`, slug), post)       
        return res.status(200).json(post)
    } catch (e) {
        const errorMessage = 'there was an error while running the createPost api, '
        console.log(errorMessage, e)
        res.status(500).json(errorMessage, e)
    }
}