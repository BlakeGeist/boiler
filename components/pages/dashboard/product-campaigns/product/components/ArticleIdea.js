import React, { useState } from 'react'
import moment from 'moment'
import axios from 'axios'
import { LoadingButton } from '@mui/lab'
import Link from 'next/link'

const ArticleIdea = ({ articleIdea, host }) => {
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