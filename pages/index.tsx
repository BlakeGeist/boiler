import React from 'react'
import Head from 'next/head'
import { firebaseDb, getDocsFromQuery } from 'utils/firebase'
import { collection, query, limit, orderBy, doc, getDoc, where } from "firebase/firestore"
import IndexPage from 'components/pages/IndexPage'
import Layout from 'components/Layout'

const Home = ({ posts, site }) => (
  <>
    <Head>
      <title>Pet Blog - Pet Tips N Tricks</title>
      <meta name="description" content="Pet Blog, Articles, FAQs and How To's related to furry and scaly friends." />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Layout site={site}>
      <Layout.Main>
        <IndexPage posts={posts} />
      </Layout.Main>
    </Layout>
  </>
)

export const getServerSideProps = async ({ req, locale  }) => {
  const { host } = req.headers
  const lang = locale

  const postsPath = `sites/${host}/langs/${lang}/posts`
  const postsQuery = query(collection(firebaseDb, postsPath), where('status', '==', 'published'),  orderBy('createdAt', "desc"), limit(10))
  const posts = await getDocsFromQuery(postsQuery) || null

  const siteRef = doc(firebaseDb, "sites", host)
  const siteDoc = await getDoc(siteRef)
  const site = siteDoc.data()

  return { props: { posts, site } }
}

export default Home
