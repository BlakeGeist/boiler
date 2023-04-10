import React from 'react'
import { firebaseDb, getDocsFromQuery } from 'utils/firebase'
import { collection, limit, query } from "firebase/firestore"
import CategoriesTemplate from 'components/pages/category/Category'
import NewLayout from 'components/Layout/NewLayout'

const Categories = ({ categories, site }) => (
    <NewLayout site={site}>
        <NewLayout.Main>
            <CategoriesTemplate categories={categories} />
        </NewLayout.Main>
    </NewLayout>
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