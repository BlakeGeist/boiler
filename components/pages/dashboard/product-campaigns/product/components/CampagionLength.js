import React from 'react'
import { doc, updateDoc } from "firebase/firestore"
import { firebaseDb } from 'utils/firebase'

const CampagainLength = ({ startDate, endDate, host, product, campaignLength, setCampaignLength }) => {

    const handleSubmit = async (e) => {
        e.preventDefault()


        const updatedProductCampaign = {
            campaignLength: campaignLength,
            startDate,
            endDate
        }
        
        const productCampaginRef = doc(firebaseDb, `sites/${host}/productCampaigns`, product.slug)
        await updateDoc(productCampaginRef, updatedProductCampaign)
        console.log(`added updatedProductCampaign, `, updatedProductCampaign)

    }

    const handleChange = (e) => {
        const newCampaginLength  = e.target.value
        setCampaignLength(newCampaginLength)
    }

    return (
        <form onSubmit={handleSubmit} >
            <label htmlFor="months">Campagin Months</label>
            <input type="number" name="months" id="months" value={campaignLength} onChange={handleChange}/>
            <input type="submit" />
        </form>        
    )
}

export default CampagainLength