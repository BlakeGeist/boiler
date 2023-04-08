import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'

const Li = styled.li`
    padding: 10px 0;
`

const Post = ({post}) => {
    return (
        <Li>
            <Link href={`/post/${post.slug}`}>
                {post.heading}
            </Link>
        </Li>
    )
}

const RecentPosts = ({ recentPostsRef, recentPosts }) => {
    if(!recentPosts) return null

    return (
        <>
            <h2 ref={recentPostsRef} id="recent-posts"><span>Recent Posts</span></h2>
            <ul >
                {recentPosts.map(post => <Post key={post.slug} post={post} />)}
            </ul>            
        </>

    )
}

export default RecentPosts