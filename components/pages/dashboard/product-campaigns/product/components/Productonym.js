import React, { useState } from 'react'
import { doc, updateDoc } from "firebase/firestore"
import { firebaseDb } from 'utils/firebase'
import DeleteForeverOutlined from '@mui/icons-material/DeleteForeverOutlined'
import styled from 'styled-components'

const ProductonymContainerText = styled.div`
    margin: 5px 35px 5px 0;
    position: relative;

    button {
        cursor: pointer; 
        background-color: transparent;
        position: absolute;


        border-color: transparent;

        svg {
            width: 15px;
            height: 15px;
            color: red;
        }
    }
`

const Productonym = ({ product, host, productonym, productonyms, setProductonyms }) => {
    const [isShown, setIsShown] = useState(false)
    
    const handleDeleteProductonyms = async (e) => {
        e.preventDefault()
        
        try {
            const filteredProductonyms = productonyms.filter(l => l !== productonym)
            const updatedProductCampaign = {
                altProductNames: filteredProductonyms
            }
            const productCampaginRef = doc(firebaseDb, `sites/${host}/productCampaigns`, product.slug)
            await updateDoc(productCampaginRef, updatedProductCampaign)
            setProductonyms(filteredProductonyms)
        } catch (e) {
            console.error('e, ', e)
        }   
    }


    return (
        <ProductonymContainerText
            onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}
        >
                {productonym}
                {isShown &&
                    <button onClick={handleDeleteProductonyms}>
                        <DeleteForeverOutlined />
                    </button>
                }
        </ProductonymContainerText>
    )
}

export default Productonym