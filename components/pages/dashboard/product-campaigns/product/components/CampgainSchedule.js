import React from 'react'
import DateTimePicker from 'react-datetime-picker'
import CampagainLength from './CampagionLength'
import styled from 'styled-components'
import { monthsBetweenDates } from 'utils/helpers'
import { doc, updateDoc } from "firebase/firestore"
import { firebaseDb } from 'utils/firebase'
import { generateEvenlySpacedDates } from 'utils/helpers'

const DatePickersContainer = styled.div`
    margin-top: 25px;
    display: flex;

    div {
        &:first-of-type {
            padding-right: 15px;
        }
    }
`

const CampaignSchedule = ({ setStartDate, setEndDate, startDate, endDate, host, product, campaignLength, setCampaignLength, postSchedule, setPostSchedule }) => {

    const hanndleStartDateUpdate = async (e) => {
        const newStartDate = e
        const newCampaginLength = monthsBetweenDates(newStartDate, endDate)
        setCampaignLength(newCampaginLength)
        setStartDate(newStartDate)

        const updatedProductCampaign = {
            campaignLength: parseInt(newCampaginLength),
            startDate: newStartDate
          }
    
        const productCampaginRef = doc(firebaseDb, `sites/${host}/productCampaigns`, product.slug)
        await updateDoc(productCampaginRef, updatedProductCampaign)
        console.log(`added updatedProductCampaign, `, updatedProductCampaign)
        const schedule = generateEvenlySpacedDates(newStartDate, endDate, newCampaginLength)
        setPostSchedule(schedule)
    }

    const hanndleEndDateUpdate = async (e) => {
        const newEndDate = e
        const newCampaginLength = monthsBetweenDates(startDate, newEndDate)
        setCampaignLength(monthsBetweenDates(startDate, newEndDate))
        setEndDate(newEndDate)

        const updatedProductCampaign = {
            campaignLength: parseInt(newCampaginLength),
            endDate: newEndDate
          }
    
        const productCampaginRef = doc(firebaseDb, `sites/${host}/productCampaigns`, product.slug)
        await updateDoc(productCampaginRef, updatedProductCampaign)
        console.log(`added updatedProductCampaign, `, updatedProductCampaign)
        
        const schedule = generateEvenlySpacedDates(startDate, newEndDate, newCampaginLength)
        setPostSchedule(schedule)
    }

    return (
        <div>
            <h2>Campaign Schedule</h2>

            <CampagainLength setEndDate={setEndDate} startDate={startDate} endDate={endDate} host={host} product={product} campaignLength={campaignLength} setCampaignLength={setCampaignLength} />
            <DatePickersContainer>
                <div>
                    <strong>Start Date: </strong>
                    <DateTimePicker onChange={hanndleStartDateUpdate} value={startDate} />
                </div>
                <div>
                    <strong>End Date: </strong>
                    <DateTimePicker onChange={hanndleEndDateUpdate} value={endDate} />
                </div>
            </DatePickersContainer>
        </div>    
    )
}

export default CampaignSchedule