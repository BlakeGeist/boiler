
import { promptResponse } from 'utils/apiHelpers'

export default async function handler(req, res) {
    const { prompt } = req.query
    const articleIdeaPromot = `you are a professional content writer with a specialty in household pets, create 10 article ideas for ${prompt}`

    try {
        const articleResponse = await promptResponse(articleIdeaPromot)
        const articleIdeasArray = articleResponse.split(/\r?\n/).filter(Boolean)
        const articleIdeas = articleIdeasArray.map((item, i) => {
            return item.replace(`${i+1}. `, '')
        })

       return res.status(200).json(articleIdeas)
    } catch (e) {
        console.log('there was an error while running the getArticleIdeas Api, ', e)
        res.status(500).json('there was an error while running the getArticleIdeas Api, ', e)
    }
}