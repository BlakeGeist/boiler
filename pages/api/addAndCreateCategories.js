
import { promptResponse } from 'utils/apiHelpers'
import { cleanSug } from 'utils/helpers'
import { updateDoc, doc, setDoc } from 'firebase/firestore'
import { firebaseDb } from 'utils/firebase'

export default async function handler(req, res) {

    const { host, prompt, slug, lang } = req.query

    const categoriesPrompt = `Create 3 to 5 categories previous ${prompt} article could fall into`

    const categoriesResponse = await promptResponse(categoriesPrompt)

    const categoriesArray = categoriesResponse.split(/\r?\n/).filter(Boolean)

    const categoriesArrayItems = categoriesArray.map(listItem => {if(listItem.length > 0) return listItem}).filter(Boolean)
    const categories = categoriesArrayItems.map((category, i) => {
        const checkFor = `${i+1}. `
        if(category.startsWith(checkFor)) category = category.slice(checkFor.length).trim()

        return {
            name: category,
            slug: cleanSug(`${category.name}`)
        }
    })

    const post = {
        categories
    }

    const postRef = doc(firebaseDb, `/sites/${host}/langs/en/posts`, slug)

    await updateDoc(postRef, post).then(() => {
        categories.forEach(async category => {
            const categoryDesc = `Create a description for the category ${category.name} related to a pet blog, use at least 300 words and no more than 600 words`
            const categoryMetaDesc = `Create a meta description for the category ${category.name} related to a pet blog`
            const categoryMetaTitle = `Create a meta title for the category ${category.name} related to a pet blog`

            const categoryDescResponse = await promptResponse(categoryDesc)
            const categoryMetaDescResponse = await promptResponse(categoryMetaDesc)
            const categoryMetaTitleResponse = await promptResponse(categoryMetaTitle)

            const slug = cleanSug(category)

            const tempCat = {
                name: category.name,
                description: categoryDescResponse,
                categoryMetaDesc: categoryMetaDescResponse,
                categoryMetaTitle: categoryMetaTitleResponse,
                slug
            }

            await setDoc(doc(firebaseDb, `/sites/${host}/langs/${lang}/categories`, slug), tempCat)
        })

        res.status(200).json(post)
    }).catch((e) => {
        console.log('error:, ', e)
        res.status(500).json(e)
    })


}