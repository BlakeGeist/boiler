import React, { useState } from 'react'
import timestamp from 'time-stamp'
import { firebaseDb } from 'utils/firebase'
import { setDoc, doc } from 'firebase/firestore'
import { cleanSlug } from 'utils/helpers'

const ProductCampaignMain = ({ host, site, products }) => {
    console.log(site.slug)

    const createdAt = timestamp('YYYY/MM/DD:mm:ss')

    const [productsArray, setProductsArray] = useState(products)

    const onSubmit = async (e) => {
        e.preventDefault()
        const newProduct = e.target.product.value

        const productSlug = cleanSlug(newProduct)

        const productObj = {
            name: newProduct,
            slug: productSlug,
            createdAt: createdAt
        }

        await setDoc(doc(firebaseDb, `/sites/${host}/productCampaigns`, productSlug), productObj)


        setProductsArray([productObj, ...productsArray])
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <label htmlFor="product">Product</label>
                <input type="text" name="product" id="product" />
                <input type="submit" />
            </form>

            <ul>
                {productsArray.map(product => <li key={product.name}>{product.name}</li>)}
            </ul>

        </div>
    )
}

export default ProductCampaignMain