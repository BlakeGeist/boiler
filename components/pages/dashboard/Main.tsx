import React from 'react'
import Link from 'next/link'

const Dashboard = () => {
    return (
        <>
            <h1>Dashboard</h1>

            <ul>
                <li>
                    <Link href="/dashboard/posts">Posts</Link>
                    <ul>
                        <li><Link href="/dashboard/posts/new">New Post</Link></li>
                        <li><Link href="/dashboard/posts/drafts">Draft Posts</Link></li>
                        <li><Link href="/dashboard/posts/scheduled-posts">Scheduled Posts</Link></li>
                    </ul>
                </li>
            </ul>
        </>
    )
}

export default Dashboard