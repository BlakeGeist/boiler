import React from 'react'

const ProductMain = ({ site, product }) => {
    console.log(site, product)
    return (
        <h2>{product.name}</h2>
    )
}

export default ProductMain