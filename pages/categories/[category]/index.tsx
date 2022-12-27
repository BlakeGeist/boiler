import React from 'react'
import { firebaseDb } from 'utils/firebase'
import { doc, getDoc } from "firebase/firestore"
import Layout from 'components/Layout'
import Head from 'next/head'
import { useRouter } from "next/router"

const Category = ({ category }) => {
    return (
        <>
            <Head>
                <title>{category.categoryMetaTitle}</title>
                <meta name="description" content={category.categoryMetaDesc} />
            </Head>
            <Layout>
                <>
                    <p>{category.description}</p>
                </>
            </Layout>
        </>
    )
}

export const getServerSideProps = async (ctx) => {
    const host = ctx.req.headers.host
    const slug = ctx.query.category

    const docRef = doc(firebaseDb, "sites", host, "categories", slug)
    const postDoc = await getDoc(docRef)
    const category = postDoc.data()

    return {
        props: { category, host } // will be passed to the page component as props
    }
}

export default Category