import React from 'react'
import Layout from 'components/Layout'
import Link from 'next/link'

const Dashboard = ({ posts, site }) => {
    return (
        <Layout site={site}>
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
        </Layout>
    )
}

export default Dashboard