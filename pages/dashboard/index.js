import React from 'react'
import { collection, getDocs, getDoc, doc } from 'firebase/firestore'
import { firebaseDb } from 'utils/firebase'
import DashboardTemplate from 'components/pages/dashboard'
import Layout from 'components/Layout'

const Site = ({ posts, site }) => (
    <Layout site={site}>
        <DashboardTemplate posts={posts} site={site} />
    </Layout>
)

export const getServerSideProps = async ({req}) => {
    const host = req.headers.host

    const postsCollRef = collection(firebaseDb, "sites", host, "posts")
    const postsDocs = await getDocs(postsCollRef)
    const posts = postsDocs.docs?.map(d => ({id: d.id, ...d.data()}))

    const siteRef = doc(firebaseDb, "sites", host)
    const siteDoc = await getDoc(siteRef)
    const site = siteDoc.data()

    return {
        props: { posts: posts || null, site }
    }
}

export default Site