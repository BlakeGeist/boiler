import React from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { firebaseDb } from 'utils/firebase'
import DashboardMain from 'components/pages/dashboard/Main'
import Layout from 'components/Layout'
import { firebaseAdmin } from 'utils/firebaseAdmin'
import nookies from 'nookies'

const Site = ({ posts, site, user }) => {
    return (
        <Layout site={site} user={user}>
            <Layout.Main>
                <DashboardMain posts={posts} site={site} />
            </Layout.Main>
        </Layout>
    )
}

export const getServerSideProps = async (ctx) => {
    const host = ctx.req.headers.host

    const cookies = nookies.get(ctx)

    const token = cookies.token ? await firebaseAdmin.auth().verifyIdToken(cookies.token) : null 

    if(ctx.req && !token) {
        ctx.res.writeHead(301, { Location: '/' })
        ctx.res.end()
    }

    const postsCollRef = collection(firebaseDb, "sites", host, "posts")
    const postsDocs = await getDocs(postsCollRef)
    const posts = postsDocs.docs?.map(d => ({id: d.id, ...d.data()})) || null

    return {
        props: { posts, user: token }
    }
}

export default Site