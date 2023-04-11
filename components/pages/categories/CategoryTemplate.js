import React from 'react'
import PostsMain from 'components/pages/posts/Main'

const CategoryTemplate = ({ category, posts, locale, host }) => {
    return (
        <>
            <h1>{category.name}</h1>
            <p>{category.description}</p>
            <PostsMain host={host} posts={posts} locale={locale} />
        </>
    )
}

export default CategoryTemplate