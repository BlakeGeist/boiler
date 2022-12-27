import React, { useState } from 'react'
import { doc, getDoc, collection, getDocs } from 'firebase/firestore'
import { firebaseDb } from 'utils/firebase'
import Layout from 'components/Layout'
import axios from 'axios'
//import { useRouter } from "next/router"
import { LoadingButton } from '@mui/lab'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

const NewPost = ({ site, host }) => {
    const [articleIdeas, setArticleIdeas] = useState([])
    const [loading, setLoading] = useState(false)
    const [articleLoading, setArticleLoading] = useState(false)
    const [step, setStep] = useState(1)
    
    const getArticleIdeas = async (e) => {
        e.preventDefault()
        const promptText = e.target.prompt.value
        setLoading(true)

        const params = {
            host,
            prompt: promptText
        }


        await axios.get('/api/getArticleIdeas', { params })
            .then((res) => {
                setStep(2)
                setLoading(false)
                setArticleIdeas(res.data)
            })
            .catch(e => console.log(e))

    }

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
                setStep(4)
                await axios.get('/api/addSecondaryPostData', { params })
                return params
            })
            .then(async (params) => {
                setStep(5)
                await axios.get('/api/addAndCreateCategories', { params })
                return params
            })
            .then(async (params) => { 
                setStep(6)
                await axios.get('/api/addFaqsToPost', { params })
                return params
            })
            .then(async (params) => {
                setStep(7)
                await axios.get('/api/addListicle', { params })
                return params
            })
            .then(async (params) => {
                setStep(8)
                console.log(e.target)
                params = {
                    ...params,
                    headerImagePrompt: e.target.headerImage.value
                }
                console.log(params)
                await axios.get('/api/addHeaderImage', { params })
                return params
            })
            .then(async (params) => {
                setStep(9)
                params = {
                    ...params,
                    mediumImagePrompt: e.target.mediumImage.value
                }
                console.log(params)
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

    const stepButtonText = () => {
        switch(step) {
            case 1:
                return 'Generate Article Ideas'         
            case 2:
                return 'Add Image Desc Fields'
            case 3:
                return 'Creating Post'
            case 4:
                return 'Creating Post Secondary Data'
            case 5:
                return 'Create Categories'                  
            case 6:
                return 'Creating Faqs'
            case 7:
                return 'Creating Listicle' 
            case 8:
                return 'Creating Header Image' 
            case 9:
                return 'Creating Medium Image'
              
            default:
                return 'Create Article'                 
        }
    }

    return (
        <Layout>
            <>
                <h1>{site.domain}</h1>
                <h2>New Post</h2>

                <ul style={{listStyle: 'none', padding: '0'}}>
                    {articleIdeas?.map((idea, i) => {
                        return (
                            <li key={`${idea}-${i}`}>
                                {idea}
                                <form onSubmit={(e) => submitArticle(idea, e)}>
                                    <input type="text" name="headerImage" />
                                    <input type="text" name="mediumImage" />
                                    <LoadingButton type="submit" loading={articleLoading} loadingIndicator={stepButtonText()} variant="outlined">
                                        Create Article
                                    </LoadingButton>
                                </form>
                            </li>
                        )
                    })}
                </ul>

                <form onSubmit={getArticleIdeas}>
                    <input type="input" name="prompt" />
                    <LoadingButton type="submit" loading={loading} loadingIndicator="Loading…" variant="outlined">
                        Get Article Ideas
                    </LoadingButton>                    
                </form>

            </>
        </Layout>
    )
}

export const getServerSideProps = async ({req}) => {
    const host = req.headers.host
    const docRef = doc(firebaseDb, "sites", host)
    const siteDoc = await getDoc(docRef)
    const site = siteDoc.data()

    const subColRef = collection(firebaseDb, "sites", host, "posts")
    const qSnap = await getDocs(subColRef)
    const posts = qSnap.docs?.map(d => ({id: d.id, ...d.data()}))
  
    const faqsSnap = await getDocs(collection(firebaseDb,`sites/${host}/faqs`))
    const faqs = faqsSnap.docs.map(doc => doc.data())

    return {
        props: { site, posts: posts || null, host, faqs }
    }
}

export default NewPost