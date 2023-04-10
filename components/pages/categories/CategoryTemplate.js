import React from 'react'
import PostsTemplate from 'components/pages/posts/PostsTemplate'

const CategoryTemplate = ({ category, posts, locale, host }) => {
    return (
        <main>
            <h1>{category.name}</h1>
            <p>{category.description}</p>
            <PostsTemplate host={host} posts={posts} locale={locale} />
        </main>
    )
}

export default CategoryTemplate