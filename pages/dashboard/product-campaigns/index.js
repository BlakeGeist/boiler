import React from 'react'
import Layout from 'components/Layout'
import nookies from 'nookies'
import { firebaseDb, getDocsFromQuery } from 'utils/firebase'
import { firebaseAdmin } from 'utils/firebaseAdmin'
import { collection, query } from 'firebase/firestore'
import ProductCampaignMain from 'components/pages/dashboard/product-campaigns/Main'

//TODO
//a product campaign has a 
//name
//slug
//createdAt
//ProductsArray
//Keywords
    //these keywords would one or many from the keywords table

const ProductCampaign = ({ site, user, products, host }) => {
    return (
        <Layout site={site} user={user}>
            <Layout.Main>
                <h1>Product Campaign</h1>
                <ProductCampaignMain site={site} products={products} host={host} />
            </Layout.Main>
        </Layout>
    )
}

export const getServerSideProps = async (ctx) => {
    try {
        const cookies = nookies.get(ctx)
        const host = ctx.req.headers.host
        const token  = await firebaseAdmin.auth().verifyIdToken(cookies.token)

        const productsPath = `sites/${host}/productCampaigns`
        const productsQuery = query(collection(firebaseDb, productsPath))
        const products = await getDocsFromQuery(productsQuery)

        console.log(products)

        return {
            props: { products, user: token, host }
        }
    } catch (err) {

        console.log('err, ', err)

        ctx.res.writeHead(302, { Location: '/dashboard/login' })
        ctx.res.end()

        return { props: {}}
    }
}

export default ProductCampaign