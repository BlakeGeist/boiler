import React from 'react'
import axios from 'axios'
import { LoadingButton } from '@mui/lab'
import { doc, updateDoc } from "firebase/firestore"
import { firebaseDb } from 'utils/firebase'

const AddProductNameForm = ({ campaignLength, host, isLoading, setIsLoading, setArticleIdeas, product }) => {
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        
        const productName = e.target.name.value
        const amount = e.target.amount.value

        try {
            const params = {
                prompt: productName,
                amount
            }
            const articleIdeasRes = await axios.get('/api/getArticleIdeasFromPoduct', { params })
            
            const articleIdeasObjArray = articleIdeasRes.data.map((articleIdea) => {
                return { 
                    title: articleIdea,
                    isPosted: false,
                    isSelected: false
                }
            })
            setArticleIdeas(articleIdeasObjArray)

            const updatedProductCampaign = {
                articleIdeasArray: articleIdeasObjArray
            }
    
            const productCampaginRef = doc(firebaseDb, `sites/${host}/productCampaigns`, product.slug)
    
            await updateDoc(productCampaginRef, updatedProductCampaign)

            console.log(`added articleIdeasArray, `, articleIdeasObjArray)

        } catch (e) {
            console.log('error, ', e)
        }

        setIsLoading(false)
    }

    return (
        <div>
            <h2>Get article ideas from product name</h2>
            <form onSubmit={handleSubmit}>
                <span>Get</span> 
                <input name="amount" id="amount" type='number' defaultValue={parseInt(campaignLength) * 4} style={{width: '60px'}} />
                <span>Article Ideas Based on product name:</span>
                <input name="name" id="name" defaultValue={product.name} />
                <LoadingButton type='submit' loading={isLoading} loadingIndicator="Loading…" variant="outlined">Submit</LoadingButton>
            </form>
        </div>
    )
}

export default AddProductNameForm