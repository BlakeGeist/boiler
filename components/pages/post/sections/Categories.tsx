import React from 'react'
import styled from 'styled-components'

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
        <CategoriesContainer>
            {categories?.map((category, i) => {
                return (
                    <Category key={`${category}-${i}-key`}>
                        {category}
                    </Category>
                )
            })}
        </CategoriesContainer>
    )
}

export default Categories