import React from 'react'
import Layout from 'components/Layout'
import Link from 'next/link'

const Dashboard = ({ posts }) => {
    return (
        <Layout>
            <>
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