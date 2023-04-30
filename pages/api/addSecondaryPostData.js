
import { promptResponse } from 'utils/apiHelpers'
import { updateDoc, doc } from 'firebase/firestore'
import { firebaseDb } from 'utils/firebase'
import { removeStartingAndEndingQuote } from 'utils/helpers'

export default async function handler(req, res) {
    const { host, prompt, slug, lang } = req.query

    const metaTitlePrompt = `Create a meta title for the previous ${prompt} article`
    const metaDescriptionPrompt = `Create a meta description for the previous ${prompt} article`
    const shortDescriptionPromt = `Create a short description using at least 250 words for the previous ${prompt} article`
    const summaryPrompt = `Create a summary of the previous ${prompt} article`
    const quotePrompt = `return a random famous quote related to ${prompt}`

    try {
        const metaTitleResponse = await promptResponse(metaTitlePrompt)
        const metaDescriptionResponse = await promptResponse(metaDescriptionPrompt)
        const shortDescriptionResponse = await promptResponse(shortDescriptionPromt)
        const summaryResponse = await promptResponse(summaryPrompt)
        const quoteResponse = await promptResponse(quotePrompt)
    
        const metaTitle = removeStartingAndEndingQuote(metaTitleResponse)
        const metaDescription = removeStartingAndEndingQuote(metaDescriptionResponse)
        const shortDescription = removeStartingAndEndingQuote(shortDescriptionResponse)
        const summary = removeStartingAndEndingQuote(summaryResponse)
        const quote = removeStartingAndEndingQuote(quoteResponse)
    
        const post = {
            metaTitle,
            metaDescription,
            shortDescription,
            summary,
            quote
        }
    
        const postRef = doc(firebaseDb, `/sites/${host}/langs/${lang}/posts`, slug)
        
        await updateDoc(postRef, post)
        return res.status(200).json(post)
    } catch (e) {
        const errorMessage = 'there was an error while running the addSecondaryPostData api, '
        console.error(errorMessage, e)
        res.status(500).json(errorMessage, e)
    }
}