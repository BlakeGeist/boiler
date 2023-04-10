import React from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { firebaseDb } from 'utils/firebase'
import DashboardMain from 'components/pages/dashboard/Main'
import NewLayout from 'components/Layout/NewLayout'

const Site = ({ posts, site }) => (
    <NewLayout site={site}>
        <NewLayout.Main>
            <DashboardMain posts={posts} site={site} />
        </NewLayout.Main>
    </NewLayout>
)

export const getServerSideProps = async ({req}) => {
    const host = req.headers.host

    const postsCollRef = collection(firebaseDb, "sites", host, "posts")
    const postsDocs = await getDocs(postsCollRef)
    const posts = postsDocs.docs?.map(d => ({id: d.id, ...d.data()}))

    return {
        props: { posts: posts || null }
    }
}

export default Site