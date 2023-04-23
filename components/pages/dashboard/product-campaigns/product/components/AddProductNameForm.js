import React from 'react'
import axios from 'axios'
import { LoadingButton } from '@mui/lab'
import { doc, updateDoc } from "firebase/firestore"
import { firebaseDb } from 'utils/firebase'
import moment from 'moment'
import { generateEvenlySpacedDates  } from 'utils/helpers'

const AddProductNameForm = ({ articleIdeas, endDate, startDate, productonyms, campaignLength, host, isLoading, setIsLoading, setArticleIdeas, product, setPostSchedule }) => {
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        
        const productName = e.target.name.value
        const amount = e.target.amount.value

        try {
            const params = {
                prompt: productName,
                keywords: [productName, ...productonyms].toString(),
                amount
            }

            const articleIdeasRes = await axios.get('/api/getArticleIdeasFromPoduct', { params })
            let index = 0

            const getNextItemInArray = (idea) => {
                let itemInArray = productonyms[index]
                index++
    
                if(idea === itemInArray) itemInArray = productonyms[index]
    
                if(index === productonyms.length) index = 0
                return itemInArray
            }

            console.log(await startDate, await endDate, amount)

            const schedule = generateEvenlySpacedDates(await startDate, await endDate, amount)
            setPostSchedule(schedule)

            const articleIdeasObjArray = articleIdeasRes.data.map((articleIdea, i) => {
                const dateString = moment(schedule[i]).format('YYYY/MM/DD:HH:mm:ss').toString() || moment().format('YYYY/MM/DD:HH:mm:ss').toString()

                const newArticleIdea = { 
                    title: articleIdea,
                    isPosted: false,
                    isSelected: false,
                    publishedDate: dateString,
                    keywords: [
                        product.name,
                        getNextItemInArray(articleIdea)
                    ]
                }
                return newArticleIdea
            })

            setArticleIdeas(articleIdeasObjArray)
            const updatedProductCampaign = {
                articleIdeasArray: articleIdeasObjArray
            }
            const productCampaginRef = doc(firebaseDb, `sites/${host}/productCampaigns`, product.slug)
            await updateDoc(productCampaginRef, updatedProductCampaign)
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