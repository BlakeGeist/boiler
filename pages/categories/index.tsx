import React from 'react'
import { firebaseDb, getDocsFromQuery } from 'utils/firebase'
import { collection, limit, query } from "firebase/firestore"
import CategoriesTemplate from 'components/pages/category/Category'
import Layout from 'components/Layout'

const Categories = ({ categories, site }) => (
    <Layout site={site}>
        <Layout.Main>
            <CategoriesTemplate categories={categories} />
        </Layout.Main>
    </Layout>
)

export const getServerSideProps = async ({ req, locale }) => {
    const host = req.headers.host
    const lang = locale

    const categoriesPath = `sites/${host}/langs/${lang}/categories`
    const categoriesQuery = query(collection(firebaseDb, categoriesPath), limit(10))
    const categories = await getDocsFromQuery(categoriesQuery)

    return { props: { categories } }
  }
  

export default Categories