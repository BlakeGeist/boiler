import React from 'react'
import ScheduledPostsMain from 'components/pages/dashboard/posts/scheduled-posts/Main'
import Layout from 'components/Layout'
import { collection, limit, query, orderBy } from "firebase/firestore"
import { firebaseDb, getDocsFromQuery } from 'utils/firebase'
import Breadcrumbs from 'components/BreadCrumbs'

const SchdeduledPosts = ({ site, host, scheduledPosts }) => (
    <Layout site={site}>
        <Layout.Main>
            <Breadcrumbs pathArray={[{text: 'Dashboard', href: "/dashboard"}, {text: 'Posts', href: "/dashboard/posts"}, {text: 'Scheduled Posts'}]} />
            <ScheduledPostsMain scheduledPosts={scheduledPosts} host={host} />
        </Layout.Main>
    </Layout>
)

export const getServerSideProps = async ({req}) => {
    const host = req.headers.host

    const scheduledPostsPath = `sites/${host}/scheduledPosts`
    const scheduledPostsQuery = query(collection(firebaseDb, scheduledPostsPath), orderBy('createdAt', "desc"), limit(10))
    const scheduledPosts = await getDocsFromQuery(scheduledPostsQuery)

    return { props: { scheduledPosts, host } }
}

export default SchdeduledPosts