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

const RecentPosts = ({ recentPostsRef, recentPosts }) => {
    if(!recentPosts) return null
    
    return (
        <>
            <h2 ref={recentPostsRef} id="recent-posts"><span>Recent Posts</span></h2>
            <ul style={{listStyle: 'none', padding: '0'}}>
                {recentPosts.map(post => <Post key={post.slug} post={post} />)}
            </ul>            
        </>

    )
}

export default RecentPosts