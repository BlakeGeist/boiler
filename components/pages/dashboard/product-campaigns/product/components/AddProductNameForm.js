import React from 'react'
import axios from 'axios'
import { LoadingButton } from '@mui/lab'
import { doc, updateDoc } from "firebase/firestore"
import { firebaseDb } from 'utils/firebase'

const AddProductNameForm = ({ host, isLoading, setIsLoading, setArticleIdeas, product }) => {
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        const productName = e.target.name.value

        try {
            const params = {
                prompt: productName
            }
            const articleIdeasRes = await axios.get('/api/getArticleIdeasFromPoduct', { params })

            const articleIdeasObjArray = articleIdeasRes.data.map(articleIdea => {
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
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Product Name</label>
            <input name="name" id="name" defaultValue={product.name} />
            <LoadingButton type='submit' loading={isLoading} loadingIndicator="Loading…" variant="outlined">Submit</LoadingButton>
        </form>
    )
}

export default AddProductNameForm