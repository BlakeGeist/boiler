import React, { useState } from 'react'
import Layout from 'components/Layout'
import PostTemplate from 'components/pages/post/Post'
import Link from 'next/link'
import { LoadingButton } from '@mui/lab'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import GetArticleIdeas from 'components/Post/GetArticleIdeas'
import ArticleIdeas from 'components/Post/ArticleIdeas'

import Stepper from 'components/Post/Stepper'
import StepText from 'components/Post/StepText'
import { StepHeading } from 'components/Post/NewPostTemplate/styles'
import { submitArticle } from 'components/Post/NewPostTemplate/submitArticle'

const NewPostTemplate = ({ site, host }) => {
    const [articleIdeas, setArticleIdeas] = useState([])
    const [loading, setLoading] = useState(false)
    const [step, setStep] = useState(1)
    const [selectedIdea, setSelectedIdea] = useState('')
    const [post, setPost] = useState({})
    const [html, setHtml] = useState()
    const [faqs, setFaqs] = useState([])
    const [listItems, setListItems] = useState([])

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

    return (
        <Layout site={site}>
            <>
                <StepHeading><strong>Step {step} of 4 : <span><StepText step={step} /></span></strong></StepHeading>

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
                    <ArticleIdeas articleIdeas={articleIdeas} setSelectedIdea={setSelectedIdea} setPost={setPost} setStep={setStep} />
                }

                {selectedIdea.length > 0 &&
                    <button onClick={(e) => clearSelectedIdea(e)}>Clear Selected Idea</button>
                }

                {step === 3 &&
                    <form onSubmit={(e) => submitArticle(selectedIdea, e, setStep, setPost, host, setHtml, setLoading, setFaqs, post, setListItems )}>
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
                        <div>
                            <label htmlFor="keywords">Keywords</label> <br />
                            <input name="keywords" id="keywords" type="text" />
                        </div>                          
                        <LoadingButton  type="submit" loading={loading} loadingIndicator={"Loading..."} variant="outlined">
                            Create Article
                        </LoadingButton>
                    </form>
                }

                {post?.heading &&
                    <div>
                        {post.keywords}
                        <hr />
                        <PostTemplate 
                            post={post}
                            html={html}
                            host={host}
                            site={site}
                            faqs={faqs}
                            listItems={listItems}
                            categories={post.categories}
                            mapSrc={post.map}
                        />
                    </div>
                }
            </>
        </Layout>
    )
}

export default NewPostTemplate