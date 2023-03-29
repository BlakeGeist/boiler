import React from 'react'
import { firebaseDb } from 'utils/firebase'
import { doc, getDoc, query, collection, where, getDocs, orderBy } from "firebase/firestore"
import Layout from 'components/Layout'
import Head from 'next/head'
import PostsTemplate from 'components/pages/posts/PostsTemplate'

const Category = ({ category, posts, host, site, locale }) => {
    return (
        <>
            <Head>
                <title>{category.categoryMetaTitle}</title>
                <meta name="description" content={category.categoryMetaDesc} />
            </Head>
            <Layout site={site}>
                <>
                    <h1>{category.name}</h1>
                    <p>{category.description}</p>
                    <PostsTemplate host={host} posts={posts} locale={locale} />
                </>
            </Layout>
        </>
    )
}

export const getServerSideProps = async ({ req, locale, query: reqQuery }) => {
    const host = req.headers.host
    const slug = reqQuery.category
    const lang = locale

    const docRef = doc(firebaseDb, `/sites/${host}/langs/${lang}/categories`, slug)
    const postDoc = await getDoc(docRef)
    const category = postDoc.data()

    const postsRef = collection(firebaseDb, `sites/${host}/langs/${lang}/posts`)
    const q = query(postsRef, where("categories", "array-contains", category.name), orderBy("createdAt", "desc"))
    const querySnapshot = await getDocs(q)
    const posts = querySnapshot.docs.map(doc => doc.data())

    const siteRef = doc(firebaseDb, "sites", host)
    const siteDoc = await getDoc(siteRef)
    const site = siteDoc.data()

    return {
        props: { category, host, posts, site, locale } // will be passed to the page component as props
    }
}

export default Category