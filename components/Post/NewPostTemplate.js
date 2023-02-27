import React, { useState } from 'react'


import Layout from 'components/Layout'
import axios from 'axios'
//import { useRouter } from "next/router"
import styled from 'styled-components'
import PostTemplate from 'components/pages/post/Post'
import { stateToHTML } from "draft-js-export-html"
import { convertFromRaw } from 'draft-js'
import Link from 'next/link'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

import GetArticleIdeas from 'components/Post/GetArticleIdeas'
import ArticleIdeas from 'components/Post/ArticleIdeas'

const CreateArticleHeading = styled.h1`
    span {
        font-size: 16px;
    }
`

const NewPostTemplate = ({ site, host }) => {
    const [articleIdeas, setArticleIdeas] = useState([])
    const [loading, setLoading] = useState(false)
    const [articleLoading, setArticleLoading] = useState(false)
    const [step, setStep] = useState(1)
    

    const [post, setPost] = useState({})
    const [html, setHtml] = useState()

    const submitArticle = async (promptText, e) => {
        e.preventDefault()
        const params = {
            host,
            prompt: promptText,
            headingText: promptText
        }
        setStep(3)
        setArticleLoading(true)

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
            .then(() => { 
                setArticleLoading(false)
                //router.push(`/posts/${params.slug}`)
            })
            .catch(e => {
                console.log(e)
            })

    }

    const stepText = () => {
        switch(step) {
            case 1:
                return 'Generate article ideas'         
            case 2:
                return 'Add image desc fields'
            case 3:
                return 'Creating post'
            case 4:
                return 'Creating post secondary data'
            case 5:
                return 'Create categories'
            case 6:
                return 'Creating faqs'
            case 7:
                return 'Creating listicle' 
            case 8:
                return 'Creating header image' 
            case 9:
                return 'Creating medium image'
              
            default:
                return 'Create Article'                 
        }
    }


    return (
        <Layout site={site}>
            <>
                <CreateArticleHeading><strong>Step {step} of 9 : <span>{stepText()}</span></strong></CreateArticleHeading>

                {post?.slug &&
                    <Link href={`/post/${post.slug}`}>
                        <a target="_blank">Go to post</a>
                    </Link>
                }

                {step === 1 &&
                    <GetArticleIdeas loading={loading} setLoading={setLoading} host={host} setArticleIdeas={setArticleIdeas} setStep={setStep} />
                }

                {step === 2 &&
                    <ArticleIdeas articleIdeas={articleIdeas} submitArticle={submitArticle} articleLoading={articleLoading} />
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