import React from 'react'
import { firebaseDb } from 'utils/firebase'
import { doc, getDoc } from "firebase/firestore";
import Layout from 'components/Layout'
import Head from 'next/head'

const Category = ({ category_data }) => {
    console.log(category_data)
    return (
        <>
            <Head>
                <title>{category_data.meta_title}</title>
                <meta name="description" content={category_data.meta_description} />
            </Head>
            <Layout heading={category_data.category_heading}>
                <p>{category_data.category_description}</p>
            </Layout>
        </>
    )
}

export const getServerSideProps = async (ctx) => {
    const docRef = doc(firebaseDb, "categories", ctx.query.category);
    const category = await getDoc(docRef);

    const category_data = category.data()

    return {
        props: { category_data }, // will be passed to the page component as props
      }
}

export default Category