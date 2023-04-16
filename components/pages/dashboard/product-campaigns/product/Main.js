import React, { useState } from 'react'
import { doc, updateDoc } from "firebase/firestore"
import { firebaseDb } from 'utils/firebase'
import ArticleIdeas from './components/ArticleIdeas'
import SelectedIdeas from './components/SelectedIdeas'
import AddProductNameForm from './components/AddProductNameForm'

import DateTimePicker from 'react-datetime-picker'

const ProductMain = ({ product, host }) => {
    const [articleIdeas, setArticleIdeas] = useState(product.articleIdeasArray || [])
    const [isLoading, setIsLoading] = useState(false)
    const [selectedIdeas, setSelectedIdeas] = useState(product.articlesToBeCreated || [])

    const [startDate, setStartDate] = useState(new Date())

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

                <div>
                    <p>
                        <strong>Start Date: </strong>
                    </p>
                    <p><strong>End Date: </strong></p>
                </div>
            </div>


            <AddProductNameForm 
                host={host}
                isLoading={isLoading}
                product={product}
                setArticleIdeas={setArticleIdeas}
                setIsLoading={setIsLoading}
                />
            <ArticleIdeas
                articleIdeas={articleIdeas}
                handleAddTitleToProductCampagin={handleAddTitleToProductCampagin}
                selectedIdeas={selectedIdeas}
                setSelectedIdeas={setSelectedIdeas}
                />
            <SelectedIdeas 
                selectedIdeas={selectedIdeas}
                />
        </>
    )
}

export default ProductMain