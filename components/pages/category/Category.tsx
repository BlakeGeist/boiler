import React from 'react'
import Link from 'next/link'
import { StyledList, ReadMore } from 'components/pages/category/index.styles'
import Layout from 'components/Layout'

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

export default Categories