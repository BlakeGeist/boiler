import React from 'react'
import { firebaseDb, getDocsFromQuery } from 'utils/firebase'
import { collection, limit, query, orderBy } from "firebase/firestore"
import Layout from 'components/Layout'
import PostsTemplate from 'components/pages/posts/PostsTemplate'

const Posts = ({ posts, host, site, locale }) => {
    return (
        <Layout site={site}>
            <PostsTemplate host={host} posts={posts} locale={locale} />
        </Layout>
    )
}

export const getServerSideProps = async ({ req, locale }) => {
    const lang = locale
    const host = req.headers.host

    const postsPath = `sites/${host}/langs/${lang}/posts`
    const postsQuery = query(collection(firebaseDb, postsPath), orderBy('createdAt', "desc"), limit(10))
    const posts = await getDocsFromQuery(postsQuery)

    return { props: { posts: posts || null, host, locale } }
  }
  

export default Posts