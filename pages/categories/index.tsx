import React from 'react'
import { firebaseDb } from 'utils/firebase'
import { getDocs, collection } from "firebase/firestore"
import CategoriesTemplate from 'components/pages/category/Category'

const Categories = ({ categories }) => <CategoriesTemplate categories={categories} />

export const getServerSideProps = async ({ req }) => {
    const host = req.headers.host
    const docsSnap = await getDocs(collection(firebaseDb,`sites/${host}/categories`))
    const categories = docsSnap.docs.map(doc => doc.data())
  
    return { props: { categories } }
  }
  

export default Categories