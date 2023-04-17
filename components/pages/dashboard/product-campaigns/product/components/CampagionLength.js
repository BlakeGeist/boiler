import React from 'react'
import { doc, updateDoc } from "firebase/firestore"
import { firebaseDb } from 'utils/firebase'

const CampagainLength = ({ setEndDate, startDate, host, product, campaignLength, setCampaignLength }) => {

    function addMonths(startDate, monthsFrom) {
        if (!(startDate instanceof Date)) {
          throw new Error('Invalid input: startDate must be a Date object')
        }
      
        if (typeof monthsFrom !== 'number') {
          throw new Error('Invalid input: monthsFrom must be a number')
        }
      
        const newDate = new Date(startDate)
        newDate.setMonth(startDate.getMonth() + monthsFrom)
        
        // Check for month overflow
        if (newDate.getMonth() !== (startDate.getMonth() + monthsFrom) % 12) {
          newDate.setDate(0) // Set to last day of previous month
        }
      
        return newDate
      }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const newEndDate = addMonths(startDate, parseInt(campaignLength))

        const updatedProductCampaign = {
            campaignLength: parseInt(campaignLength),
            startDate,
            endDate: newEndDate
        }
        
        const productCampaginRef = doc(firebaseDb, `sites/${host}/productCampaigns`, product.slug)
        await updateDoc(productCampaginRef, updatedProductCampaign)
        console.log(`added updatedProductCampaign, `, updatedProductCampaign)

        setEndDate(newEndDate)
    }

    const handleChange = (e) => {
        const newCampaginLength  = e.target.value
        setCampaignLength(newCampaginLength)
    }

    return (
        <form onSubmit={handleSubmit} >
            <label htmlFor="months">Campagin Months: </label>
            <input type="number" name="months" id="months" value={campaignLength} onChange={handleChange}/>
            <input type="submit" />
        </form>        
    )
}

export default CampagainLength