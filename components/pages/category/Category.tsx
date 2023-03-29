import React from 'react'
import Link from 'next/link'
import { StyledList, ReadMore } from 'components/pages/category/index.styles'
import Layout from 'components/Layout'

const Categories = ({ categories, site }) => {
    return (
        <Layout site={site}>
            <>
                <h1>Categories</h1>
                <StyledList>
                    {categories.map((category) => {
                        console.log(category)
                        return (
                            <li key={category.name.name}>
                                <h2>
                                    <Link href={`/categories/${category.name.slug}`}>
                                        <a>{category.name.name}</a>
                                    </Link>
                                </h2>

                                <p>{category.description}</p>
                            
                                <ReadMore>
                                    <Link href={`/categories/${category.name.slug}`}>
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