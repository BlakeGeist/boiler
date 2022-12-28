import React from 'react'
import Layout from 'components/Layout'
import { FeaturedPost, Post } from 'components/Post'
import { Heading, FeaturedCards } from 'components/pages/IndexPageStyles'

const IndexPage = ({ posts }) => {

    const daPosts = posts

    const featuredPosts = posts.slice(0, 4)

    const regularPosts = posts.slice(4, posts.length)

    return (
        <Layout>
            <>
                <Heading><span>Featured</span></Heading>
                <FeaturedCards>
                    {featuredPosts.map((post, i) => {
                        return <FeaturedPost key={`${post.slug}-${i}-key`} post={post} />
                    })}
                </FeaturedCards>
                <Heading><span>All Stories</span></Heading>
                <FeaturedCards>
                    {regularPosts?.map((post, i) => {
                        return <Post key={`${post.slug}-${i}-key`} post={post} />
                    })}
                </FeaturedCards>
            </>
        </Layout>
    )
}

export default IndexPage