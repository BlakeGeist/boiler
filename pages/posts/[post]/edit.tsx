import React, { useState, useEffect } from 'react'
import Layout from 'components/Layout'
import { firebaseDb } from 'utils/firebase';
import { doc, setDoc, getDoc } from "firebase/firestore"; 

import dynamic from 'next/dynamic'

import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import Link from 'next/link'

const Editor = dynamic(() => import('react-draft-wysiwyg').then(({ Editor }) => Editor), {
    ssr: false
});

const EditPosts = ({ post_data }) => {

    const initalEditorState = convertFromRaw(JSON.parse(post_data.post_content))

    const [editorState, setEditorState] = useState(EditorState.createWithContent(initalEditorState))

    const onEditorStateChange = (editorState) => {
      setEditorState(editorState)
    }

    const Input = ({ name, initalVal }) => {
        const [value, setValue] = useState(initalVal || '')

        const rawInputID = name.toLowerCase()
        const check = chr  => `&\/#, +()$~%.'":*?<>{}`.includes(chr);
        const inputID = [...rawInputID].reduce((s, c) => check(c) ? s+'_' : s + c, '')

        const onChange = (e) => {
            setValue( e.currentTarget.value)
        }

        return (
            <div>
                <label htmlFor={inputID}>{name}</label> <br />
                <input onChange={(e) => onChange(e)} type="text" id={inputID} name={inputID} value={value} />
                <div>Count: {value.length}</div>
            </div>
        )
    }

    const TextArea = ({ name, initalVal }) => {
        const [value, setValue] = useState(initalVal || '')

        const rawInputID = name.toLowerCase()
        const check = chr  => `&\/#, +()$~%.'":*?<>{}`.includes(chr);
        const inputID = [...rawInputID].reduce((s, c) => check(c) ? s+'_' : s + c, '')

        const onChange = (e) => {
            setValue( e.currentTarget.value)
        }

        return (
            <div>
                <label htmlFor={inputID}>{name}</label> <br />
                <textarea onChange={(e) => onChange(e)} id={inputID} name={inputID} value={value} />
                <div>Count: {value.length}</div>
            </div>
        )
    }    

    const onSubmit = (e) => {
        e.preventDefault()
        const contentState = editorState.getCurrentContent();

        const slug = e.target.slug.value
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

        setDoc(doc(firebaseDb, "posts", slug), post);

        console.log(post)
    }

    return (
        <Layout heading="Edit post">
            <>
                <div>
                    <Link href={`/posts/${post_data.slug}`}>
                        <a>View Post</a>
                    </Link>
                </div>
                <form onSubmit={onSubmit}>
                    <Input name="Slug" initalVal={post_data.slug} />
                    <Input name="Meta Title" initalVal={post_data.meta_title} />
                    <TextArea name="Meta Description" initalVal={post_data.meta_description} />
                    <Input name="post Heading" initalVal={post_data.post_heading} />
                    <TextArea name="post Description" initalVal={post_data.post_description} />
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

export const getServerSideProps = async (ctx) => {
    const docRef = doc(firebaseDb, "posts", ctx.query.post);
    const post = await getDoc(docRef);

    const post_data = post.data()

    return {
        props: { post_data }, // will be passed to the page component as props
      }
}

export default EditPosts