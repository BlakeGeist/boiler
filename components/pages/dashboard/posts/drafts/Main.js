import React from 'react'

import PostsTable from '../components/PostsTable'

const ScheduledPostsTemplate = ({ host, posts }) => {

    return (
        <>
            <h1>Draft Posts</h1>

            <hr />

            {posts &&        
                <PostsTable posts={posts} host={host} />
            }
        </>
    )
}

export default ScheduledPostsTemplate