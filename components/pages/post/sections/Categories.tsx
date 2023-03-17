import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

const CategoriesContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    font-size: 14px;
`

const Category = styled.div`
    background: rgba(0,0,0,.05);
    color: rgba(0,0,0,.6);
    border-radius: 3px;
    padding: 5px 10px;
    margin: 10px 10px 0 0;
`

const Categories = ({ categories }) => {
    if(!categories) return null

    return (
        <>
            <button>Regenerate Categories</button>
            <CategoriesContainer>
                {categories?.map((category, i) => {
                    return (
                        <Link key={`${category.name}-${i}-key`} href={`/categories/${category.slug}`}>
                            <a>
                                <Category>
                                    {category.name}
                                </Category>
                            </a>
                        </Link>
                    )
                })}
            </CategoriesContainer>
        </>
    )
}

export default Categories