import React from 'react'
import { firebaseDb, getDocsFromQuery } from 'utils/firebase'
import { collection, limit, query, orderBy } from "firebase/firestore"
import Layout from 'components/Layout'
import DashboardPostsMain from 'components/pages/dashboard/posts/Main'
import Breadcrumbs from 'components/BreadCrumbs'
import Link from 'next/link'

const DashboardPosts = ({ site, posts, host, lang }) => (
    <Layout site={site}>
        <Layout.Main>
            <Breadcrumbs pathArray={[{text: 'Dashboard', href: "/dashboard"}, {text: 'Posts'}]} />
            <ul>
                <li>
                    <Link href="/dashboard/posts/new">New Post</Link>
                </li>
                <li>
                    <Link href="/dashboard/posts/drafts">Draft Posts</Link>
                </li>
                <li>
                    <Link href="/dashboard/posts/scheduled-posts">Scheduled Posts</Link>
                </li>                                
            </ul>
            <DashboardPostsMain host={host} lang={lang} posts={posts} />
        </Layout.Main>
    </Layout>
)

export const getServerSideProps = async ({ req, locale }) => {
    const lang = locale
    const host = req.headers.host

    const postsPath = `sites/${host}/langs/${lang}/posts`
    const postsQuery = query(collection(firebaseDb, postsPath), orderBy('createdAt', "desc"), limit(10))
    const posts = await getDocsFromQuery(postsQuery) || null

    return { props: { posts, host, lang } }
}

export default DashboardPosts