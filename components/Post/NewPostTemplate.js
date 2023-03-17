import React, { useState } from 'react'


import Layout from 'components/Layout'
import axios from 'axios'
//import { useRouter } from "next/router"
import styled from 'styled-components'
import PostTemplate from 'components/pages/post/Post'
import { stateToHTML } from "draft-js-export-html"
import { convertFromRaw } from 'draft-js'
import Link from 'next/link'
import { useRouter } from "next/router"

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

import GetArticleIdeas from 'components/Post/GetArticleIdeas'
import ArticleIdeas from 'components/Post/ArticleIdeas'
import BuildArticle from 'components/Post/BuildArticle'
import SectionsBuilder from 'components/Post/SectionsBuilder'

import Heading from 'components/Post/Sections/Heading'
import Article from 'components/Post/Sections/Article'

import Stepper from 'components/Post/Stepper'
import StepText from 'components/Post/StepText'
import { StepHeading } from 'components/Post/NewPostTemplate.styles'

const NewPostTemplate = ({ site, host }) => {
    const [articleIdeas, setArticleIdeas] = useState([])
    const [loading, setLoading] = useState(false)
    const [step, setStep] = useState(1)
    const [selectedIdea, setSelectedIdea] = useState('')
    const [post, setPost] = useState({})
    const [html, setHtml] = useState()

    const router = useRouter()

    const submitArticle = async (promptText, e) => {
        e.preventDefault()
        const params = {
            host,
            prompt: promptText,
            headingText: promptText
        }

        setStep(3)

        await axios.get('/api/createPost', { params })
            .then(async (res) => {
                const params = {
                    slug: res.data.slug,
                    prompt: promptText,
                    host
                }
                setPost(res.data)
                setStep(4)

                const article = JSON.parse(res.data.article)

                const blocks = article.blocks
            
                const test =   {
                    key: '28ewer6nu',
                    text: ` `,        
                    type: 'atomic',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [{ offset: 0, length: 1, key: 0 }],
                    data: {}
                  }
            
                const entity = {
                    '0': {
                        type: 'IMAGE',
                        mutability: 'MUTABLE',
                        data: {
                          src: post.mediumImageSrc,
                          height: 'auto',
                          width: '225',
                          alt: 'a'
                        }
                      }
                }
            
                const start = Math.ceil(5)  
                blocks.splice(start, 0, test)
            
                article.blocks = blocks
                article.entityMap = entity

                setHtml(stateToHTML(convertFromRaw(article)))

                console.log("addSecondaryPostData ", params)
                await axios.get('/api/addSecondaryPostData', { params })
                return params
            })
            .then(async (params) => {
                setStep(5)
                console.log("addAndCreateCategories ", params)
                await axios.get('/api/addAndCreateCategories', { params })
                return params
            })
            .then(async (params) => { 
                setStep(6)
                console.log("addFaqsToPost ", params)
                await axios.get('/api/addFaqsToPost', { params })
                return params
            })
            .then(async (params) => {
                setStep(7)
                console.log("addListicle ", params)
                await axios.get('/api/addListicle', { params })
                return params
            })
            .then(async (params) => {
                setStep(8)
                params = {
                    ...params,
                    headerImagePrompt: e.target.headerImage.value
                }
                console.log("addHeaderImage ", params)
                await axios.get('/api/addHeaderImage', { params })
                return params
            })
            .then(async (params) => {
                setStep(9)
                params = {
                    ...params,
                    mediumImagePrompt: e.target.mediumImage.value
                }
                console.log("addMediumImage ", params)
                await axios.get('/api/addMediumImage', { params })
                return params
            })
            .then((params) => { 
                router.push(`/post/${params.slug}`)
            })
            .catch(e => {
                console.log(e)
            })

    }



    const clearSelectedIdea = (e) => {
        e.preventDefault()
        setSelectedIdea('')
    }

    return (
        <Layout site={site}>
            <>
                <StepHeading><strong>Step {step} of 9 : <span><StepText step={step} /></span></strong></StepHeading>

                <hr />

                <Stepper step={step} setStep={setStep} />

                {post?.slug &&
                    <Link href={`/post/${post.slug}`}>
                        <a target="_blank">Go to post</a>
                    </Link>
                }

                {step === 1 &&
                    <GetArticleIdeas loading={loading} setLoading={setLoading} host={host} setArticleIdeas={setArticleIdeas} setStep={setStep} />
                }

                {step === 2 && selectedIdea.length === 0 &&
                    <ArticleIdeas articleIdeas={articleIdeas} setSelectedIdea={setSelectedIdea} />
                }

                {selectedIdea.length > 0 &&
                    <button onClick={(e) => clearSelectedIdea(e)}>Clear Selected Idea</button>
                }

                {post?.heading &&
                    <PostTemplate 
                        post={post}
                        html={html}
    
                        host={host}
                        site={site}
                    />
                }
            </>
        </Layout>
    )
}

export default NewPostTemplate