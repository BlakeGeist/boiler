
import { promptResponse } from 'utils/apiHelpers'
import { doc, updateDoc } from 'firebase/firestore'
import { firebaseDb } from 'utils/firebase'
import { removeStartingAndEndingQuote } from 'utils/helpers'

export default async function handler(req, res) {
    const { host, prompt, slug, lang } = req.query

    const listiclePrompt  = `Create a numbered listicle without a header related to the previous ${prompt} article`
    const listicleHeaderPrompt = `Create a header for the previous ${prompt} listicle, do not include html tags`
    const listicleDescriptionPrompt = `Create a description for the previous ${prompt} listicle, do not include html tags, use no more that 300 words total`

    try {
        const listicleResponse = await promptResponse(listiclePrompt)
        const listicleHeaderResponse = await promptResponse(listicleHeaderPrompt)
        const listicleDescriptionResponse = await promptResponse(listicleDescriptionPrompt)
    
        const listicleArray = listicleResponse.split(/\r?\n/)
        const listicleArrayItems = listicleArray.map(listItem => {if(listItem.length > 0) return listItem}).filter(Boolean)
    
        const listicleItems = listicleArrayItems.map((listItem, i) => {
            const checkFor = `${i+1}. `
            if(listItem.startsWith(checkFor)) listItem = listItem.slice(checkFor.length).trim()
    
            return listItem
        })
    
        const listicleHeading = removeStartingAndEndingQuote(listicleHeaderResponse)
        const listicleDescription = removeStartingAndEndingQuote(listicleDescriptionResponse)
    
        const post = {
            listicleHeading,
            listicleDescription,
            listicleItems
        }
    
        const postRef = doc(firebaseDb, `/sites/${host}/langs/${lang}/posts`, slug)
    
        await updateDoc(postRef, post)
        return res.status(200).json(post)
    } catch (e) {
        const errorMessage = 'there was an error while running the addListicle api, '
        console.error(errorMessage, e)
        res.status(500).json(errorMessage, e)
    }
}