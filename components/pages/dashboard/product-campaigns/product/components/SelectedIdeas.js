import React, { useState } from 'react'
import 'react-datetime-picker/dist/DateTimePicker.css'
import 'react-calendar/dist/Calendar.css'
import 'react-clock/dist/Clock.css'
import DateTimePicker from 'react-datetime-picker'

const SelectedIdeas = ({ selectedIdeas }) => {
    if(!selectedIdeas || selectedIdeas.length === 0) return null
    var m = new Date()
    
    return (
        <>
            <h2>Selected Ideas</h2>
            <ul>
                {selectedIdeas.map(item => {
                    const [dateSelected, setDateSlected] = useState(typeof window !== 'undefined' ? m : null)

                    return (
                        <li key={`${item.title}-checkbox-item`}>
                            {item.title}

                            <div>
                                <p>
                                    <strong>Schedule: </strong>
                                </p>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

export default SelectedIdeas