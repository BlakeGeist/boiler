import React, { useState } from 'react'
import 'react-datetime-picker/dist/DateTimePicker.css'
import 'react-calendar/dist/Calendar.css'
import 'react-clock/dist/Clock.css'

import PostsTable from './components/PostsTable'

const ScheduledPostsTemplate = ({ host, scheduledPosts, lang }) => {
    const [posts, setPosts] = useState(scheduledPosts)
    return (
        <>
            <h1>Scheduled Posts</h1>

            <hr />

            <PostsTable setPosts={setPosts} posts={posts} host={host} lang={lang} />
        </>
    )
}

export default ScheduledPostsTemplate