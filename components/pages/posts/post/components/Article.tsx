import React from 'react'
import styled from 'styled-components'

const ArticleContainer = styled.div`
    img {
        float: left;
        margin: 0 15px 5px 0;
        max-width: 250px;
    }

    a {
        color: #ff2e2e;
    }
`

const Article = ({ articleRef, html }) => {
    if(!html) return null
    
    return (
        <ArticleContainer ref={articleRef} dangerouslySetInnerHTML={{__html: html}} />
    )
}

export default Article