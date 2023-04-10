import React from 'react'
import Link from 'next/link'

const Dashboard = ({ posts }) => {
    return (
        <>
            <Link href="/dashboard/new">
                New Post
            </Link>

            <h2>Posts</h2>

            <ul>
                {posts.map((post) => {
                    return (
                        <li key={post.slug}>
                            <Link href={`/post/${post.slug}`}>{post.heading}</Link></li>
                    )
                })}
            </ul>
        </>
    )
}

export default Dashboard