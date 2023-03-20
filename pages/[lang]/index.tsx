import React from 'react'
import Head from 'next/head'
import { firebaseDb } from 'utils/firebase'
import { getDocs, collection, query, limit, orderBy, doc, getDoc } from "firebase/firestore"
import IndexPage from 'components/pages/IndexPage'

const Home = ({ posts, site, lang }) => (
  <>
    <Head>
      <title>Geist App</title>
      <meta name="description" content="Blake's create blog sites app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <IndexPage posts={posts} site={site} lang={lang} />
  </>
)

export const getServerSideProps = async ({ req, query: reqQuery }) => {
  const host = req.headers.host
  const lang = reqQuery.lang

  const postsQuery = query(collection(firebaseDb, `sites/${host}/posts`), orderBy('createdAt', "desc"), limit(10))
  const postsSnap = await getDocs(postsQuery)
  const posts = postsSnap.docs.map(doc => doc.data())

  const docRef = doc(firebaseDb, "sites", host)
  const siteDoc = await getDoc(docRef)
  const site = siteDoc.data()

  return { props: { posts: posts || null, site, lang  } }
}

export default Home
