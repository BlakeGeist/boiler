import React, { useState } from 'react'
import moment from 'moment'
import { LoadingButton } from '@mui/lab'
import Link from 'next/link'
import styled from 'styled-components'
import { createPostFromName } from './createFromProductName'

const ArticleIdeaContainer = styled.div`
    border-bottom: 1px solid #dbdbdb;
    padding: 25px 0;
`

const ArticleIdeaContainerButtons = styled.div`
    display: inline-flex;
    max-width: 400px;
    width: 100%;
    justify-content: space-between;
`

const ArticleIdea = ({ handleDeleteArticle, articleIdea, host }) => {
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
        const postSlug = await createPostFromName(articleIdea, host)
        setLinkToScheduledPost(postSlug)
        setIsLoading(false)
    }

    const scheduledDate = articleIdea.publishedDate ? moment(articleIdea.publishedDate, "YYYY/MM/DD:HH:mm:ss").format('YYYY/MM/DD:hh:mm:ss').toString() : ''

    return (
        <ArticleIdeaContainer>
            <p>
                <strong>Title: </strong> {articleIdea.title}
            </p>
            <div>
                <p>
                    <strong>Schedule: </strong> {scheduledDate}
                </p>
                <div>
                    <p>
                        <strong>Keywords: </strong>
                    </p>
                    <ul>
                        {articleIdea.keywords?.map(keyword => {
                            return <li key={`${articleIdea.title}-${keyword}-keyword`}>{keyword}</li>
                        })}
                    </ul>
                </div>
            </div>

            <LinkToScheduledPost />

            <ArticleIdeaContainerButtons>
                <LoadingButton onClick={handleOnClick} loading={isLoading} loadingIndicator="Loading…" variant="outlined">Generate and schdule article</LoadingButton>
                <LoadingButton onClick={e => handleDeleteArticle(articleIdea, e)} loading={isLoading} loadingIndicator="Loading…" variant="outlined">Delete</LoadingButton>
            </ArticleIdeaContainerButtons>
        </ArticleIdeaContainer>   
    )
}

export default ArticleIdea