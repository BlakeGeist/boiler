import React from 'react'
import moment from 'moment'

const ScheduledIdea = ({ item }) => {

    const scheduledDate = item.publishedDate ? moment(item.publishedDate, "YYYY/MM/DD:HH:mm:ss").format('YYYY/MM/DD:hh:mm:ss').toString() : ''

    return (
        <li style={{borderBottom: '1px solid #ccc', padding: '15px 0'}} key={`${item.title}-checkbox-item`}>
            <div>
                <strong>Title: </strong> {item.title}
            </div>
            <div>
                <div>
                    <strong>Schedule: </strong> {scheduledDate}
                </div>
                <div>
                    <div>
                        <strong>Keywords: </strong>
                    </div>
                    <ul>
                        {item.keywords?.map(keyword => {
                            return <li key={`${item.title}-${keyword}-keyword`}>{keyword}</li>
                        })}
                    </ul>

                </div>
            </div>
        </li>
    )
}

export default ScheduledIdea