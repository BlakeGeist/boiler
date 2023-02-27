import React from 'react'
import Head from 'next/head'
import { firebaseDb } from 'utils/firebase'
import { getDocs, collection, query, limit, orderBy, doc, getDoc } from "firebase/firestore"
import IndexPage from 'components/pages/IndexPage'

const Home = ({ posts, site }) => (
  <>
    <Head>
      <title>Geist App</title>
      <meta name="description" content="Blake's create blog sites app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <IndexPage posts={posts} site={site} />
  </>
)

export const getServerSideProps = async ({ req }) => {
  const host = req.headers.host
  const postsQuery = query(collection(firebaseDb, `sites/${host}/posts`), orderBy('createdAt', "desc"), limit(10))
  const postsSnap = await getDocs(postsQuery)
  const posts = postsSnap.docs.map(doc => doc.data())

  const docRef = doc(firebaseDb, "sites", host)
  const siteDoc = await getDoc(docRef)
  const site = siteDoc.data()

  return { props: { posts: posts || null, site  } }
}

export default Home
