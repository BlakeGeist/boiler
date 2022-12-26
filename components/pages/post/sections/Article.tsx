import React from 'react'
import styled from 'styled-components'

const ArticleContainer = styled.div`
    img {
        float: left;
        margin: 0 15px 5px 0;
    }
`

const Article = ({ articleRef, html }) => {
    if(!html) return null
    
    return (
        <ArticleContainer ref={articleRef} dangerouslySetInnerHTML={{__html: html}} />
    )
}

export default Article