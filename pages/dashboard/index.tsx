import React from 'react'
import Head from 'next/head'
import DashboardPage from 'components/pages/DashboardPage'
import { firebaseDb } from 'utils/firebase'
import { query, collection, getDocs, limit } from 'firebase/firestore'

const Dashboard = ({ sites }) => {
    return (
        <>
        <Head>
          <title>Geist App</title>
          <meta name="description" content="Blake's create blog sites app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
      
        <DashboardPage sites={sites} />
      </>
    )
}

export const getServerSideProps = async () => {
    const orderedDocs = query(collection(firebaseDb, "sites"), limit(100))
    const querySnapshot = await getDocs(orderedDocs)
    const sites = querySnapshot.docs.map(doc => doc.data())
  
    return { props: { sites: sites || null  } }
}

export default Dashboard
