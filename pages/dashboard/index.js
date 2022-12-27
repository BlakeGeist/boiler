import React from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { firebaseDb } from 'utils/firebase'
import DashboardTemplate from 'components/pages/DashboardPage'

const Site = ({ posts }) => {
    return (
        <DashboardTemplate 
            posts={posts}
        />
    )
}

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