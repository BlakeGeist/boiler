import React, { useState } from 'react'
import {Configuration, OpenAIApi } from 'openai'
import { doc, getDoc, collection, getDocs } from 'firebase/firestore'
import { firebaseDb } from 'utils/firebase'
import Layout from 'components/Layout'

//import { EditorState } from 'draft-js'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

const Site = ({ site, posts }) => {

    const configuration = new Configuration({
        apiKey: "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"
      })
    
    const openai = new OpenAIApi(configuration)

    //const [setEditorState] = useState(EditorState.createEmpty())
    //const [postFaqs, setPostFaqs] = useState(faqs || [])
    const [resp, setResp] = useState({})

    //const onEditorStateChange = (editorState) => {
      //setEditorState(editorState)
    //}

    const onClick = async (e) => {
        e.preventDefault()

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: "Create an article related to the stresses of moving homes for pets, use at least 900 words, site at least 2 sources, create a meta title for the article, create a meta description for the article",
            temperature: 0,
            max_tokens: 4000,
            top_p: 1,
            frequency_penalty: 0.2,
            presence_penalty: 0,
          })

        console.log(response)

        setResp(response)
    }

    return (
        <Layout>
            <>
                <h1>{site.domain}</h1>
                <h2>Posts</h2>
                <ul>
                    {posts.map((post) => {
                        return (
                            <li key={post.slug}>{post.post_heading}</li>
                        )
                    })}
                </ul>

                {resp?.data?.choices[0].text}


                <button onClick={onClick}>Generate</button>             
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