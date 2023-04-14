import React, { useState } from 'react'
import 'react-datetime-picker/dist/DateTimePicker.css'
import 'react-calendar/dist/Calendar.css'
import 'react-clock/dist/Clock.css'
import DateTimePicker from 'react-datetime-picker'
import { doc, updateDoc } from "firebase/firestore"
import moment from 'moment'
import { firebaseDb } from 'utils/firebase'

//TODO make it so you cannot translate until the post is scheduled.

const Scheduling = ({ handleScheduleUpdate, postSlug, host, lang }) => {
    const [dateSelected, setDateSlected] = useState(new Date())

    const onClick = async (e) => {
        e.preventDefault()

        const transformedDate = moment(transformedDate).format('YYYY/MM/DD:hh:mm:ss')
        handleScheduleUpdate(transformedDate)

        console.log(transformedDate)

        const post = {
            publishedDate: transformedDate,
            status: 'scheduled'
        }
    
        const postRef = doc(firebaseDb, `/sites/${host}/langs/${lang}/posts`, postSlug)

        await updateDoc(postRef, post)
    }

    return (
        <div>
            <h2>Scheduling</h2>
            <DateTimePicker onChange={setDateSlected} value={dateSelected} />
            <button onClick={onClick}>Submit Scheduled Date</button>
        </div>
    )
}

export default Scheduling