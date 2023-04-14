import React from 'react'
import 'react-datetime-picker/dist/DateTimePicker.css'
import 'react-calendar/dist/Calendar.css'
import 'react-clock/dist/Clock.css'

import PostsTable from './components/PostsTable'

const ScheduledPostsTemplate = ({ host, scheduledPosts }) => {
    return (
        <>
            <h1>Scheduled Posts</h1>

            <hr />

            <PostsTable posts={scheduledPosts} host={host} />
        </>
    )
}

export default ScheduledPostsTemplate