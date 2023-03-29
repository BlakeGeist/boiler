import React from 'react'
import { firebaseDb, getDocFromPathAndSlug, getDocsFromQuery } from 'utils/firebase'
import { collection, limit, query } from "firebase/firestore"
import CategoriesTemplate from 'components/pages/category/Category'

const Categories = ({ categories, site }) => <CategoriesTemplate categories={categories} site={site} />

export const getServerSideProps = async ({ req, query: reqQuery }) => {
    const host = req.headers.host
    const { lang } = reqQuery

    const categoriesPath = `sites/${host}/langs/${lang}/categories`
    const categoriesQuery = query(collection(firebaseDb, categoriesPath), limit(6))
    const categories = await getDocsFromQuery(categoriesQuery)

    const site = await getDocFromPathAndSlug("sites", host)

    return { props: { categories, site } }
  }
  

export default Categories