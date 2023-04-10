import React from 'react'
import Head from 'next/head'
import { firebaseDb, getDocsFromQuery } from 'utils/firebase'
import { collection, query, limit, orderBy } from "firebase/firestore"
import IndexPage from 'components/pages/IndexPage'
import NewLayout from 'components/Layout/NewLayout'

const Home = ({ posts, site }) => (
  <>
    <Head>
      <title>Pet Blog - Pet Tips N Tricks</title>
      <meta name="description" content="Pet Blog, Articles, FAQs and How To's related to furry and scaly friends." />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <NewLayout site={site}>
      <NewLayout.Main>
        <IndexPage posts={posts} map={site.map} />
      </NewLayout.Main>
    </NewLayout>
  </>
)

export const getServerSideProps = async ({ req, locale  }) => {
  const { host } = req.headers
  const lang = locale

  const postsPath = `sites/${host}/langs/${lang}/posts`
  const postsQuery = query(collection(firebaseDb, postsPath), orderBy('createdAt', "desc"), limit(10))
  const posts = await getDocsFromQuery(postsQuery) || null

  return { props: { posts } }
}

export default Home
