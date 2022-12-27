
import { promptResponse } from 'utils/apiHelpers'
import { updateDoc, doc, setDoc } from 'firebase/firestore'
import { firebaseDb } from 'utils/firebase'
import slugify from 'slugify'

export default async function handler(req, res) {
    const { host, prompt, slug } = req.query

    const categoriesPrompt = `Create 3 to 5 categories previous ${prompt} article could fall into`

    const categoriesResponse = await promptResponse(categoriesPrompt)

    const categoriesArray = categoriesResponse.split(/\r?\n/)
    const categoriesArrayItems = categoriesArray.map(listItem => {if(listItem.length > 0) return listItem}).filter(Boolean)
    const categories = categoriesArrayItems.map((category, i) => {
        const checkFor = `${i+1}. `
        if(category.startsWith(checkFor)) category = category.slice(checkFor.length).trim()

        return category
    })

    const post = {
        categories
    }

    const postRef = doc(firebaseDb, "sites", host, "posts", slug)

    await updateDoc(postRef, post).then(() => {
        categories.forEach(async category => {
            const categoryDesc = `Create a description for the category ${category} related to a pet blog, use at least 300 words and no more than 600 words`
            const categoryMetaDesc = `Create a meta description for the category ${category} related to a pet blog`
            const categoryMetaTitle = `Create a meta title for the category ${category} related to a pet blog`

            const categoryDescResponse = await promptResponse(categoryDesc)
            const categoryMetaDescResponse = await promptResponse(categoryMetaDesc)
            const categoryMetaTitleResponse = await promptResponse(categoryMetaTitle)

            const cleanSug = (rawSlug) => {
                let slug = slugify(rawSlug).trim().toLowerCase()
        
                if(slug.startsWith('"')) slug = slug.slice(1)
                if(slug.endsWith('"')) slug = slug.slice(0, -1)
                slug = slug.replace("'", '')
                slug = slug.replace(":", '')
        
                return slug
            }

            const slug = cleanSug(category)

            const tempCat = {
                name: category,
                description: categoryDescResponse,
                categoryMetaDesc: categoryMetaDescResponse,
                categoryMetaTitle: categoryMetaTitleResponse,
                slug
            }

            await setDoc(doc(firebaseDb, "sites", host, "categories", slug), tempCat)
        })

        res.status(200).json(post)
    }).catch((e) => {
        console.log(e)
        res.status(500).json(e)
    })


}