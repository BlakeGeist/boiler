
import { promptResponse } from 'utils/apiHelpers'

export default async function handler(req, res) {
    const { prompt } = req.query
    const articleIdeaPromot = `article ideas for ${prompt}`
    const articleResponse = await promptResponse(articleIdeaPromot)
    const articleIdeasArray = articleResponse.split(/\r?\n/).filter(Boolean)
    const articleIdeas = articleIdeasArray.map((item, i) => {
        return item.replace(`${i+1}. `, '')
    })

    res.status(200).json(articleIdeas)
}