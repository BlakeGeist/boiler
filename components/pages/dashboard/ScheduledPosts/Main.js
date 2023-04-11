import React from 'react'
import { setDoc, doc } from "firebase/firestore" 
import { firebaseDb } from 'utils/firebase'
import 'react-datetime-picker/dist/DateTimePicker.css'
import 'react-calendar/dist/Calendar.css'
import 'react-clock/dist/Clock.css'
import NewPostModal from 'components/Modals/NewPost'
import timestamp from 'time-stamp'

const ScheduledPostsTemplate = ({ host }) => {
    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const handleClick = async (e) => {
        e.preventDefault()
        const createdAt = timestamp('YYYY/MM/DD:mm:ss')

        const slug = 'test-slug'
        
        const post = {
            createdAt: createdAt,
            slug
        }

        await setDoc(doc(firebaseDb, `/sites/${host}/scheduledPosts`, slug), post)       
    }

    return (
        <>
            <h1>Scheduled Posts</h1>
            <button onClick={handleOpen}>Schedule Post</button>
            <NewPostModal host={host} open={open} handleClose={handleClose} />
            <button onClick={handleClick}>Test</button>
        </>
    )
}

export default ScheduledPostsTemplate