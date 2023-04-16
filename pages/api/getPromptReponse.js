



import { promptResponse } from 'utils/apiHelpers'

export default async function handler(req, res) {
    const { prompt } = req.query

    console.log(prompt)

    try {
        const promptRes = await promptResponse(prompt)

        console.log(promptRes)

       return res.status(200).json(promptRes)
    } catch (e) {
        console.log('there was an error while running the promptResponse Api, ', e)
        res.status(500).json('there was an error while running the promptResponse Api, ', e)
    }
}