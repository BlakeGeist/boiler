
import { promptResponse } from 'utils/apiHelpers'

export default async function handler(req, res) {
    const { prompt } = req.query

    const articleIdeaPromot = `article ideas for ${prompt}`

    const articleResponse = await promptResponse(articleIdeaPromot)
    
    console.log(articleResponse)

    const articleIdeasArray = articleResponse.split(/\r?\n/).filter(Boolean)

    res.status(200).json(articleIdeasArray)
}