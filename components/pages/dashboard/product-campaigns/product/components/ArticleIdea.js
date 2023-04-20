import React, { useState } from 'react'
import moment from 'moment'
import axios from 'axios'
import { LoadingButton } from '@mui/lab'
import Link from 'next/link'

const ArticleIdea = ({ articleIdea, host, lang }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [linkToScheduledPost, setLinkToScheduledPost] = useState('')

    const LinkToScheduledPost = () => {
        if(linkToScheduledPost.length === 0) return null
        return (
            <div>
                <Link href={`/dashboard/posts/drafts/${linkToScheduledPost}`}>
                    <strong>View Scheduled Post:</strong> {articleIdea.title}
                </Link>
            </div>
        )
    }

    if(!articleIdea.title) return null
    const handleOnClick = async (e) => {
        e.preventDefault()

        setIsLoading(true)

        const params = {
            ...articleIdea,
            host,
            lang,
            prompt: articleIdea.title,
            keywords: articleIdea.keywords.toString()
        }

        const resp = await axios.get('/api/createPostFromHeading', { params })

        console.log(resp)

        setIsLoading(false)
        setLinkToScheduledPost(resp.data.slug)
    }

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

            <LinkToScheduledPost />

            <LoadingButton  onClick={handleOnClick} loading={isLoading} loadingIndicator="Loading…" variant="outlined">Generate and schdule article</LoadingButton>
            
            <hr />
        </div>   
    )
}

export default ArticleIdea