import React from 'react'
import PostTableRow from './PostTableRow'

import styled from 'styled-components'

const Table = styled.table`
    border-collapse: collapse;
    width: 100%;
    table-layout: fixed;

    th {
        text-align: left
    }

    td {
        padding: 5px 0;
    }

    td:last-of-type {
        text-align: right;
    }

    tr {
        border-bottom: 1px solid #ccc;
    }
`

const PostHeading = styled.th`
    width: 375px;
`

const PostDate = styled.th`
    width: 150px;
`

const PostStatus = styled.th`
    width: 300px; 
`

const PostsTable = ({ setPosts, posts, lang, host }) => {
    return (
        <Table>
            <thead>
                <tr>
                    <PostHeading>Title</PostHeading>
                    <PostDate>Publish Date</PostDate>
                    <PostStatus>Status</PostStatus>
                </tr>
            </thead>
            <tbody>
                {posts.map(post => <PostTableRow key={post.slug} setPosts={setPosts} posts={posts} post={post} host={host} lang={lang} />)}
            </tbody>
        </Table>
    )
}

export default PostsTable