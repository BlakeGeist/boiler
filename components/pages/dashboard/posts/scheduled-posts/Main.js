import React from 'react'
import { collection, addDoc } from "firebase/firestore" 
import { firebaseDb } from 'utils/firebase'
import 'react-datetime-picker/dist/DateTimePicker.css'
import 'react-calendar/dist/Calendar.css'
import 'react-clock/dist/Clock.css'
import timestamp from 'time-stamp'
import { useRouter } from 'next/router'

import PostsTable from './components/PostsTable'

const ScheduledPostsTemplate = ({ host, scheduledPosts }) => {
    const router = useRouter()

    console.log(scheduledPosts)

    const handleClick = async (e) => {
        e.preventDefault()
        const createdAt = timestamp('YYYY/MM/DD:mm:ss')

        const post = {
            createdAt: createdAt
        }

        const docRef = await addDoc(collection(firebaseDb, `/sites/${host}/scheduledPosts`), post)
        router.push(`/dashboard/scheduled-posts/${docRef.id}`)

    }

    return (
        <>
            <h1>Scheduled Posts</h1>
            <button>Schedule Post</button>
            <button onClick={handleClick}>Create Draft</button>

            <hr />

            <PostsTable posts={scheduledPosts} host={host} />
        </>
    )
}

export default ScheduledPostsTemplate