import React, { useState } from 'react'
import { firebaseDb } from 'utils/firebase'
import { doc, getDoc } from "firebase/firestore";
import Layout from 'components/Layout'
import Head from 'next/head'
import { EditorState, convertToRaw } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import { stateToHTML } from "draft-js-export-html";

import {Editor, convertFromRaw} from 'draft-js';

const Category = ({ post_data }) => {
    const html = stateToHTML(convertFromRaw(JSON.parse(post_data.post_content))).replace('<p><br></p>', '')

    return (
        <>
            <Head>
                <title>{post_data.meta_title}</title>
                <meta name="description" content={post_data.meta_description} />
            </Head>
            <Layout heading={post_data.post_heading}>
                <>
                    <div dangerouslySetInnerHTML={{__html: html}}></div>
                    <hr />
                    <p>Categories: {post_data.post_categories.split(',').map((category, i) => {
                        if(post_data.post_categories.split(',').length != i+1) {
                            return `${category}, `
                        }
                        return `${category}`
                    })}</p>
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