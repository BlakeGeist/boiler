



import { promptResponse } from 'utils/apiHelpers'

export default async function handler(req, res) {
    const { prompt } = req.query
    const articleIdeaPromot = `You are a content writer and online affiliate marketing specialist, please create 31 article titles that can be used in a series of content that can be used to ${prompt}.`

    try {
        const articleResponse = await promptResponse(articleIdeaPromot)
        const articleIdeasArray = articleResponse.split(/\r?\n/).filter(Boolean)
        const articleIdeas = articleIdeasArray.map((item, i) => {
            return item.replace(`${i+1}. `, '')
        })

       return res.status(200).json(articleIdeas)
    } catch (e) {
        console.log('there was an error while running the getArticleIdeasFromProduct Api, ', e)
        res.status(500).json('there was an error while running the getArticleIdeasFromProduct Api, ', e)
    }
}