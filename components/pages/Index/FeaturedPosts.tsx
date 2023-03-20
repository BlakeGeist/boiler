import React from 'react'
import { FeaturedPost, Post } from 'components/Post'
import { FeaturedCards } from 'components/pages/IndexPageStyles'

export const FeaturedPosts = ({ featuredPosts, lang }) => (
    <FeaturedCards>
        {featuredPosts.map((post, i) => {
            return <FeaturedPost key={`${post.slug}-${i}-key`} post={post} lang={lang} />
        })}
    </FeaturedCards>
)

export const Posts = ({ regularPosts, lang }) => (
    <FeaturedCards>
        {regularPosts?.map((post, i) => {
            return <Post key={`${post.slug}-${i}-key`} post={post} lang={lang} />
        })}
    </FeaturedCards>        
)