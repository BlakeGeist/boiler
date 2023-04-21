import React, { useState } from 'react'
import ArticleIdeas from './components/ArticleIdeas'
import AddProductNameForm from './components/AddProductNameForm'
import moment from 'moment'
import 'react-datetime-picker/dist/DateTimePicker.css'
import 'react-calendar/dist/Calendar.css'
import 'react-clock/dist/Clock.css'
import { monthsBetweenDates, getDateXMonthsFromStartDate, generateEvenlySpacedDates  } from 'utils/helpers'

import AddAmazonLink from './components/AddAmazonLink'
import Productonyms from './components/Productonyms'
import CampaignSchedule from './components/CampgainSchedule'
import CreateAllButton from './components/CreateAllButton'

const ProductMain = ({ product, host, lang }) => {
    const [articleIdeas, setArticleIdeas] = useState(product.articleIdeasArray || [])
    const [isLoading, setIsLoading] = useState(false)

    const initalStartDate = product.startDate ? moment(product.startDate).toDate() : new Date()
    const [startDate, setStartDate] = useState(initalStartDate)

    const initalCampaginLength = 6

    const initalEndDate = product.endDate ? moment(product.endDate).toDate() : getDateXMonthsFromStartDate(new Date(), parseInt(initalCampaginLength))

    const [endDate, setEndDate] = useState(initalEndDate)
    const [campaignLength, setCampaignLength] = useState(monthsBetweenDates(initalStartDate, initalEndDate) || initalCampaginLength)

    const defaultPostsPerMonth = 4
    const schedule = generateEvenlySpacedDates(initalStartDate, initalEndDate, (initalCampaginLength * defaultPostsPerMonth))
    const [postSchedule, setPostSchedule] = useState(schedule)
    const [productonyms, setProductonyms] = useState(product?.altProductNames || [])

    return (
        <>
            <h1>Product Campagin: {product.name}</h1>

            <Productonyms productonyms={productonyms} setProductonyms={setProductonyms} product={product} host={host} />

            <hr />

            <CampaignSchedule 
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                startDate={startDate}
                endDate={endDate}
                host={host}
                product={product}
                campaignLength={campaignLength}
                setCampaignLength={setCampaignLength}
                postSchedule={postSchedule}
                setPostSchedule={setPostSchedule}
                />

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
                productonyms={productonyms}
                postSchedule={postSchedule}
                />

            <hr />

            <ArticleIdeas 
                articleIdeas={articleIdeas}
                host={host}
                lang={lang}
                product={product}
                setArticleIdeas={setArticleIdeas}
                />

            <CreateAllButton
                articleIdeas={articleIdeas}
                host={host}
                />
        </>
    )
}

export default ProductMain