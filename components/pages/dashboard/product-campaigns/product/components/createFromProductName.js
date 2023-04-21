import axios from 'axios'

export const createPostFromName = async (articleIdea, host) => {
    try {
        const prompt = `
            You are a proffesional copy writer, using that experience,
            please create and return an image description that would describe the header image of a web article titled "${articleIdea.title}"
        `

        let headerImagePromptParams = {
            prompt
        }

        const headerImagePromptPrompt = await axios.get('/api/getPromptReponse', { params: headerImagePromptParams })

        const mediumPrompt = `
            You are a proffesional copy writer, using that experience,
            please create and return an image description that would describe the seeondary or embeded image of a web article titled "${articleIdea.title}"
        `

        let mediumImagePromptParams = {
            prompt: mediumPrompt
        }

        const mediumImagePrompt = await axios.get('/api/getPromptReponse', { params: mediumImagePromptParams })

        let params = {
            ...articleIdea,
            host,
            lang: 'en',
            prompt: articleIdea.title,
            keywords: articleIdea.keywords.toString(),
            headerImagePrompt: headerImagePromptPrompt.data.trim(),
            mediumImagePrompt: mediumImagePrompt.data.trim()
        }

        const createPostFromHeadingResp = await axios.get('/api/createPostFromHeading', { params })
        
        params = {
            ...params,
            slug: createPostFromHeadingResp.data.slug
        }
        
        axios.get('/api/addSecondaryPostData',   { params })
        axios.get('/api/addAndCreateCategories', { params })
        axios.get('/api/addFaqsToPost',          { params })
        axios.get('/api/addListicle',            { params })
        axios.get('/api/addHeaderImage',         { params })
        axios.get('/api/addMediumImage',         { params })

        return createPostFromHeadingResp.data.slug
    } catch(e) {
        console.log('there was an error creating the post, ', e)
    }
}