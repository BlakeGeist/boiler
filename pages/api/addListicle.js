
import { promptResponse } from 'utils/apiHelpers'
import { doc, updateDoc } from 'firebase/firestore'
import { firebaseDb } from 'utils/firebase'

export default async function handler(req, res) {
    const { host, prompt, slug, lang } = req.query

    const cleanResponse = (string) => {
        if(!string) return ''

        if(string.startsWith('"')) string = string.slice(1)
        if(string.endsWith('"')) string = string.slice(0, -1)

        return string
    }    

    const listiclePrompt  = `Create a numbered listicle without a header related to the previous ${prompt} article`
    const listicleHeaderPrompt = `Create a header for the previous ${prompt} listicle, do not include html tags`
    const listicleDescriptionPrompt = `Create a description for the previous ${prompt} listicle, do not include html tags, use no more that 300 words total`

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

    const listicleHeading = cleanResponse(listicleHeaderResponse)
    const listicleDescription = cleanResponse(listicleDescriptionResponse)

    const post = {
        listicleHeading,
        listicleDescription,
        listicleItems
    }

    const postRef = doc(firebaseDb, `/sites/${host}/langs/${lang}/posts`, slug)

    await updateDoc(postRef, post).then(() => {
        res.status(200).json(post)
    }).catch((e) => {
        console.log(e)
        res.status(500).json(e)
    })    
}