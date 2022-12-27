import React from 'react'
import { firebaseDb } from 'utils/firebase'
import { getDocs, collection } from "firebase/firestore"
import Layout from 'components/Layout'
import Link from 'next/link'
import { StyledList, ReadMore } from 'components/pages/category/index.styles'

const Categories = ({ categories }) => {
    console.log(categories)
    return (
        <Layout>
            <>
                <h1>Categories</h1>
                <StyledList>
                    {categories.map((category) => {
                        return (
                            <li key={category.slug}>
                                <h2>
                                    <Link href={`/categories/${category.slug}`}>
                                        <a>{category.name}</a>
                                    </Link>
                                </h2>

                                <p>{category.description}</p>
                            
                                <ReadMore>
                                    <Link href={`/categories/${category.slug}`}>
                                        <a>Full Category &#8594;</a>
                                    </Link>
                                </ReadMore>
                            </li>
                        )
                    })}
                </StyledList>
            </>
        </Layout>
    )
}

export const getServerSideProps = async ({ req }) => {
    const host = req.headers.host
    const docsSnap = await getDocs(collection(firebaseDb,`sites/${host}/categories`))
    const categories = docsSnap.docs.map(doc => doc.data())
  
    return { props: { categories } }
  }
  

export default Categories