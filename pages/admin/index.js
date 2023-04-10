import React from 'react'
import { getDoc, doc } from "firebase/firestore"
import AdminPageTemplate from 'components/pages/Admin'
import { firebaseDb } from 'utils/firebase'
import Layout from 'components/Layout'

const Admin = ({ site }) => (
    <Layout site={site}>
        <AdminPageTemplate site={site} />
    </Layout>
)

export const getServerSideProps = async ({ req }) => {
    const host = req.headers.host
    const docRef = doc(firebaseDb, "sites", host)
    const siteDoc = await getDoc(docRef)
    const site = siteDoc.data()

    return { props: { site } } 
}

export default Admin