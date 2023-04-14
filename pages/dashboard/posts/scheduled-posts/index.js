import React from 'react'
import ScheduledPostsMain from 'components/pages/dashboard/posts/scheduled-posts/Main'
import Layout from 'components/Layout'
import { collection, where, query, orderBy, getDocs } from "firebase/firestore"
import { firebaseDb } from 'utils/firebase'
import Breadcrumbs from 'components/BreadCrumbs'

const SchdeduledPosts = ({ site, host, scheduledPosts, lang }) => (
    <Layout site={site}>
        <Layout.Main>
            <Breadcrumbs pathArray={[{text: 'Dashboard', href: "/dashboard"}, {text: 'Posts', href: "/dashboard/posts"}, {text: 'Scheduled Posts'}]} />
            <ScheduledPostsMain scheduledPosts={scheduledPosts} host={host} lang={lang} />
        </Layout.Main>
    </Layout>
)

export const getServerSideProps = async ({ req, locale }) => {
    const host = req.headers.host
    const lang = locale

    const scheduledPostsPath = collection(firebaseDb, `sites/${host}/langs/${lang}/posts`)
    const scheduledPostsQuery = query(scheduledPostsPath, where("status", "==", 'scheduled'), orderBy("createdAt", "desc"))
    const scheduledPostsDocs = await getDocs(scheduledPostsQuery)
    const scheduledPosts = scheduledPostsDocs?.docs?.map(doc => doc.data())

    return { props: { scheduledPosts, host } }
}

export default SchdeduledPosts