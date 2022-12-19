import React, { useState, useEffect } from 'react'
import Layout from 'components/Layout'
import { firebaseDb } from 'utils/firebase';
import { doc, setDoc } from "firebase/firestore"; 
import { useRouter } from "next/router";
import slugify from 'slugify';

import dynamic from 'next/dynamic'

import { EditorState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const Editor = dynamic(() => import('react-draft-wysiwyg').then(({ Editor }) => Editor), {
    ssr: false
});

const NewPosts = () => {
    const router = useRouter()

    const [editorState, setEditorState] = useState(EditorState.createEmpty())

    const onEditorStateChange = (editorState) => {
      setEditorState(editorState)
    }

    const Input = ({ name }) => {
        const [value, setValue] = useState('')

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

    const TextArea = ({ name }) => {
        const [value, setValue] = useState('')

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

        setDoc(doc(firebaseDb, "posts", slug), post).then(() => {
            router.push(`/posts/${slug}`)
        })

    }

    return (
        <Layout heading="New post">
            <>
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

export default NewPosts