import React from 'react'
import { doc, updateDoc } from "firebase/firestore"
import { firebaseDb } from 'utils/firebase'
import { getDateXMonthsFromStartDate, generateEvenlySpacedDates } from 'utils/helpers'

const CampagainLength = ({ articleIdeas, setPostSchedule, setEndDate, startDate, host, product, campaignLength, setCampaignLength }) => {

    const handleChange = async (e) => {
      const newCampaginLength  = e.target.value
      setCampaignLength(newCampaginLength)
      const newEndDate = getDateXMonthsFromStartDate(startDate, parseInt(newCampaginLength))

      const updatedProductCampaign = {
        campaignLength: parseInt(newCampaginLength),
        startDate,
        endDate: newEndDate
      }

      const productCampaginRef = doc(firebaseDb, `sites/${host}/productCampaigns`, product.slug)
      await updateDoc(productCampaginRef, updatedProductCampaign)
      console.log(`added updatedProductCampaign, `, updatedProductCampaign)
      const schedule = generateEvenlySpacedDates(startDate, newEndDate, articleIdeas.length)
      setPostSchedule(schedule)

      setEndDate(newEndDate)
    }

    return (
        <form>
            <label htmlFor="months">Campagin Months: </label>
            <input type="number" name="months" id="months" value={campaignLength} onChange={handleChange}/>
        </form>        
    )
}

export default CampagainLength