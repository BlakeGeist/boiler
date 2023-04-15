import React from 'react'
import Layout from 'components/Layout'
import ProductMain from 'components/pages/dashboard/product-campaigns/product/Main'
import Breadcrumbs from 'components/BreadCrumbs'
import nookies from 'nookies'
import { firebaseAdmin } from 'utils/firebaseAdmin'
import { getDocFromPathAndSlug } from 'utils/firebase'

const ProductCampaign = ({ user, product, site, host, lang }) => (
    <Layout site={site} user={user}>
        <Layout.Main>
            <Breadcrumbs pathArray={[{text: 'Dashboard', href: "/dashboard"}, {text: 'Product Campagins' }]} />
            <ProductMain product={product} site={site} host={host} lang={lang} />
        </Layout.Main>
    </Layout>
)


export const getServerSideProps = async (ctx) => {
    try {
        const cookies = nookies.get(ctx)
        const host = ctx.req.headers.host
        const token  = await firebaseAdmin.auth().verifyIdToken(cookies.token)
        const slug = ctx.query.product

        const product = await getDocFromPathAndSlug(`sites/${host}/productCampaigns`, slug)

        return {
            props: { product, user: token, host }
        }
    } catch (err) {

        console.log('err, ', err)
        ctx.res.writeHead(302, { Location: '/dashboard/login' })
        ctx.res.end()

        return { props: {}}
    }
}


export default ProductCampaign