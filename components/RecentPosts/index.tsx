import React from 'react'
import Link from 'next/link'

const Post = ({post}) => {
    return (
        <li>
            <Link href={`/posts/${post.slug}`}>
                <a>{post.heading}</a>
            </Link>
        </li>
    )
}

const RecentPosts = ({recentPosts}) => {
    return (
        <ul style={{listStyle: 'none', padding: '0'}}>
            {recentPosts.map(post => <Post key={post.slug} post={post} />)}
        </ul>
    )
}

export default RecentPosts