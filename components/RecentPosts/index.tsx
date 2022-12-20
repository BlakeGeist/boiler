import React from 'react'
import Link from 'next/link'

const Post = ({post}) => {
    return (
        <li>
            <Link href={`/posts/${post.slug}`}>
                <a>{post.post_heading}</a>
            </Link>
        </li>
    )
}

const RecentPosts = ({recentPosts}) => {
    return (
        <>
            <h2 id="recent-posts">Recent Posts</h2>
            <ul>
                {recentPosts.map(post => <Post key={post.slug} post={post} />)}
            </ul>
        </>
    )
}

export default RecentPosts