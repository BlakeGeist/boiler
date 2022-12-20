import React from 'react'
import Head from 'next/head'
import HomePage from '../components/pages/Home'
import { firebaseDb } from 'utils/firebase'
import { collection, getDocs, query, limit } from "firebase/firestore"

const Home = ({ sites }) => (
    <>
      <Head>
        <title>Geist App</title>
        <meta name="description" content="Blake's create blog sites app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HomePage sitesArray={sites} />
    </>
  )


export const getServerSideProps = async () => {
  const orderedDocs = query(collection(firebaseDb, "sites"), limit(100))
  const querySnapshot = await getDocs(orderedDocs)
  const sites = querySnapshot.docs.map(doc => doc.data())

  return { props: { sites: sites || null  } }
}

export default Home
