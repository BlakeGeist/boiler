import React, { useState } from 'react'
import timestamp from 'time-stamp'
import { firebaseDb } from 'utils/firebase'
import { setDoc, doc } from 'firebase/firestore'
import { cleanSlug } from 'utils/helpers'
import Link from 'next/link'

const ProductCampaignMain = ({ host, products }) => {
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

        try {
            await setDoc(doc(firebaseDb, `/sites/${host}/productCampaigns`, productSlug), productObj)
            setProductsArray([productObj, ...productsArray])
        } catch (err) {
            console.log('err, ', err)
        }
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <label htmlFor="product">Product</label>
                <input type="text" name="product" id="product" />
                <input type="submit" />
            </form>

            <ul>
                {productsArray.map(product => (
                    <li key={product.name}>
                        <Link href={`/dashboard/product-campaigns/${product.slug}`}>{product.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ProductCampaignMain