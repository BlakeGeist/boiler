import React from 'react'
import moment from 'moment'

const ArticleIdea = ({ articleIdea }) => {
    if(!articleIdea.title) return null

    const scheduledDate = articleIdea.publishedDate ? moment(articleIdea.publishedDate, "YYYY/MM/DD:HH:mm:ss").format('YYYY/MM/DD:hh:mm:ss').toString() : ''
    return (
        <div>
            <div>
                <strong>Title: </strong> {articleIdea.title}
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
                        {articleIdea.keywords?.map(keyword => {
                            return <li key={`${articleIdea.title}-${keyword}-keyword`}>{keyword}</li>
                        })}
                    </ul>
                </div>
            </div>
        </div>   
    )
}

export default ArticleIdea