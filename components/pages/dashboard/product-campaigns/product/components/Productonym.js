import React from 'react'
import { doc, updateDoc } from "firebase/firestore"
import { firebaseDb } from 'utils/firebase'

const Productonym = ({ product, host, productonym, productonyms, setProductonyms }) => {
    const handleDeleteProductonyms = async (e) => {
        e.preventDefault()
        
        try {
            const filteredProductonyms = productonyms.filter(l => l !== productonym)
            setProductonyms(filteredProductonyms)
            const updatedProductCampaign = {
                altProductNames: filteredProductonyms
            }
            const productCampaginRef = doc(firebaseDb, `sites/${host}/productCampaigns`, product.slug)
            await updateDoc(productCampaginRef, updatedProductCampaign)
        } catch (e) {
            console.log('e, ', e)
        }   
    }

    return (
        <div style={{padding: '0 15px 0 0'}} key={productonym}>
            {productonym} <br />
            <button onClick={handleDeleteProductonyms}>Delete</button>
        </div>
    )
}

export default Productonym