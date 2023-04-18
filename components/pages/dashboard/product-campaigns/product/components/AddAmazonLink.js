import React, { useState } from 'react'
import { doc, updateDoc } from "firebase/firestore"
import { firebaseDb } from 'utils/firebase'
import styled from 'styled-components'

const ProductsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 25px;

    div {
        padding: 0 5px;

        &:first-of-type {
            padding-left: 0;
        }
    }
`

const AddAmazonLink = ({ product, host }) => {
    const [amazonLinkInput, setAmazonLinkInput] = useState('')
    const [amazonLinks, setAmazonLinks] = useState(product?.amzonLinks || [])

    const handleAddAmazonIframe = async (e) => {
        e.preventDefault()
        setAmazonLinkInput('')
        const iframeLink = amazonLinkInput

        try {
            const newArray = [...amazonLinks, iframeLink]
            setAmazonLinks(newArray)
            const updatedProductCampaign = {
                amzonLinks: newArray
            }
            const productCampaginRef = doc(firebaseDb, `sites/${host}/productCampaigns`, product.slug)
            await updateDoc(productCampaginRef, updatedProductCampaign)
        } catch (e) {
            console.log('e, ', e)
        }
    }

    const handleAmazonLinkInput = (e) => {
        const newInputVal = e.target.value
        setAmazonLinkInput(newInputVal)
    }

    return (
        <div>
            <h2>Add Amazon links</h2>

            <form onSubmit={handleAddAmazonIframe}>
                <label htmlFor="amazonIframeLink">Add Amazon Link: </label>
                <input required type="text" name="amazonIframeLink" id="amazonIframeLink" onChange={handleAmazonLinkInput} value={amazonLinkInput} />
                <input type="submit" />
            </form>

            <ProductsWrapper>
                {amazonLinks.map((link, i) => {

                    const handleRemoveIframeLink = async (e) => {
                        e.preventDefault()
                        try {
                            const filteredIframeLinks = amazonLinks.filter(l => l !== link)
                            setAmazonLinks(filteredIframeLinks)
                            const updatedProductCampaign = {
                                amzonLinks: filteredIframeLinks
                            }
                            const productCampaginRef = doc(firebaseDb, `sites/${host}/productCampaigns`, product.slug)
                            await updateDoc(productCampaginRef, updatedProductCampaign)
                        } catch (e) {
                            console.log('e, ', e)
                        }                    

                    }

                    return (
                        <span key={`amazonLink-${i}`}>
                            <div dangerouslySetInnerHTML={{ __html: link }} />
                            <button onClick={handleRemoveIframeLink}>Delete</button>
                        </span>
                    )
                })}
                

            </ProductsWrapper>

        </div>
    )
}

export default AddAmazonLink