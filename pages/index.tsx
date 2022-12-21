import React from 'react'
import Head from 'next/head'
import { firebaseDb } from 'utils/firebase'
import { doc, getDoc } from "firebase/firestore"
import HomePage from 'components/pages/Home'

const Home = ({ site }) => (
  <>
    <Head>
      <title>Geist App</title>
      <meta name="description" content="Blake's create blog sites app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <div>
      <HomePage site={site} />
    </div>
  </>
)

export const getServerSideProps = async ({ req }) => {
  const host = req.headers.host
  const docRef = doc(firebaseDb, "sites", host)
  const siteDoc = await getDoc(docRef)
  const site = siteDoc.data()

  return { props: { site: site || null  } }
}

export default Home
