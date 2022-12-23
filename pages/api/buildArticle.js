import { Configuration, OpenAIApi } from 'openai'
import slugify from 'slugify'
import { firebaseDb } from 'utils/firebase'
import { setDoc, doc, addDoc, collection } from 'firebase/firestore'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import got from 'got'
import sharp from 'sharp'

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API
})

const openai = new OpenAIApi(configuration)

const promptResponse = async (propmt) => {
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: propmt,
        temperature: 0,
        max_tokens: 4000,
        top_p: 1,
        frequency_penalty: 0.2,
        presence_penalty: 0,
    }).catch(e => console.log(e.response.data.error))

    return response?.data?.choices[0].text
}

const imageResponse = async (propmt, size) => {
    
    let daSize = '1024x1024'
    if(size === 'medium') daSize = '512x512' 
    if(size === 'small') daSize = '256x256' 
    
    const response = await openai.createImage({
        prompt: propmt,
        n: 1,
        size: daSize,
      }).catch(e => console.log(e.response.data.error))
    return response.data.data[0].url
}

export default async function handler(req, res) {
    const { host, prompt } = req.query

    const concept = prompt

    const articlePromt = `Create an article related to ${concept}, use at least 900 words, site at least 2 sources`
    const metaTitlePrompt = `Create a meta title for the previous ${concept} article`
    const metaDescriptionPrompt = `Create a meta description for the previous ${concept} article`
    const headingPrompt = `Create an article heading description for the previous ${concept} article`
    const shortDescriptionPromt = `Create a short description using at least 250 words for the previous ${concept} article`
    const summaryPrompt = `Create a summary of the previous ${concept} article`
    const listiclePrompt  = `Create a listicle related to the previous ${concept} article`
    const faqsPrompt = `Create 5 faqs related to the previous ${concept} article`
    const categoriesPrompt = `Create 3 to 5 categories previous ${concept} article could fall into`

    const articleResponse = await promptResponse(articlePromt)
    const metaTitleResponse = await promptResponse(metaTitlePrompt)
    const metaDescriptionResponse = await promptResponse(metaDescriptionPrompt)
    const headingResponse = await promptResponse(headingPrompt)
    const shortDescriptionResponse = await promptResponse(shortDescriptionPromt)
    const summaryResponse = await promptResponse(summaryPrompt)
    const listicleResponse = await promptResponse(listiclePrompt)
    const faqsResponse = await promptResponse(faqsPrompt)
    const categoriesResponse = await promptResponse(categoriesPrompt)

    const slug = slugify(headingResponse)
        .trim()
        .replace(":", "")
        .toLowerCase()

    const heading = headingResponse
        .trim()
    
    const rawArticleResponse = articleResponse
        .slice(1)
        .slice(0, -1)
        .trim()

    const faqsArray = faqsResponse.split(/\r?\n/)
    const faqsAsArrayItems = faqsArray.map(faq => {if(faq.length > 0) return faq}).filter(Boolean)
    const faqs = faqsAsArrayItems.map((faq, i) => {
        if(i % 2 !== 0) return 

        const cleanAnswer = (string) => {
            if(string.startsWith('Answer: ')) string = string.slice(8)
            if(string.startsWith('Answer:')) string = string.slice(7)
            if(string.startsWith('A: ')) string = string.slice(3)
            if(string.startsWith('A:')) string = string.slice(2)
            if(string.startsWith('A')) string = string.slice(1)

            return string
        }

        const cleanQuestion = (string) => {
            string = string.slice(3)
            return string
        }

        const tempFaq = {
            question: cleanQuestion(faq),
            answer: cleanAnswer(faqsAsArrayItems[i+1])
        }
        return tempFaq
    }).filter(Boolean)

    const listicleArray = listicleResponse.split(/\r?\n/)
    const listicleArrayItems = listicleArray.map(listItem => {if(listItem.length > 0) return listItem}).filter(Boolean)

    const listicleHeading = listicleArrayItems[0]
    const numberedListicleItems = listicleArrayItems.slice(1)
    const listicleItems = numberedListicleItems.map((listItem, i) => {
        const checkFor = `${i+1}. `
        if(listItem.startsWith(checkFor)) listItem = listItem.slice(checkFor.length).trim()

        return listItem
    })

    const categoriesArray = categoriesResponse.split(/\r?\n/)
    const categoriesArrayItems = categoriesArray.map(listItem => {if(listItem.length > 0) return listItem}).filter(Boolean)
    const categories = categoriesArrayItems.map((category, i) => {
        const checkFor = `${i+1}. `
        if(category.startsWith(checkFor)) category = category.slice(checkFor.length).trim()

        return category
    })

    const content = ContentState.createFromText(rawArticleResponse)
    const editorState = EditorState.createWithContent(content)
    const contentFromText = editorState.getCurrentContent()
    const article = JSON.stringify(convertToRaw(contentFromText))

    let headerImage

    const image = await imageResponse(prompt, 'large')
    let dafile = await got(image)
    
    const dastorage = getStorage()
    const dastorageRef = ref(dastorage, 'file-name-resized.jpg')    

    await sharp(dafile['rawBody'])
        .extract({ left: 0, top: 450, width: 1024, height: 350 })
        .jpeg({ mozjpeg: true })
        .toBuffer()
        .then( async (data) => {
            await uploadBytes(dastorageRef, data).then( async (snapshot) => {
                await getDownloadURL(snapshot.ref).then( (downloadURL) => {
                    headerImage = downloadURL
                    console.log('File available at', downloadURL)
                  })
        
            }).catch(e => console.log(e))

        })
        .catch( err => console.log(err))

    let mediumImageSrc
    const mediumImage = await imageResponse(prompt, 'medium')
    let mediumImageFile = await got(mediumImage)        
    const mediumImageFileRef = ref(dastorage, 'file-name-resized-medium.jpg')    

    await uploadBytes(mediumImageFileRef, mediumImageFile['rawBody']).then( async (snapshot) => {
        await getDownloadURL(snapshot.ref).then( (downloadURL) => {
            mediumImageSrc = downloadURL
            console.log('File available at', downloadURL)
          })

    }).catch(e => console.log(e))

    const post = {
        article: article,
        metaTitle: metaTitleResponse,
        metaDescription: metaDescriptionResponse,
        shortDescription: shortDescriptionResponse,
        summary: summaryResponse,
        listicleHeading,
        slug,
        heading,
        categories,
        headerImage,
        mediumImageSrc
    }

    await setDoc(doc(firebaseDb, "sites", host, "posts", slug), post)
        .then(() => {
            faqs.forEach(faq => {
                addDoc(
                    collection(firebaseDb, "sites", host, "posts", slug, "faqs"),
                    faq
                )
            })
            listicleItems.forEach(listItem => {
                addDoc(
                    collection(firebaseDb, "sites", host, "posts", slug, "listItems"),
                    { listItem }
                )                
            })
        })

    //console.log(post)

    res.status(200).json(post)
}
  