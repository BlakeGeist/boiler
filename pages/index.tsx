import React from 'react'
import Head from 'next/head'
import { firebaseDb, getDocsFromQuery } from 'utils/firebase'
import { collection, query, limit, orderBy } from "firebase/firestore"
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

export const getServerSideProps = async ({ req, locale  }) => {
  const { host } = req.headers
  const lang = locale

  const postsPath = `sites/${host}/langs/${lang}/posts`
  const postsQuery = query(collection(firebaseDb, postsPath), orderBy('createdAt', "desc"), limit(10))
  const posts = await getDocsFromQuery(postsQuery)

  return { props: { posts: posts || null } }
}

export default Home
