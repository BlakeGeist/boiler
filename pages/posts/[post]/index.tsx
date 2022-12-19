import React, { useState } from 'react'
import { firebaseDb } from 'utils/firebase'
import { doc, getDoc } from "firebase/firestore";
import Layout from 'components/Layout'
import Head from 'next/head'
import { EditorState, convertToRaw } from 'draft-js';
import { convertToHTML } from 'draft-convert';

import {Editor, convertFromRaw} from 'draft-js';


const Category = ({ post_data }) => {
    const html = convertToHTML(convertFromRaw(JSON.parse(post_data.post_content)))

    return (
        <>
            <Head>
                <title>{post_data.meta_title}</title>
                <meta name="description" content={post_data.meta_description} />
            </Head>
            <Layout>
                <>
                    <h1>{post_data.post_heading}</h1>
                    <div dangerouslySetInnerHTML={{__html: html}}></div>
                </>
            </Layout>
        </>
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

export default Category