import React from 'react'
import HeaderImage from './components/HeaderImage'
import Heading from './components/Heading'


const EditPost = ({ post, host }) => {
    return (
        <>
            <HeaderImage post={post} />
            <Heading host={host} post={post} />
        </>
    )
}

export default EditPost