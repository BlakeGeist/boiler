import React from 'react'
import { firebaseDb } from 'utils/firebase'
import { collection, getDocs, limit, query, orderBy, doc, getDoc } from "firebase/firestore"
import Layout from 'components/Layout'
import PostsTemplate from 'components/pages/posts/PostsTemplate'

const Posts = ({ posts, host, site }) => {
    return (
        <Layout site={site}>
            <PostsTemplate host={host} posts={posts} />
        </Layout>
    )
}

export const getServerSideProps = async ({ req, locale }) => {
    const lang = locale
    const host = req.headers.host
    const postsQuery = query(collection(firebaseDb, `sites/${host}/lang/${lang}/posts`), orderBy('createdAt', "desc"), limit(10))
    const postsSnap = await getDocs(postsQuery)
    const posts = postsSnap.docs.map(doc => doc.data())

    const siteRef = doc(firebaseDb, "sites", host)
    const siteDoc = await getDoc(siteRef)
    const site = siteDoc.data()

    return { props: { posts: posts || null, host, site } }
  }
  

export default Posts