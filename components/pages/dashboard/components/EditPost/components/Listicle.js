import React, { useState } from 'react'
import { LoadingButton } from '@mui/lab'
import axios from 'axios'

const Listicle = ( { post, host }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [listicleItems, setListicleItems] = useState(post?.listicleItems)

    const handleGenerateListicle = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        const params = {
            prompt: post.heading,
            slug: post.slug,
            host,
            lang: 'en'        
        }

        const addListicle = axios.get('/api/addListicle',         { params })
        
        await addListicle.then(res => {
            setListicleItems(res.data.listicleItems)
        }).catch(e => {
            console.error(`there was an error while creating the addListicle: ${e}`)
        }) 

        setIsLoading(false)
    }

    if(!listicleItems) return <LoadingButton onClick={handleGenerateListicle} loading={isLoading} variant='outlined'>Generate Listicle</LoadingButton>

    return (
        <ol >
            {listicleItems.map((listicleItem, i) => {
                return (
                    <li key={`${listicleItem}-${i}`}><p>{listicleItem}</p></li>
                )
            })}
        </ol>
    )
}

export default Listicle