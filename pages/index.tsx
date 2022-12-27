import React from 'react'
import Head from 'next/head'
import { firebaseDb } from 'utils/firebase'
import { getDocs, collection, query, limit, orderBy } from "firebase/firestore"
import HomePage from 'components/pages/Home'

const Home = ({ posts }) => (
  <>
    <Head>
      <title>Geist App</title>
      <meta name="description" content="Blake's create blog sites app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  
    <HomePage posts={posts} />
  </>
)

export const getServerSideProps = async ({ req }) => {
  const host = req.headers.host
  const postsQuery = query(collection(firebaseDb, `sites/${host}/posts`), orderBy('createdAt', "desc"), limit(10))
  const postsSnap = await getDocs(postsQuery)
  const posts = postsSnap.docs.map(doc => doc.data())

  return { props: { posts: posts || null  } }
}

export default Home
