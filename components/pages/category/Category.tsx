import React from 'react'
import Link from 'next/link'
import { StyledList, ReadMore } from 'components/pages/category/index.styles'

const Categories = ({ categories }) => {
    return (
        <>
            <h1>Categories</h1>
            <StyledList>
                {categories.map((category) => {
                    console.log(category)
                    return (
                        <li key={category.name}>
                            <h2>
                                <Link href={`/categories/${category.slug}`}>
                                    {category.name}
                                </Link>
                            </h2>

                            <p>{category.description}</p>
                        
                            <ReadMore>
                                <Link href={`/categories/${category.slug}`}>
                                    Full Category &#8594;
                                </Link>
                            </ReadMore>
                        </li>
                    )
                })}
            </StyledList>    
        </>
 
    )
}

export default Categories