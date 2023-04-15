import React from 'react'
import Layout from 'components/Layout'
import nookies from 'nookies'
import { firebaseDb } from 'utils/firebase'
import { firebaseAdmin } from 'utils/firebaseAdmin'
import { collection, getDocs } from 'firebase/firestore'

const ProductCampaign = ({ site, user }) => {
    return (
        <Layout site={site} user={user}>
            <Layout.Main>
                <h1>Product Campaign</h1>
            </Layout.Main>
        </Layout>
    )
}

export const getServerSideProps = async (ctx) => {
    try {
        const cookies = nookies.get(ctx)
        const host = ctx.req.headers.host
        const token  = await firebaseAdmin.auth().verifyIdToken(cookies.token)

        const postsCollRef = collection(firebaseDb, `/sites/${host}/productCampaigns`)
        const postsDocs = await getDocs(postsCollRef)
        const posts = postsDocs.docs?.map(d => ({id: d.id, ...d.data()})) || null
    
        return {
            props: { posts, user: token }
        }
    } catch (err) {

        console.log('err, ', err)

        ctx.res.writeHead(302, { Location: '/dashboard/login' })
        ctx.res.end()

        return { props: {}}
    }
}

export default ProductCampaign