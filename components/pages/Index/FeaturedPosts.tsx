import React from 'react'
import { FeaturedPost, Post } from 'components/Post'
import { FeaturedCards } from 'components/pages/IndexPageStyles'

export const FeaturedPosts = ({ featuredPosts }) => (
    <FeaturedCards>
        {featuredPosts.map((post, i) => {
            return <FeaturedPost key={`${post.slug}-${i}-key`} post={post} />
        })}
    </FeaturedCards>
)

export const Posts = ({ regularPosts }) => (
    <FeaturedCards>
        {regularPosts?.map((post, i) => {
            return <Post key={`${post.slug}-${i}-key`} post={post} />
        })}
    </FeaturedCards>        
)