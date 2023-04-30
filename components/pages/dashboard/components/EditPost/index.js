import React from 'react'
import HeaderImage from './components/HeaderImage'
import Heading from './components/Heading'
import styled from 'styled-components'
import BodyImage from './components/BodyImage'
import Faqs from './components/Faqs'

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

const TextImageContainer = styled.div`
    img {
        float: left;
        margin: 0 15px 5px 0;
        max-width: 250px;
    }
`

const EditPost = ({ isEditing, post, host }) => {
    
    const html = post?.articleHtml || ''

    return (
        <>

            <hr />

            <HeaderImage post={post} host={host} />
            
            <hr />

            <Heading isEditing={isEditing} host={host} post={post} />

            <TextImageContainer>

                <BodyImage post={post} host={host} />

                <ArticleContainer dangerouslySetInnerHTML={{__html: html}} />
            
            </TextImageContainer>

            <Faqs post={post} host={host} />

        </>
    )
}

export default EditPost