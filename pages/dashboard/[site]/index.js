import React, { useState } from 'react'

import { doc, getDoc, collection, setDoc, getDocs } from 'firebase/firestore'
import { firebaseDb } from 'utils/firebase'
import Layout from 'components/Layout'
import slugify from 'slugify'
import { useRouter } from "next/router"
import dynamic from 'next/dynamic'
import Input from 'components/pages/post/forms/Input'
import TextArea from 'components/pages/post/forms/TextArea'

import { EditorState, convertToRaw } from 'draft-js'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

const Editor = dynamic(() => import('react-draft-wysiwyg').then(({ Editor }) => Editor), {
    ssr: false
})

const Site = ({ site, posts, host }) => {

    const router = useRouter()

    const [editorState, setEditorState] = useState(EditorState.createEmpty())

    const onEditorStateChange = (editorState) => {
      setEditorState(editorState)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const contentState = editorState.getCurrentContent()

        const slug = slugify(e.target.post_heading.value.toLowerCase())
        const meta_title = e.target.meta_title.value
        const meta_description = e.target.meta_description.value
        const post_description = e.target.post_description.value
        const post_heading = e.target.post_heading.value
        const post_content = JSON.stringify(convertToRaw(contentState))
        
        const post = {
            slug,
            meta_title,
            meta_description,
            post_description,
            post_heading,
            post_content
        }

        setDoc(doc(firebaseDb, "sites", host, "posts", slug), post).then(() => {
            router.push(`/posts/${slug}`)
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
                            <li key={post.slug}>{post.post_heading}</li>
                        )
                    })}
                </ul>
                <form onSubmit={onSubmit}>
                    <Input name="Meta Title" />
                    <TextArea name="Meta Description" />
                    <Input name="post Heading" />
                    <TextArea name="post Description" />
                    <Editor
                        editorState={editorState}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onEditorStateChange={onEditorStateChange}
                        />
                    <input type="submit" />
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
  
    return {
        props: { site, posts: posts || null, host }
    }
}

export default Site