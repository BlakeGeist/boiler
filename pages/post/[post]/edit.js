import React, { useState } from 'react'
import Layout from 'components/Layout'
import { firebaseDb } from 'utils/firebase'
import { doc, getDoc, setDoc, collection, getDocs } from "firebase/firestore"
import Chip from 'components/Chip'
import dynamic from 'next/dynamic'

import { EditorState, convertToRaw, convertFromRaw } from 'draft-js'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

import Link from 'next/link'

import Faqs from 'components/pages/post/forms/Faqs'
import Input from 'components/pages/post/forms/Input'
import TextArea from 'components/pages/post/forms/TextArea'

const Editor = dynamic(() => import('react-draft-wysiwyg').then(({ Editor }) => Editor), {
    ssr: false
})

const EditPosts = ({ post_data, categories, faqs, host }) => {

    console.log(faqs)

    const initalEditorState = convertFromRaw(JSON.parse(post_data.article))

    const [postFaqs, setPostFaqs] = useState(faqs || [])

    const [editorState, setEditorState] = useState(EditorState.createWithContent(initalEditorState))

    const onEditorStateChange = (editorState) => {
      setEditorState(editorState)
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const contentState = editorState.getCurrentContent()

        const slug = e.target.slug.value
        const meta_title = e.target.meta_title.value
        const meta_description = e.target.meta_description.value
        const post_description = e.target.post_description.value
        const post_heading = e.target.post_heading.value
        const article = JSON.stringify(convertToRaw(contentState))
        const post_categories = e.target.multiple_chip.value
        const summary = e.target.summary.value

        const post = {
            slug,
            meta_title,
            meta_description,
            post_description,
            post_heading,
            article,
            post_categories,
            faqs,
            summary
        }

        console.log(post)

        setDoc(doc(firebaseDb, "sites", host, "posts", slug), post)
    }

    const uploadCallback = () => {
        alert('here')
    }

    const addFAQ = (e) => {
        e.preventDefault()
        console.log(postFaqs)
        setPostFaqs([...postFaqs, [{}]])
    }

    return (
        <Layout>
            <>
                <div>
                    <Link href={`/post/${post_data.slug}`}>
                        <a>View Post</a>
                    </Link>
                </div>

                <form onSubmit={onSubmit}>
                    <Chip initalNames={post_data.post_categories?.split(',')} names={categories?.map((category) => {
                        return (`${category.category_name} ${category.category_emoji}`)
                    })}/>

                    <Input name="Slug" initalVal={post_data.slug} />
                    <Input name="Meta Title" initalVal={post_data.meta_title} />
                    <TextArea name="Meta Description" initalVal={post_data.meta_description} />
                    <Input name="post Heading" initalVal={post_data.post_heading} />
                    <TextArea name="post Description" initalVal={post_data.post_description} />
                    <TextArea name="Summary" initalVal={post_data.summary} />
                    <Editor
                        editorState={editorState}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onEditorStateChange={onEditorStateChange}
                        toolbar={{
                            image:{
                                uploadEnabled: true,
                                uploadCallback: uploadCallback,
                                previewImage: true,
                                inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
                                alt: { present: true, mandatory: true },
                                defaultSize: {
                                    height: 'auto',
                                    width: '100%',
                                },
                             },                            
                            inline: { inDropdown: true },
                            list: { inDropdown: true },
                            bold: { inDropdown: true },
                            textAlign: { inDropdown: true },
                            link: { inDropdown: true },
                            history: { inDropdown: true }
                          }}                        
                    />

                    <input type="submit" value="post" />
                </form>

                <hr />

                <h2>Faqs</h2>
                <div>
                    {postFaqs?.map((faq, i) => <Faqs postSlug={post_data.slug} key={i} faq={faq} host={host} />)}
                    <button onClick={(e) => addFAQ(e)}>Add FAQ</button>
                </div>
            </>
        </Layout>
    )
}

export const getServerSideProps = async ({ req, query }) => {
    const host = req.headers.host
    const docRef = doc(firebaseDb, "sites", host, "posts", query.post)
    const post = await getDoc(docRef)

    const post_data = post.data()

    //Get the faqs
    const docsSnap = await getDocs(collection(firebaseDb,`sites/${host}/posts/${query.post}/faqs`))
    const faqs = docsSnap.docs.map(doc => doc.data())
    
    //Get recent posts
    const recentPostsSnap = await getDocs(collection(firebaseDb,`sites/${host}/posts`))
    const recent_posts = recentPostsSnap.docs.map(doc => doc.data())

    return {
        props: { post_data, faqs, recent_posts, host }, // will be passed to the page component as props
      }
}

export default EditPosts