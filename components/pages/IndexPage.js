import React from 'react'
import { FeaturedPosts, Posts } from 'components/pages/Index/FeaturedPosts'
import { Heading } from 'components/pages/IndexPageStyles'

const IndexPage = ({ posts }) => {
    const featuredPosts = posts.slice(0, 4)
    const regularPosts = posts.slice(4, posts.length)

    return (
        <>
            <Heading><span>Featured</span></Heading>
            <FeaturedPosts featuredPosts={featuredPosts} />
            <Heading><span>All Stories</span></Heading>
            <Posts regularPosts={regularPosts} />
        </>
    )
}

export default IndexPage

