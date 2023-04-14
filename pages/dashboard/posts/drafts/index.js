import React from 'react'
import DraftPostsMain from 'components/pages/dashboard/posts/drafts/Main'
import Layout from 'components/Layout'
import { collection, where, query, orderBy, getDocs } from "firebase/firestore"
import { firebaseDb } from 'utils/firebase'
import Breadcrumbs from 'components/BreadCrumbs'

const Drafts = ({ site, host, draftPosts }) => {
    console.log(draftPosts)
    return (
        <Layout site={site}>
            <Layout.Main>
                <Breadcrumbs pathArray={[{text: 'Dashboard', href: "/dashboard"}, {text: 'Posts', href: "/dashboard/posts"}, {text: 'Drafts'}]} />
                <DraftPostsMain posts={draftPosts} host={host} />
            </Layout.Main>
        </Layout>
    )
}

export const getServerSideProps = async ({req, locale}) => {
    const host = req.headers.host
    const lang = locale

    const draftPostsPath = collection(firebaseDb, `sites/${host}/langs/${lang}/posts`)
    const draftPostsQuery = query(draftPostsPath, where("status", "==", 'draft'), orderBy("createdAt", "desc"))
    const draftPostsDocs = await getDocs(draftPostsQuery)
    const draftPosts = draftPostsDocs?.docs?.map(doc => doc.data())

    return { props: { draftPosts, host } }
}

export default Drafts