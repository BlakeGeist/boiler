import React from 'react'
import Layout from 'components/Layout'
import { FeaturedPosts, Posts } from 'components/pages/Index/FeaturedPosts'
import { Heading } from 'components/pages/IndexPageStyles'

const IndexPage = ({ posts }) => {
    const featuredPosts = posts.slice(0, 4)
    const regularPosts = posts.slice(4, posts.length)

    return (
        <Layout>
            <>
                <Heading><span>Featured</span></Heading>
                <FeaturedPosts featuredPosts={featuredPosts} />
                <Heading><span>All Stories</span></Heading>
                <Posts regularPosts={regularPosts} />
            </>
        </Layout>
    )
}

export default IndexPage