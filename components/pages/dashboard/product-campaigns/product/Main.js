import React, { useState } from 'react'
import { doc, updateDoc } from "firebase/firestore"
import { firebaseDb } from 'utils/firebase'
import ArticleIdeas from './components/ArticleIdeas'
import SelectedIdeas from './components/SelectedIdeas'
import AddProductNameForm from './components/AddProductNameForm'
import moment from 'moment'

import DateTimePicker from 'react-datetime-picker'
import CampagainLength from './components/CampagionLength'

const ProductMain = ({ product, host }) => {
    const [articleIdeas, setArticleIdeas] = useState(product.articleIdeasArray || [])
    const [isLoading, setIsLoading] = useState(false)
    const [selectedIdeas, setSelectedIdeas] = useState(product.articlesToBeCreated || [])
    const [campaignLength, setCampaignLength] = useState(product.campaignLength || '')

    const initalStartDate = product.startCampaginDate ? moment(product.startCampaginDate, "YYYY/MM/DD:HH:mm:ss").toDate() : new Date()
    const [startDate, setStartDate] = useState(initalStartDate)

    const initalEndDate = product.endCampginDate ? moment(product.endCampginDate, "YYYY/MM/DD:HH:mm:ss").toDate() : new Date()

    const monthsAgo = (date, months) => {
        return moment(date).add(months, 'months').toDate()
    }

    const incedDate = monthsAgo(initalEndDate, campaignLength)
    const [endDate, setEndDate] = useState(incedDate)


    const handleAddTitleToProductCampagin = async (e) => {
        e.preventDefault()

        try {
            const updatedProductCampaign = {
                articlesToBeCreated: selectedIdeas
            }
            const productCampaginRef = doc(firebaseDb, `sites/${host}/productCampaigns`, product.slug)
            await updateDoc(productCampaginRef, updatedProductCampaign)
            console.log(`added articlesToBeCreated, `, selectedIdeas)
        } catch (e) {
            console.log('e, ', e)
        }
    }
    
    return (
        <>
            <h2>{product.name}</h2>

            <div>
                Campaign Schedule

                <CampagainLength startDate={startDate} endDate={endDate} host={host} product={product} campaignLength={campaignLength} setCampaignLength={setCampaignLength} />

                <div>
                    <div>
                        <strong>Start Date: </strong>
                        <DateTimePicker onChange={setStartDate} value={startDate} />
                    </div>
                    <div>
                        <strong>End Date: </strong>
                        <DateTimePicker onChange={setEndDate} value={endDate} />
                    </div>
                </div>
            </div>

            <AddProductNameForm 
                host={host}
                isLoading={isLoading}
                product={product}
                setArticleIdeas={setArticleIdeas}
                setIsLoading={setIsLoading}
                startDate={startDate}
                endDate={endDate} 
                />
            <ArticleIdeas
                articleIdeas={articleIdeas}
                handleAddTitleToProductCampagin={handleAddTitleToProductCampagin}
                selectedIdeas={selectedIdeas}
                setSelectedIdeas={setSelectedIdeas}
                />
            <SelectedIdeas 
                selectedIdeas={selectedIdeas}
                campaignLength={campaignLength}
                product={product}
                startDate={startDate}
                endDate={endDate}
                setSelectedIdeas={setSelectedIdeas}
                />
        </>
    )
}

export default ProductMain