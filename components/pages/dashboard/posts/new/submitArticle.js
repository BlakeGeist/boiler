import axios from 'axios'
import { tryXTimes } from 'utils/apiHelpers'

const getPromptReponse = async (prompt) => {
  const params = { prompt }
  const response = await axios.get('/api/getPromptReponse', { params })
  return response.data.trim()
}

const addImagePromptsToParams = async (params, promptText) => {
  const headerImagePromptParams = {
    prompt: `You are a professional copy writer, using that experience,
            please create and return an image description that would describe the header image of a web article titled "${promptText}"`,
  }
  const mediumImagePromptParams = {
    prompt: `You are a professional copy writer, using that experience,
            please create and return an image description that would describe the secondary or embedded image of a web article titled "${promptText}"`,
  }

  const headerImagePrompt = await getPromptReponse(headerImagePromptParams)
  const mediumImagePrompt = await getPromptReponse(mediumImagePromptParams)

  return { ...params, headerImagePrompt, mediumImagePrompt }
}

const performAdditionalPostOperations = async (params, posttemp, setPost) => {
  const operations = [
    { name: 'HeaderImage', endpoint: '/api/addHeaderImage' },
    { name: 'MediumImage', endpoint: '/api/addMediumImage' },
    { name: 'SecondaryPostData', endpoint: '/api/addSecondaryPostData' },
    { name: 'Categories', endpoint: '/api/addAndCreateCategories' },
    { name: 'Faqs', endpoint: '/api/addFaqsToPost' },
    { name: 'Listicle', endpoint: '/api/addListicle' },
  ]

  for (const operation of operations) {
    try {
      const res = await tryXTimes(axios.get(operation.endpoint, { params }))

      if (operation.name === 'Faqs') {
        posttemp = { ...posttemp, faqs: res.data }
      } else if (operation.name === 'Listicle') {
        const { listicleHeading, listicleDescription, listicleItems } = res.data
        posttemp = { ...posttemp, listicleHeading, listicleDescription, listicleItems }
      } else {
        posttemp = { ...posttemp, ...res.data }
      }

      setPost(posttemp)
    } catch (error) {
      console.error(`there was an error while creating the ${operation.name}: ${error}`)
    }
  }

  return posttemp
}

export const submitArticle = async (
    promptText, e, setStep, setPost, host, setHtml, setLoading, post, keywords, router
) => {
  e.preventDefault()
  const mappedKeywords = keywords?.map((k) => `"${k}"`)
  let params = {
    host,
    prompt: promptText,
    headingText: promptText,
    map: e.target.map.value,
    keywords: `${mappedKeywords}`.replace(',', ', '),
    lang: 'en',
  }

  setStep(3)
  setLoading(true)

  let posttemp = {}

  try {
    const res = await tryXTimes(axios.get('/api/createPost', { params }))
    setPost(res.data)
    posttemp = res.data
    setStep(4)
    setHtml(res.data.articleHtml)
    params = { ...params, slug: res.data.slug }
    params = await addImagePromptsToParams(params, promptText)
    posttemp = await performAdditionalPostOperations(params, posttemp, setPost)

    setPost(posttemp)
    setLoading(false)
    router.push(`/dashboard/posts/drafts/${posttemp.slug}`)
} catch (error) {
    setLoading(false)
    console.error(`there was an error while creating the initial post: ${error}`)
    }
}