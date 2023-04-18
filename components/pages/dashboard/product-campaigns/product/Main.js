import React, { useState } from 'react'
import { doc, updateDoc } from "firebase/firestore"
import { firebaseDb } from 'utils/firebase'
import ArticleIdeas from './components/ArticleIdeas'
import SelectedIdeas from './components/SelectedIdeas'
import AddProductNameForm from './components/AddProductNameForm'
import moment from 'moment'
import 'react-datetime-picker/dist/DateTimePicker.css'
import 'react-calendar/dist/Calendar.css'
import 'react-clock/dist/Clock.css'
import { monthsBetweenDates, getDateXMonthsFromStartDate } from 'utils/helpers'

import AddAmazonLink from './components/AddAmazonLink'
import Productonyms from './components/Productonyms'
import CampaignSchedule from './components/CampgainSchedule'



const ProductMain = ({ product, host, lang }) => {
    const [articleIdeas, setArticleIdeas] = useState(product.articleIdeasArray || [])
    const [isLoading, setIsLoading] = useState(false)
    const [selectedIdeas, setSelectedIdeas] = useState(product.articlesToBeCreated || [])

    const initalStartDate = product.startDate ? moment(product.startDate).toDate() : new Date()
    const [startDate, setStartDate] = useState(initalStartDate)

    const initalCampaginLength = 6

    const initalEndDate = product.endDate ? moment(product.endDate).toDate() : getDateXMonthsFromStartDate(new Date(), parseInt(initalCampaginLength))

    const [endDate, setEndDate] = useState(initalEndDate)
    const [campaignLength, setCampaignLength] = useState(monthsBetweenDates(initalStartDate, initalEndDate) || initalCampaginLength)

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
            <h1>Product Campagin: {product.name}</h1>

            <Productonyms product={product} host={host} />

            <hr />

            <CampaignSchedule setStartDate={setStartDate} setEndDate={setEndDate} startDate={startDate} endDate={endDate} host={host} product={product} campaignLength={campaignLength} setCampaignLength={setCampaignLength} />

            <hr />

            <AddAmazonLink 
                host={host}
                product={product}
                />

            <hr />

            <AddProductNameForm 
                host={host}
                isLoading={isLoading}
                product={product}
                setArticleIdeas={setArticleIdeas}
                setIsLoading={setIsLoading}
                startDate={startDate}
                endDate={endDate} 
                campaignLength={campaignLength}

                />

            <hr />

            <ArticleIdeas
                articleIdeas={articleIdeas}
                handleAddTitleToProductCampagin={handleAddTitleToProductCampagin}
                selectedIdeas={selectedIdeas}
                setSelectedIdeas={setSelectedIdeas}
                />

            <hr />

            <SelectedIdeas 
                selectedIdeas={selectedIdeas}
                campaignLength={campaignLength}
                product={product}
                startDate={startDate}
                endDate={endDate}
                setSelectedIdeas={setSelectedIdeas}
                host={host}
                lang={lang}
                />


            

        </>
    )
}

export default ProductMain