import { Configuration, OpenAIApi } from 'openai'
import slugify from 'slugify'
import { firebaseDb } from 'utils/firebase'
import { setDoc, doc } from 'firebase/firestore'
import { EditorState, convertToRaw, ContentState } from 'draft-js'

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

export default async function handler(req, res) {
    const { host, prompt } = req.query

    const concept = prompt

    const articlePromt = `Create an article related to ${concept}, use at least 900 words, site at least 2 sources`
    const metaTitlePrompt = `Create a meta title for the previous ${concept} article`
    const metaDescriptionPrompt = `Create a meta description for the previous ${concept} article`
    const headingPrompt = `Create an article heading description for the previous ${concept} article`
    const shortDescriptionPromt = `Create a short description using at least 250 words for the previous ${concept} article`
    const summaryPrompt = `Create a summary of the previous ${concept} article`
    //const listiclePrompt  = `Create a listicle related to the previous ${concept} article`
    //const faqsPrompt = `Create 5 faqs related to the previous ${concept} article`

    const articleResponse = await promptResponse(articlePromt)
    const metaTitleResponse = await promptResponse(metaTitlePrompt)
    const metaDescriptionResponse = await promptResponse(metaDescriptionPrompt)
    const headingResponse = await promptResponse(headingPrompt)
    const shortDescriptionResponse = await promptResponse(shortDescriptionPromt)
    const summaryResponse = await promptResponse(summaryPrompt)
    //const listicleResponse = await promptResponse(listiclePrompt)
    //const faqsResponse = await promptResponse(faqsPrompt)

    const slug = slugify(headingResponse)
        .trim()
        .slice(1)
        .slice(0, -1)
        .replace(":", "")
        .toLowerCase()

    const heading = headingResponse
        .trim()
        .slice(1)
        .slice(0, -1)
        .trim()
    
    const rawArticleResponse = articleResponse
        .slice(1)
        .slice(0, -1)
        .trim()

    const content = ContentState.createFromText(rawArticleResponse)
    const editorState = EditorState.createWithContent(content)
    const contentFromText = editorState.getCurrentContent()
    const article = JSON.stringify(convertToRaw(contentFromText))

    const post = {
        article: article,
        metaTitle: metaTitleResponse,
        metaDescription: metaDescriptionResponse,
        shortDescription: shortDescriptionResponse,
        summary: summaryResponse,
        slug,
        heading        
    }

    setDoc(doc(firebaseDb, "sites", host, "posts", slug), post)

    console.log(post)

    res.status(200).json(post)
}
  