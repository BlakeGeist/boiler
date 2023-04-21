import React, { useState } from 'react'
import moment from 'moment'
import axios from 'axios'
import { LoadingButton } from '@mui/lab'
import Link from 'next/link'
import styled from 'styled-components'

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

        try {
            const prompt = `
                You are a proffesional copy writer, using that experience,
                please create and return an image description that would describe the header image of a web article titled "${articleIdea.title}"
            `

            let headerImagePromptParams = {
                prompt
            }

            const headerImagePromptPrompt = await axios.get('/api/getPromptReponse', { params: headerImagePromptParams })

            const mediumPrompt = `
                You are a proffesional copy writer, using that experience,
                please create and return an image description that would describe the seeondary or embeded image of a web article titled "${articleIdea.title}"
            `

            let mediumImagePromptParams = {
                prompt: mediumPrompt
            }

            const mediumImagePrompt = await axios.get('/api/getPromptReponse', { params: mediumImagePromptParams })

            let params = {
                ...articleIdea,
                host,
                lang: 'en',
                prompt: articleIdea.title,
                keywords: articleIdea.keywords.toString(),
                headerImagePrompt: headerImagePromptPrompt.data.trim(),
                mediumImagePrompt: mediumImagePrompt.data.trim()
            }

            const createPostFromHeadingResp = await axios.get('/api/createPostFromHeading', { params })
            
            params = {
                ...params,
                slug: createPostFromHeadingResp.data.slug
            }
            
            axios.get('/api/addSecondaryPostData',   { params })
            axios.get('/api/addAndCreateCategories', { params })
            axios.get('/api/addFaqsToPost',          { params })
            axios.get('/api/addListicle',            { params })
            axios.get('/api/addHeaderImage',         { params })
            axios.get('/api/addMediumImage',         { params })

            setIsLoading(false)
            setLinkToScheduledPost(createPostFromHeadingResp.data.slug)


        } catch(e) {
            console.log('there was an error creating the post, ', e)
        }

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