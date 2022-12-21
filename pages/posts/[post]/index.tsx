import React, { useRef } from 'react'
import { firebaseDb } from 'utils/firebase'
import { doc, getDoc, collection, getDocs } from "firebase/firestore"
import Layout from 'components/Layout'
import Head from 'next/head'
import { stateToHTML } from "draft-js-export-html"

import {convertFromRaw} from 'draft-js'
import Accordion from 'components/Accordion'
import RecentPosts from 'components/RecentPosts'
import TableOfContents from 'components/TableOfContents'

import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'

const Category = ({ post_data, faqs, recent_posts }) => {
    const myRef = useRef(null)
    const executeScroll = () => myRef.current.scrollIntoView()

    const html = stateToHTML(convertFromRaw(JSON.parse(post_data?.post_content)))

    return (
        <>
            <Head>
                <title>{post_data.meta_title}</title>
                <meta name="description" content={post_data.meta_description} />
            </Head>
            <Layout heading={post_data.post_heading}>
                <>

                    <div style={{border: '1px solid #f1f1f1'}}>
                        <h2>Table of contents</h2>
                        <TableOfContents executeScroll={executeScroll}/>
                    </div>

                    <Alert id="summary" style={{marginBottom: '15px'}} severity="info">
                        <AlertTitle>Summary</AlertTitle>
                        {post_data.summary}
                    </Alert>

                    <div ref={myRef} dangerouslySetInnerHTML={{__html: html}}></div>

                    <hr />

                    <p>Categories: {post_data.post_categories?.split(',').map((category, i) => {
                        if(post_data.post_categories.split(',').length != i+1) {
                            return `${category}, `
                        }
                        return `${category}`
                    })}</p>

                    <hr />

                    {faqs &&
                        <>
                            <h2 id="faqs">FAQS</h2>
                            <Accordion faqs={faqs} /> 
                        </>
                    }
                   
                   <hr />

                   <RecentPosts recentPosts={recent_posts} />
                </>
            </Layout>
        </>
    )
}

export const getServerSideProps = async ({ req, query }) => {
    const host = req.headers.host
    const docRef = doc(firebaseDb, "sites", host, "posts", query.post)
    const post = await getDoc(docRef)

    const post_data = post.data()

    //Get the faqs
    const docsSnap = await getDocs(collection(firebaseDb,`sites/${host}/faqs`))
    const faqs = docsSnap.docs.map(doc => doc.data())
    
    //Get recent posts
    const recentPostsSnap = await getDocs(collection(firebaseDb,`sites/${host}/posts`))
    const recent_posts = recentPostsSnap.docs.map(doc => doc.data())

    return {
        props: { post_data, faqs, recent_posts }, // will be passed to the page component as props
      }
}

export default Category