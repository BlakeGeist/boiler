import React from 'react'
import { firebaseDb } from 'utils/firebase'
import { getDocs, collection, doc, getDoc } from "firebase/firestore"
import CategoriesTemplate from 'components/pages/category/Category'

const Categories = ({ categories, site }) => <CategoriesTemplate categories={categories} site={site} />

export const getServerSideProps = async ({ req }) => {
    const host = req.headers.host
    const docsSnap = await getDocs(collection(firebaseDb,`sites/${host}/categories`))
    const categories = docsSnap.docs.map(doc => doc.data())
  
    const siteRef = doc(firebaseDb, "sites", host)
    const siteDoc = await getDoc(siteRef)
    const site = siteDoc.data()

    return { props: { categories, site } }
  }
  

export default Categories