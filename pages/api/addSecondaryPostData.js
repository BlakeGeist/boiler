
import { promptResponse } from 'utils/apiHelpers'
import { updateDoc, doc } from 'firebase/firestore'
import { firebaseDb } from 'utils/firebase'

export default async function handler(req, res) {
    const { host, prompt, slug } = req.query

    const metaTitlePrompt = `Create a meta title for the previous ${prompt} article`
    const metaDescriptionPrompt = `Create a meta description for the previous ${prompt} article`
    const shortDescriptionPromt = `Create a short description using at least 250 words for the previous ${prompt} article`
    const summaryPrompt = `Create a summary of the previous ${prompt} article`
    const categoriesPrompt = `Create 3 to 5 categories previous ${prompt} article could fall into`
    
    const metaTitleResponse = await promptResponse(metaTitlePrompt)
    const metaDescriptionResponse = await promptResponse(metaDescriptionPrompt)
    const shortDescriptionResponse = await promptResponse(shortDescriptionPromt)
    const summaryResponse = await promptResponse(summaryPrompt)
    const categoriesResponse = await promptResponse(categoriesPrompt)

    const categoriesArray = categoriesResponse.split(/\r?\n/)
    const categoriesArrayItems = categoriesArray.map(listItem => {if(listItem.length > 0) return listItem}).filter(Boolean)
    const categories = categoriesArrayItems.map((category, i) => {
        const checkFor = `${i+1}. `
        if(category.startsWith(checkFor)) category = category.slice(checkFor.length).trim()

        return category
    })

    const post = {
        metaTitle: metaTitleResponse,
        metaDescription: metaDescriptionResponse,
        shortDescription: shortDescriptionResponse,
        summary: summaryResponse,
        categories
    }

    const postRef = doc(firebaseDb, "sites", host, "posts", slug)

    await updateDoc(postRef, post).then(() => {
        res.status(200).json(post)
    }).catch((e) => {
        console.log(e)
        res.status(500).json(e)
    })
}