import React from 'react'
import { firebaseDb } from 'utils/firebase'
import { collection, getDocs, query, limit } from "firebase/firestore"
import Layout from 'components/Layout'
import Link from 'next/link'
import { StyledList, StyledDivider, ReadMore } from 'components/pages/category/index.styles'

const Categories = ({ categories }) => {
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
                                        <a>{category.category_name} {category.category_emoji}</a>
                                    </Link>
                                </h2>

                                <p>{category.category_description}</p>
                            
                                <ReadMore>
                                    <Link href={`/categories/${category.slug}`}>
                                        <a>Full Category &#8594;</a>
                                    </Link>
                                </ReadMore>

                                <StyledDivider emoji={category.category_emoji}/>                      
                            </li>
                        )
                    })}
                </StyledList>
            </>
        </Layout>
    )
}

export const getServerSideProps = async () => {
    const orderedDocs = query(collection(firebaseDb, "categories"), limit(100))
    const querySnapshot = await getDocs(orderedDocs)
    const categories = querySnapshot.docs.map(doc => doc.data())
  
    return { props: { categories: categories || null  } }
  }
  

export default Categories