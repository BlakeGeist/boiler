import React from 'react'
import { firebaseDb } from 'utils/firebase'
import { collection, getDocs, limit, query, orderBy } from "firebase/firestore"
import Layout from 'components/Layout'
import PostsTemplate from 'components/pages/posts/PostsTemplate'

const Posts = ({ posts, host }) => {
    return (
        <Layout>
            <PostsTemplate host={host} posts={posts} />
        </Layout>
    )
}

export const getServerSideProps = async ({ req }) => {
    const host = req.headers.host
    const postsQuery = query(collection(firebaseDb, `sites/${host}/posts`), orderBy('createdAt', "desc"), limit(10))
    const postsSnap = await getDocs(postsQuery)
    const posts = postsSnap.docs.map(doc => doc.data())

    return { props: { posts: posts || null, host } }
  }
  

export default Posts