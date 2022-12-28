import React from 'react'
import Layout from 'components/Layout'
import { FeaturedPost, Post } from 'components/Post'
import { Heading, FeaturedCards } from 'components/pages/IndexPageStyles'

const IndexPage = ({ posts }) => {
    const featuredPosts = posts.slice(0, 4)
    const regularPosts = posts.slice(4, posts.length)

    const FeaturedPosts = () => (
        <FeaturedCards>
            {featuredPosts.map((post, i) => {
                return <FeaturedPost key={`${post.slug}-${i}-key`} post={post} />
            })}
        </FeaturedCards>
    )

    const Posts = () => (
        <FeaturedCards>
            {regularPosts?.map((post, i) => {
                return <Post key={`${post.slug}-${i}-key`} post={post} />
            })}
        </FeaturedCards>        
    )

    return (
        <Layout>
            <>
                <Heading><span>Featured</span></Heading>
                <FeaturedPosts />
                <Heading><span>All Stories</span></Heading>
                <Posts />
            </>
        </Layout>
    )
}

export default IndexPage