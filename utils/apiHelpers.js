import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API
})

const openai = new OpenAIApi(configuration)

export const promptResponse = async (propmt) => {
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: propmt,
        temperature: 0,
        max_tokens: 3900,
        top_p: 1,
        frequency_penalty: 0.2,
        presence_penalty: 0,
    }).catch(e => console.log(e.response?.data))

    return response?.data?.choices[0].text
}

export const imageResponse = async (propmt, size) => {
    let daSize = '1024x1024'
    if(size === 'medium') daSize = '512x512' 
    if(size === 'small') daSize = '256x256' 
    
    const response = await openai.createImage({
        prompt: propmt,
        n: 1,
        size: daSize,
      }).catch(e => console.log(e.response.data.error))

    return response?.data?.data[0].url
}

export const tryXTimes = async (func, x = 3) => {
    for(let i = 0; i < x; i++) {
        try {
            const resp = await func
            return resp
        } catch (e) {
            console.log(e)
        }
    }
}