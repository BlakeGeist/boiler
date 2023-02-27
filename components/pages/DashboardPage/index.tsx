import React from 'react'
import Layout from 'components/Layout'
import Link from 'next/link'

const Dashboard = ({ posts, site }) => {
    return (
        <Layout site={site}>
            <>
                <Link href="/dashboard/new">
                    <a>New Post</a>
                </Link>

                <h2>Posts</h2>

                <ul>
                    {posts.map((post) => {
                        return (
                            <li key={post.slug}>
                                <Link href={`/post/${post.slug}`}><a>{post.heading}</a></Link></li>
                        )
                    })}
                </ul>
            </>
        </Layout>
    )
}

export default Dashboard