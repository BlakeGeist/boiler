import React, { useState } from 'react'
import { LoadingButton } from '@mui/lab'
import { tryXTimes } from 'utils/apiHelpers'
import axios from 'axios'

const EditHeaderImage = ({ post, host }) => {
    const [isLoading, setIsLoading] = useState(false)

    const handleGenerateHeaderImage = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        const prompt = `
            You are a proffesional copy writer, 
            Our goal is to create an image description,
            please create and return an image description that would describe the header image of a web article titled "${post.heading}",
            but do not use any of the following words in the description thats returned "oral"
        `

        let headerImagePromptParams = {
            prompt
        }

        const resp = await axios.get('/api/getPromptReponse', { params: headerImagePromptParams })

        const headerImagePrompt = await resp.data.trim()

        const params = {
            headerImagePrompt,
            slug: post.slug,
            host,
            lang: 'en'        
        }

        const addHeaderImage = tryXTimes(axios.get('/api/addHeaderImage',         { params }))
        
        await addHeaderImage.then(res => {
            console.log('image added', res)    
        }).catch(e => {
            console.log(`there was an error while creating the HeaderImage: ${e}`)
        }) 

        setIsLoading(false)
    }

    return (
        <LoadingButton onClick={handleGenerateHeaderImage} loading={isLoading} variant='outlined'>Regenerate Header Image</LoadingButton>
    )
}

export default EditHeaderImage