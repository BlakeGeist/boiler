import React from 'react'
import DraftPostsMain from 'components/pages/dashboard/posts/drafts/Main'
import Layout from 'components/Layout'
import { collection, limit, query, orderBy } from "firebase/firestore"
import { firebaseDb, getDocsFromQuery } from 'utils/firebase'
import Breadcrumbs from 'components/BreadCrumbs'

const Drafts = ({ site, host, draftPosts }) => (
    <Layout site={site}>
        <Layout.Main>
            <Breadcrumbs pathArray={[{text: 'Dashboard', href: "/dashboard"}, {text: 'Posts', href: "/dashboard/posts"}, {text: 'Drafts'}]} />
            <DraftPostsMain posts={draftPosts} host={host} />
        </Layout.Main>
    </Layout>
)

export const getServerSideProps = async ({req}) => {
    const host = req.headers.host

    const draftPostsPath = `sites/${host}/drafts`
    const draftPostsQuery = query(collection(firebaseDb, draftPostsPath), orderBy('createdAt', "desc"), limit(10))
    const draftPosts = await getDocsFromQuery(draftPostsQuery) || []

    return { props: { draftPosts, host } }
}

export default Drafts