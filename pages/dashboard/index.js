import React from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { firebaseDb } from 'utils/firebase'
import DashboardMain from 'components/pages/dashboard/Main'
import Layout from 'components/Layout'
import UserNav from 'components/Layout/UserNav'

const Site = ({ posts, site, user = null }) => {
    console.log('posts', posts)
    return (
        <Layout site={site} user={user}>
            <Layout.Main>
                <UserNav user={user} />
                <DashboardMain posts={posts} site={site} />
            </Layout.Main>
        </Layout>
    )
}

export const getInitialProps = async (ctx) => {
    const host = ctx.req.headers.host

    const postsCollRef = collection(firebaseDb, "sites", host, "posts")
    const postsDocs = await getDocs(postsCollRef)
    const posts = postsDocs.docs?.map(d => ({id: d.id, ...d.data()})) || null

    return { posts }
}

export default Site