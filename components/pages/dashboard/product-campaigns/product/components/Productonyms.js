import React, { useState } from 'react'
import axios from 'axios'
import { doc, updateDoc } from "firebase/firestore"
import { firebaseDb } from 'utils/firebase'
import Productonym from './Productonym'
import { LoadingButton } from '@mui/lab'
import styled from 'styled-components'

const ButtonContainer = styled.div`
    margin-top: 25px;
`
const ProductonymsContainer = styled.div`
    display: flex;
    margin-top: 25px;
`

const AddProductonymFormContainer = styled.form`
    margin-top: 25px;
`

const Productonyms = ({ product, host }) => {
    const [productonyms, setProductonyms] = useState(product?.altProductNames || [])
    const [isLoading, setIsLoading] = useState(false)

    const getProductonyms = async (name, e) => {
        e.preventDefault()
        setIsLoading(true)
        const prompt = `
            You are a affiliate marketing specialst and expert in the industry.

            Please create a list of 5 alternative phrasings and or similar products realted to ${name}, these product names will be used later as anchor text for links. 
            
            Please comma seperate each listItem.
        `

        const params = {
            prompt
        }

        try {
            const resp = await axios.get('/api/getPromptReponse', { params })

            const sanitizedData = (data) => {
                data = data.split(',')

                data = data.map((dataItem, i) => {
                    dataItem = dataItem.replace(`${i+1}`, '')
                    dataItem = dataItem.replace('. ', '')
                    dataItem = dataItem.replace('.', '')
                    dataItem = dataItem.replace('\n', '')
                    return dataItem.trim()
                })

                return data
            }

            const altProductNames = sanitizedData(resp.data)

            try {
                const updatedProductCampaign = {
                    altProductNames
                }
                const productCampaginRef = doc(firebaseDb, `sites/${host}/productCampaigns`, product.slug)
                await updateDoc(productCampaginRef, updatedProductCampaign)
                setProductonyms(altProductNames)
            } catch (e) {
                console.log('e, ', e)
            }
    

        } catch (e) {
            console.log(' there was an error, ', e)
        }

        setIsLoading(false)
    }

    const handleAddProductonym = (e) => {
        const name = e.target.productonym.value
        console.log(name)
    }

    return (
        <div>
            <h2>Productonyms:</h2>

            <ProductonymsContainer>
                {productonyms?.map(item => <Productonym product={product} host={host} productonyms={productonyms} setProductonyms={setProductonyms} productonym={item} key={item} />)}
            </ProductonymsContainer>

            <AddProductonymFormContainer onSubmit={handleAddProductonym}>
                <label htmlFor="productonym">Add Productonym: </label>
                <input type="text" name="productonym" id="productonym" />
                <input type="submit" />
            </AddProductonymFormContainer>

            <ButtonContainer>
                <LoadingButton onClick={e => getProductonyms(product.name, e)} loading={isLoading} loadingIndicator="Loading…" variant="outlined">Get Productonyms</LoadingButton>
            </ButtonContainer>
        </div>
    )
}

export default Productonyms