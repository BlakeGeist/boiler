import React, { useState } from 'react'
import { setDoc, doc } from "firebase/firestore" 
import { firebaseDb } from 'utils/firebase'
import DateTimePicker from 'react-datetime-picker'
import 'react-datetime-picker/dist/DateTimePicker.css'
import 'react-calendar/dist/Calendar.css'
import 'react-clock/dist/Clock.css'
import NewPostModal from 'components/Modals/NewPost'

const ScheduledPostsTemplate = ({ host }) => {
    const [value, onChange] = useState(new Date())
    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const handleClick = async (e) => {
        e.preventDefault()
        const slug = 'test-slug'
        
        const post = {
            createdAt: value,
            slug
        }

        await setDoc(doc(firebaseDb, `/sites/${host}/scheduledPosts`, slug), post)       
    }

    return (
        <>
            <h1>Scheduled Posts</h1>

            <button onClick={handleOpen}>Schedule Post</button>

            <DateTimePicker onChange={onChange} value={value} />

            <NewPostModal open={open} handleClose={handleClose} />

            <button onClick={handleClick}>Test</button>
        </>
    )
}

export default ScheduledPostsTemplate