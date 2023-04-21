import React, { useState } from 'react'
import PostsTable from './components/PostsTable'
import PostsSearchForm from './components/PostsSearchForm'

const DashboardPostsMain = ({ posts: initialPosts, host, lang }) => {
    const [ posts, setPosts] = useState(initialPosts)

    return (
        <>
            <h1>Dashboard - Posts</h1>
            <PostsSearchForm setPosts={setPosts} initialPosts={initialPosts} />
            <hr />
            <PostsTable setPosts={setPosts} posts={posts} host={host} lang={lang} />
        </>
    )
}

export default DashboardPostsMain