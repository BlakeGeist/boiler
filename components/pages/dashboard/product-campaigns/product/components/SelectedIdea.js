import React from 'react'
import moment from 'moment'
import axios from 'axios'

const ScheduledIdea = ({ item }) => {
    const scheduledDate = item.publishedDate ? moment(item.publishedDate, "YYYY/MM/DD:HH:mm:ss").format('YYYY/MM/DD:hh:mm:ss').toString() : ''

    const handleGetImagePrompt = async (e) => {
        e.preventDefault()

        const prompt = `
            You are a proffesional copy writer, using that experience,
            please create and return an image description that would describe the header image of a web article titled "${item.title}"
        `

        let params = {
            prompt
        }

        const resp = await axios.get('/api/getPromptReponse', { params })

        console.log(await resp.data.trim())
    }
 
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
                <div>
                    <button onClick={handleGetImagePrompt}>Generate Header Image</button>
                </div>
            </div>
        </li>
    )
}

export default ScheduledIdea