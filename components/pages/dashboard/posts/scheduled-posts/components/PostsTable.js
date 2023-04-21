import React from 'react'
import PostTableRow from './PostTableRow'

import styled from 'styled-components'

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;

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

const PostsTable = ({ setPosts, posts, lang, host }) => {
    return (
        <Table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Publish Date</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {posts.map(post => <PostTableRow key={post.slug} setPosts={setPosts} posts={posts} post={post} host={host} lang={lang} />)}
            </tbody>
        </Table>
    )
}

export default PostsTable