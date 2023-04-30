import React, { useState } from 'react'
import { LoadingButton } from '@mui/lab'
import axios from 'axios'

const BodyImage = ({ post, host }) => {
    const [bodyImage, setBodyImage] = useState(post?.mediumImageSrc)
    const [isLoading, setIsLoading] = useState(false)

    if(bodyImage && bodyImage.length > 0) return <img src={bodyImage} />

    const handleGenerateBodyImage = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        const prompt = `
            You are a proffesional copy writer, 
            Our goal is to create an image description,
            please create and return an image description that would describe the secondary or body image of a web article titled "${post.heading}",
            but do not use any of the following words in the description thats returned "oral"
        `.replace('Oral', '')

        let mediumImagePromptParams = {
            prompt
        }

        const resp = await axios.get('/api/getPromptReponse', { params: mediumImagePromptParams })

        const mediumImagePrompt = await resp.data.trim()

        const params = {
            mediumImagePrompt,
            slug: post.slug,
            host,
            lang: 'en'        
        }

        const addMediumImage = axios.get('/api/addMediumImage',         { params })
        
        await addMediumImage.then(res => {
            setBodyImage(res.data.mediumImageSrc)
        }).catch(e => {
            console.error(`there was an error while creating the MediumImage: ${e}`)
        }) 

        setIsLoading(false)
    }

    return (
        <LoadingButton onClick={handleGenerateBodyImage} loading={isLoading} variant='outlined'>Regenerate Body Image</LoadingButton>
    )
}


export default BodyImage