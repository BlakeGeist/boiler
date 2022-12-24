import React, { useState } from 'react'
import { doc, getDoc, collection, getDocs } from 'firebase/firestore'
import { firebaseDb } from 'utils/firebase'
import Layout from 'components/Layout'
import axios from 'axios'
import { useRouter } from "next/router"
import { LoadingButton } from '@mui/lab'

//import { EditorState } from 'draft-js'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

const Site = ({ site, posts, host }) => {
    //const [setEditorState] = useState(EditorState.createEmpty())
    //const [postFaqs, setPostFaqs] = useState(faqs || [])
    //const [resp, setResp] = useState({})
    const router = useRouter()

    const [loading, setLoading] = useState(false)

    //const onEditorStateChange = (editorState) => {
      //setEditorState(editorState)
    //}

    const onSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        const params = {
            host,
            prompt: e.target.prompt.value
        }

        await axios.get('/api/createPost', { params })
            .then((res) => {
                setLoading(false)
                console.log(res.data)

                router.push(`/posts/${res.data.slug}`)
            })
            .catch(e => {
                console.log(e)
            })
    }

    return (
        <Layout>
            <>
                <h1>{site.domain}</h1>
                <h2>Posts</h2>
                <ul>
                    {posts.map((post) => {
                        return (
                            <li key={post.slug}>{post.heading}</li>
                        )
                    })}
                </ul>

                <form onSubmit={onSubmit}>
                    <input type="input" name="prompt" />
                    <LoadingButton type="submit" loading={loading} loadingIndicator="Loading…" variant="outlined">
                        Generate
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

export default Site