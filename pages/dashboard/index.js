import React from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { firebaseDb } from 'utils/firebase'
import DashboardMain from 'components/pages/dashboard/Main'
import Layout from 'components/Layout'
import { firebaseAdmin } from 'utils/firebaseAdmin'
import nookies from 'nookies'

const Dashboard = ({ posts, site, user = null }) => {
    return (
        <Layout site={site} user={user}>
            <Layout.Main>
                <DashboardMain posts={posts} site={site} />
            </Layout.Main>
        </Layout>
    )
}

export const getServerSideProps = async (ctx) => {
    try {
        const cookies = nookies.get(ctx)
        const host = ctx.req.headers.host
        const lang = ctx.locale
        
        const token  = await firebaseAdmin.auth().verifyIdToken(cookies.token)

        const postsCollRef = collection(firebaseDb, `/sites/${host}/langs/${lang}/posts`)
        const postsDocs = await getDocs(postsCollRef)
        const posts = postsDocs.docs?.map(d => ({id: d.id, ...d.data()})) || null
    
        return {
            props: { posts, user: token }
        }
    } catch (err) {
        ctx.res.writeHead(302, { Location: '/dashboard/login' })
        ctx.res.end()

        return { props: {}}
    }
}
export default Dashboard