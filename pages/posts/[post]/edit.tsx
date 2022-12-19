import React, { useState } from 'react'
import Layout from 'components/Layout'
import { firebaseDb } from 'utils/firebase';
import { doc, getDoc, query, setDoc, collection, limit, getDocs } from "firebase/firestore";
import Chip from 'components/Chip'
import dynamic from 'next/dynamic'

import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import Link from 'next/link'

import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import createImagePlugin from '@draft-js-plugins/image';
import Faqs from 'components/pages/post/forms/Faqs';
import Input from 'components/pages/post/forms/Input';
import TextArea from 'components/pages/post/forms/TextArea';

const Editor = dynamic(() => import('react-draft-wysiwyg').then(({ Editor }) => Editor), {
    ssr: false
});

const EditPosts = ({ post_data, categories }) => {

    const initalEditorState = convertFromRaw(JSON.parse(post_data.post_content))

    const [postFaqs, setPostFaqs] = useState([])

    const [editorState, setEditorState] = useState(EditorState.createWithContent(initalEditorState))

    const onEditorStateChange = (editorState) => {
      setEditorState(editorState)
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
        const post_categories = e.target.multiple_chip.value

        const faqs = e.target.questions.value
        
        const post = {
            slug,
            meta_title,
            meta_description,
            post_description,
            post_heading,
            post_content,
            post_categories,
            faqs
        }

        console.log(post)

        setDoc(doc(firebaseDb, "posts", slug), post);
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
        <Layout heading="Edit post">
            <>
                <div>
                    <Link href={`/posts/${post_data.slug}`}>
                        <a>View Post</a>
                    </Link>
                </div>

                <form onSubmit={onSubmit}>
                    <Chip initalNames={post_data.post_categories?.split(',')} names={categories.map((category) => {
                        return (`${category.category_name} ${category.category_emoji}`)
                    })}/>

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
                    {postFaqs?.map((faq, i) => <Faqs faq={faq}/>)}
                    <button onClick={(e) => addFAQ(e)}>Add FAQ</button>
                </div>
            </>
        </Layout>
    )
}

export const getServerSideProps = async (ctx) => {
    //Get the post
    const docRef = doc(firebaseDb, "posts", ctx.query.post)
    const post = await getDoc(docRef);
    const post_data = post.data()

    //Get the categories
    const orderedDocs = query(collection(firebaseDb, "categories"))
    const querySnapshot = await getDocs(orderedDocs);
    
    const categories = querySnapshot.docs.map(doc => doc.data())

    return {
        props: { post_data, categories }
    }
}

export default EditPosts