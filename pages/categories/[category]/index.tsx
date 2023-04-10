import React, { FC } from 'react'
import { firebaseDb } from 'utils/firebase'
import { doc, getDoc, query, collection, where, getDocs, orderBy } from "firebase/firestore"
import CategoryTemplate from 'components/pages/categories/CategoryTemplate'
import Head from 'next/head'
import NewLayout from 'components/Layout/NewLayout'

interface CategoryProps {
    category: any
    posts: any
    host: string
    site: any
    locale: string
}

const Category:FC<CategoryProps> = ({ category, posts, host, site, locale }) => (
    <>
        <Head>
            <title>{category.categoryMetaTitle}</title>
            <meta name="description" content={category.categoryMetaDesc} />
        </Head>
        <NewLayout site={site}>
            <NewLayout.Main>
                <CategoryTemplate host={host} posts={posts} locale={locale} category={category} />
            </NewLayout.Main>
        </NewLayout>
    </>
)

export const getServerSideProps = async ({ req, locale, query: reqQuery }) => {
    const host = req.headers.host
    const slug = reqQuery.category
    const lang = locale

    const docRef = doc(firebaseDb, `/sites/${host}/langs/${lang}/categories`, slug)
    const postDoc = await getDoc(docRef)
    const category = postDoc.data()

    const postsRef = collection(firebaseDb, `sites/${host}/langs/${lang}/posts`)
    const q = query(postsRef, where("simpleCategoriesArray", "array-contains", slug), orderBy("createdAt", "desc"))
    const querySnapshot = await getDocs(q)
    const posts = querySnapshot?.docs?.map(doc => doc.data())

    return {
        props: { category, host, posts, locale } // will be passed to the page component as props
    }
}

export default Category