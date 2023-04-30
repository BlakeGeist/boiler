import React, { useState } from 'react'
import Accordion from 'components/Accordion'
import { LoadingButton } from '@mui/lab'
import axios from 'axios'

const Faqs = ({ post, host }) => {

    const [isLoading, setIsLoading] = useState(false)
    const [faqs, setFaqs] = useState(post.faqs)

    const handleGenerateFaqs = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        const params = {
            prompt: post.heading,
            slug: post.slug,
            host,
            lang: 'en'        
        }

        const addMediumImage = axios.get('/api/addFaqsToPost',         { params })
        
        await addMediumImage.then(res => {
            setFaqs(res.data)
        }).catch(e => {
            console.error(`there was an error while creating the MediumImage: ${e}`)
        }) 

        setIsLoading(false)
    }

    if(!post.faqs) return <LoadingButton onClick={handleGenerateFaqs} loading={isLoading} variant='outlined'>Generate Faqs</LoadingButton>

    return (
        <>
            <h2 id="faqs"><span>FAQS</span></h2>
            <Accordion faqs={faqs} />    
        </>
    )
}

export default Faqs