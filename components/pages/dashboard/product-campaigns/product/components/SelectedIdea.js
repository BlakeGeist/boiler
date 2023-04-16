import React, { useState } from 'react'
import 'react-datetime-picker/dist/DateTimePicker.css'
import 'react-calendar/dist/Calendar.css'
import 'react-clock/dist/Clock.css'
import DateTimePicker from 'react-datetime-picker'
import moment from 'moment'

const ScheduledIdea = ({ item }) => {
    const [dateSelected, setDateSelected] = useState(item.publishedDate ? moment(item.publishedDate, "YYYY/MM/DD:HH:mm:ss").toDate() : new Date())

    return (
        <li key={`${item.title}-checkbox-item`}>
            {item.title}
            <div>
                <div>
                    <strong>Schedule:</strong>
                    <DateTimePicker onChange={setDateSelected} value={dateSelected} />
                </div>
            </div>
        </li>
    )
}

export default ScheduledIdea