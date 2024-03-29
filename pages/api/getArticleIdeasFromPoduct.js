import { promptResponse } from 'utils/apiHelpers'

export default async function handler(req, res) {
    const { amount, keywords } = req.query

    const articleIdeaPromot = `
        You are a content writer and online affiliate marketing specialist.
        
        Please create ${amount || 24} individual and unique article titles that can be used in a series of content that can be used to promote affiliate marketing links realted to ${keywords.replace(",", ", ")}.
    `

    try {
        const articleResponse = await promptResponse(articleIdeaPromot)
        const articleIdeasArray = articleResponse.split(/\r?\n/).filter(Boolean)
        const articleIdeas = articleIdeasArray.map((item, i) => {
            return item.replace(`${i+1}. `, '')
        })  

       return res.status(200).json(articleIdeas)
    } catch (e) {
        console.error('there was an error while running the getArticleIdeasFromProduct Api, ', e)
        res.status(500).json('there was an error while running the getArticleIdeasFromProduct Api, ', e)
    }
}