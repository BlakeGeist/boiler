import React from 'react'
import Layout from 'components/Layout'
import ProductMain from 'components/pages/dashboard/product-campaigns/product/Main'
import Breadcrumbs from 'components/BreadCrumbs'
import nookies from 'nookies'
import { firebaseDb } from 'utils/firebase'
import { firebaseAdmin } from 'utils/firebaseAdmin'
import { collection, getDocs } from 'firebase/firestore'

const ProductCampaign = ({ user, products, site, host, lang }) => (
    <Layout site={site} user={user}>
        <Layout.Main>
            <Breadcrumbs pathArray={[{text: 'Dashboard', href: "/dashboard"}, {text: 'Product Campagins' }]} />
            <ProductMain products={products} site={site} host={host} lang={lang} />
        </Layout.Main>
    </Layout>
)

export const getServerSideProps = async (ctx) => {
    try {
        const cookies = nookies.get(ctx)
        const host = ctx.req.headers.host
        const token  = await firebaseAdmin.auth().verifyIdToken(cookies.token)

        const postsCollRef = collection(firebaseDb, `/sites/${host}/productCampaigns`)
        const postsDocs = await getDocs(postsCollRef)
        const products = postsDocs.docs?.map(d => ({id: d.id, ...d.data()})) || null
    
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