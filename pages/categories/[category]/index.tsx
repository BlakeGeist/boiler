import React from 'react'
import { firebaseDb } from 'utils/firebase'
import { doc, getDoc, deleteDoc } from "firebase/firestore"
import Layout from 'components/Layout'
import Head from 'next/head'
import { useRouter } from "next/router"

// Remove the 'capital' field from the document

const Category = ({ category_data }) => {

    const catRef = doc(firebaseDb, 'categories', category_data.slug)
    const router = useRouter()

    const deleteCategory = async () => {
        await deleteDoc(catRef).then(() => {
            router.push(`/categories`)
        })
    }

    return (
        <>
            <Head>
                <title>{category_data.meta_title}</title>
                <meta name="description" content={category_data.meta_description} />
            </Head>
            <Layout>
                <>
                    <p><button onClick={() => deleteCategory()}>Delete</button></p>
                    <p>{category_data.category_emoji}</p>
                    <p>{category_data.category_description}</p>
                </>
            </Layout>
        </>
    )
}

export const getServerSideProps = async (ctx) => {
    const docRef = doc(firebaseDb, "categories", ctx.query.category)
    const category = await getDoc(docRef)

    const category_data = category.data()

  
    return {
        props: { category_data }, // will be passed to the page component as props
      }
}

export default Category