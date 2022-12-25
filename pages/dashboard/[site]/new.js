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
                console.log(res)
                setLoading(false)
                setArticleIdeas(res.data)
            })
            .catch(e => console.log(e))

    }

    const submitArticle = async (promptText, e) => {
        e.preventDefault()
        const params = {
            host,
            prompt: promptText
        }

        await axios.get('/api/createPost', { params })
            .then(async (res) => {
                const params = {
                    slug: res.data.slug,
                    prompt: promptText,
                    host,
                    headingText: promptText
                }

                await axios.get('/api/addSecondaryPostData', { params })
                return params
            })
            .then(async (params) => { 
                await axios.get('/api/addFaqsToPost', { params })
                return params
            })
            .then(async (params) => { 
                await axios.get('/api/addListicle', { params })
                return params
            })
            .then(async (params) => {
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
                params = {
                    ...params,
                    mediumImagePrompt: e.target.mediumImage.value
                }
                console.log(params)
                await axios.get('/api/addMediumImage', { params })
                return params
            })
            .then(() => { 
                //router.push(`/posts/${params.slug}`)
            })
            .catch(e => {
                console.log(e)
            })

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
                                    <input type="submit" />
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