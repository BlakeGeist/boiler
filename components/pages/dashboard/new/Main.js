import React, { useState } from 'react'
import PostMain from 'components/pages/posts/post/Main'
import Link from 'next/link'
import { LoadingButton } from '@mui/lab'
import { useRouter } from "next/router"

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import GetArticleIdeas from './components/GetArticleIdeas'
import ArticleIdeas from './components/ArticleIdeas'

import Stepper from './components/Stepper'
import StepText from './components/StepText'
import { StepHeading } from './styles'
import { submitArticle } from './submitArticle'

import styled from 'styled-components'

import axios from 'axios'
import Button from '@mui/material/Button'
import { languages } from 'utils/languages'
import { doc, deleteDoc } from "firebase/firestore"
import { firebaseDb } from 'utils/firebase'

const PostControlsContrainer = styled.div`
    button {
        margin: 0 10px;
    }
`

const NewPostTemplate = ({ site, host, lang }) => {
    const router = useRouter()

    const [articleIdeas, setArticleIdeas] = useState([])
    const [loading, setLoading] = useState(false)
    const [step, setStep] = useState(1)
    const [selectedIdea, setSelectedIdea] = useState('')
    const [post, setPost] = useState({})
    const [html, setHtml] = useState()
    const [faqs, setFaqs] = useState([])
    const [listItems, setListItems] = useState([])
    const [keywords, setKeywords] = useState([])
    const [keywordsInput, setKeywordsInput] = useState('')

    const clearSelectedIdea = (e) => {
        e.preventDefault()
        setSelectedIdea('')
        setPost({})
        setStep(2)
        setLoading(false)
        setHtml()
        setFaqs([])
        setListItems([])
    }

    const handleAddKeyword = (e) => {
        e.preventDefault()
        const keyword = e.target.keyword.value
        setKeywords([...keywords, keyword])
        setKeywordsInput('')
    }
    
    const handleRemoveKeyword = (e, keyword) => {
        e.preventDefault()
        const filteredKeywords = keywords.filter((k) => k !== keyword)
        setKeywords(filteredKeywords)
    }
    const [currentlyTranslating, setCurrentlyTranslating] = useState('')
    const [isTranslating, setIsTranslating] = useState(false)

    const deletePost = async (e) => {
        e.preventDefault()
    
        const postPath = `/sites/${host}/langs/${lang}/posts`
        await deleteDoc(doc(firebaseDb, postPath, post.slug))
            .then(() => {
                router.push(`/dashboard`)
            })
            .catch(e => console.log('error:, ', e))
    }
    

    const translatePost = async (e) => {
        e.preventDefault()
        
        setIsTranslating(true)

        for(let i = 0; languages.length > i; i++) {
            setCurrentlyTranslating(languages[i].name)
            await axios.get('/api/translatePost', { params: {
                host,
                slug: post.slug,
                lang: languages[i].code
            } }).catch(e => {
                console.log('Error translating post, ', e)
            })
        }
        setIsTranslating(false)
        setPost({
            ...post,
            isTranslated: true
        })
    }

    
    return (
        <>
            <StepHeading><strong>Step {step} of 4 : <span><StepText step={step} /></span></strong></StepHeading>

            <hr />

            <Stepper step={step} setStep={setStep} />

            {post?.slug &&
                <Link href={`/posts/${post.slug}`} target="_blank">
                    Go to post
                </Link>
            }

            {step === 1 &&
                <GetArticleIdeas loading={loading} setLoading={setLoading} host={host} setArticleIdeas={setArticleIdeas} setStep={setStep} />
            }

            {step === 2 && selectedIdea.length === 0 &&
                <ArticleIdeas articleIdeas={articleIdeas} setSelectedIdea={setSelectedIdea} setPost={setPost} setStep={setStep} />
            }

            {selectedIdea.length > 0 &&
                <button onClick={(e) => clearSelectedIdea(e)}>Clear Selected Idea</button>
            }

            {step === 3 &&
                <>
                    <form onSubmit={(e) => submitArticle(selectedIdea, e, setStep, setPost, host, setHtml, setLoading, post, keywords )}>
                        <div>
                            <label htmlFor="headerImage">Describe Header Image</label> <br />
                            <input name="headerImage" id="headerImage" type="text" />
                        </div>
                        <div>
                            <label htmlFor="mediumImage">Describe Medium Image</label> <br />
                            <input name="mediumImage" id="mediumImage" type="text" />
                        </div>
                        <div>
                            <label htmlFor="map">Map Url</label> <br />
                            <input name="map" id="map" type="text" />
                        </div>
                        <LoadingButton  type="submit" loading={loading} loadingIndicator={"Loading..."} variant="outlined">
                            Create Article
                        </LoadingButton>
                    </form>

                    {keywords.map(keyword => {
                        return (
                            <div key={keyword}>
                                {keyword} - 

                                <button onClick={e => handleRemoveKeyword(e, keyword)}>Remove Keyword</button>
                            </div>
                        )
                    })}

                    <form onSubmit={(e) => handleAddKeyword(e)}>
                        <label htmlFor="keyword">Add Keyword</label>
                        <input type="text" value={keywordsInput || ""} onChange={e => setKeywordsInput(e.target.value)} name="keyword" id="keyword" />
                        <input type="submit" />
                    </form>
                </>
            }

            {post?.heading &&
                <div>
                    {post.keywords}
                    <hr />

                    <PostControlsContrainer>
                        {!post.isTranslated &&
                            <LoadingButton onClick={e => translatePost(e)} loading={isTranslating} variant="outlined">Translate</LoadingButton>
                        }
                        {isTranslating && 
                            `Translating to ${currentlyTranslating}`
                        }
                        <Button onClick={(e) => deletePost(e)} variant="outlined">Delete</Button>
                    </PostControlsContrainer>

                    <PostMain 
                        post={post}
                        html={html}
                        host={host}
                        site={site}
                        faqs={faqs}
                        listItems={listItems}
                        categories={post.categories}
                        mapSrc={post.map}
                        promptText={selectedIdea}
                        setFaqs={setFaqs}
                        isEditable={true}
                    />
                </div>
            }
        </>
    )
}

export default NewPostTemplate