import React from 'react'
import ScheduledPostsTemplate from 'components/pages/dashboard/ScheduledPostsTemplate'
import Layout from 'components/Layout'
import { getDoc, doc } from 'firebase/firestore'
import { firebaseDb } from 'utils/firebase'

const SchdeduledPosts = ({ site, host }) => (
    <Layout site={site}>
        <ScheduledPostsTemplate host={host} />
    </Layout>
)

export const getServerSideProps = async ({req}) => {
    const host = req.headers.host

    //TODO get the scheduled posts

    const siteRef = doc(firebaseDb, "sites", host)
    const siteDoc = await getDoc(siteRef)
    const site = siteDoc.data()

    return {
        props: { site, host }
    }
}

export default SchdeduledPosts