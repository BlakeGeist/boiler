
import { promptResponse } from 'utils/apiHelpers'
import { updateDoc, doc } from 'firebase/firestore'
import { firebaseDb } from 'utils/firebase'

export default async function handler(req, res) {
    const { host, prompt, slug, lang } = req.query

    const metaTitlePrompt = `Create a meta title for the previous ${prompt} article`
    const metaDescriptionPrompt = `Create a meta description for the previous ${prompt} article`
    const shortDescriptionPromt = `Create a short description using at least 250 words for the previous ${prompt} article`
    const summaryPrompt = `Create a summary of the previous ${prompt} article`
    const quotePrompt = `return a random famous quote related to ${prompt}`
    
    const metaTitleResponse = await promptResponse(metaTitlePrompt)
    const metaDescriptionResponse = await promptResponse(metaDescriptionPrompt)
    const shortDescriptionResponse = await promptResponse(shortDescriptionPromt)
    const summaryResponse = await promptResponse(summaryPrompt)
    const quoteResponse = await promptResponse(quotePrompt)

    const cleanResponse = (string) => {
        if(!string) return ''

        string=string.trim()
        if(string.startsWith('"')) string = string.slice(1)
        if(string.endsWith('"')) string = string.slice(0, -1)

        return string
    }

    const metaTitle = cleanResponse(metaTitleResponse)
    const metaDescription = cleanResponse(metaDescriptionResponse)
    const shortDescription = cleanResponse(shortDescriptionResponse)
    const summary = cleanResponse(summaryResponse)
    const quote = cleanResponse(quoteResponse)

    const post = {
        metaTitle,
        metaDescription,
        shortDescription,
        summary,
        quote
    }

    const postRef = doc(firebaseDb, `/sites/${host}/langs/${lang}/posts`, slug)

    await updateDoc(postRef, post).then(() => {
        res.status(200).json(post)
    }).catch((e) => {
        console.log(e)
        res.status(500).json(e)
    })
}