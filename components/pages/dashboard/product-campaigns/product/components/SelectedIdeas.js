import React from 'react'
import SelectedIdea from './SelectedIdea'
import { generateEvenlySpacedDates } from 'utils/helpers'
import { doc, updateDoc } from "firebase/firestore"
import { firebaseDb } from 'utils/firebase'
import moment from 'moment'

const SelectedIdeas = ({ product, host, selectedIdeas, setSelectedIdeas, campaignLength, startDate, endDate }) => {

    const setSchedule = (e) => {
        e.preventDefault()

        const schedule = generateEvenlySpacedDates(startDate, endDate, selectedIdeas.length)

        const mappedSelectedIdeas = selectedIdeas.map((idea, i) => {
            const dateString = moment(schedule[i]).format('YYYY/MM/DD:HH:mm:ss').toString()
            return {
                ...idea,
                publishedDate: dateString
            }
        })

        setSelectedIdeas(mappedSelectedIdeas)
    }

    const approveSchedule = async (e) => {
        e.preventDefault()

        try {
            const updatedProductCampaign = {
                articlesToBeCreated: selectedIdeas
            }
            const productCampaginRef = doc(firebaseDb, `sites/${host}/productCampaigns`, product.slug)
            await updateDoc(productCampaginRef, updatedProductCampaign)
        } catch (e) {
            console.error('e, ', e)
        }
    }

    const setKeywords = async (e) => {
        e.preventDefault()

        const array = product.altProductNames

        let index = 0

        const getNextItemInArray = (idea) => {
            let itemInArray = array[index]
            index++

            if(idea === itemInArray) itemInArray = array[index]

            if(index === array.length) index = 0
            return itemInArray
        }

        const mappedSelectedIdeas = selectedIdeas.map((idea) => {
            return {
                ...idea,
                keywords: [
                    product.name,
                    getNextItemInArray(idea)
                ]
            }
        })

        try {
            const updatedProductCampaign = {
                articlesToBeCreated: mappedSelectedIdeas
            }
            const productCampaginRef = doc(firebaseDb, `sites/${host}/productCampaigns`, product.slug)
            await updateDoc(productCampaginRef, updatedProductCampaign)
        } catch (e) {
            console.error('e, ', e)
        }
    }

    return (
        <>
            <h2>Selected Ideas</h2>

            <div>
                <div>Ideas selected: {selectedIdeas.length}</div>
                <div>Campaign Length: {campaignLength} months</div>
                <div>There are  weeks in this campagin</div>
                
            </div>

            <ul>
                {selectedIdeas.map((item, i) => (
                    <SelectedIdea item={item} key={`${item.title}-idea`} i={i} />
                ))}
            </ul>

            <button onClick={setSchedule}>Set Schedule</button>

            <button onClick={approveSchedule}>Approve Schedule</button>

            <button onClick={setKeywords}>Set Keywords</button>
        </>
    )
}

export default SelectedIdeas