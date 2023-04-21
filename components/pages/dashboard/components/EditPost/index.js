import React from 'react'
import HeaderImage from './components/HeaderImage'
import Heading from './components/Heading'
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

const EditPost = ({ isEditing, post, host }) => {
    
    
    let splitArticle = post?.articleHtml?.split(/(<p>)/g) || ''

    splitArticle.length > 1 ? splitArticle?.splice(2, 0, `<img src="${post.mediumImageSrc}" />`).join('') : ''

    const html = splitArticle.length > 1 ? splitArticle.join('') : ''

    return (
        <>
            <HeaderImage post={post} />
            <Heading isEditing={isEditing} host={host} post={post} />

            <ArticleContainer dangerouslySetInnerHTML={{__html: html}} />


        </>
    )
}

export default EditPost