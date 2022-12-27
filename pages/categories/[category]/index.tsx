import React from 'react'
import { firebaseDb } from 'utils/firebase'
import { doc, getDoc, query, collection, where, getDocs, orderBy } from "firebase/firestore"
import Layout from 'components/Layout'
import Head from 'next/head'
import PostsTemplate from 'components/pages/posts/PostsTemplate'

const Category = ({ category, posts, host }) => {
    console.log(posts)
    return (
        <>
            <Head>
                <title>{category.categoryMetaTitle}</title>
                <meta name="description" content={category.categoryMetaDesc} />
            </Head>
            <Layout>
                <>
                    <h1>{category.name}</h1>
                    <p>{category.description}</p>
                    <PostsTemplate host={host} posts={posts} />
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

    const postsRef = collection(firebaseDb, "sites", host, 'posts')
    const q = query(postsRef, where("categories", "array-contains", category.name), orderBy("createdAt", "desc"))
    const querySnapshot = await getDocs(q)
    const posts = querySnapshot.docs.map(doc => doc.data())

    return {
        props: { category, host, posts } // will be passed to the page component as props
    }
}

export default Category