import React, { useRef } from 'react'
import { firebaseDb } from 'utils/firebase'
import { doc, getDoc, collection, getDocs } from "firebase/firestore"
import Layout from 'components/Layout'
import Head from 'next/head'
import { stateToHTML } from "draft-js-export-html"

import { convertFromRaw } from 'draft-js'
import Accordion from 'components/Accordion'
import RecentPosts from 'components/RecentPosts'
import TableOfContents from 'components/TableOfContents'

import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'

const Category = ({ post, faqs, recent_posts }) => {

    console.log(post)

    const myRef = useRef(null)
    const executeScroll = () => myRef.current.scrollIntoView()
    const html = stateToHTML(convertFromRaw(JSON.parse(post?.article)))

    return (
        <>
            <Head>
                <title>{post.metaTitle}</title>
                <meta name="description" content={post.metaDescription} />
            </Head>
            <Layout heading={post.heading}>
                <>
                    <img style={{marginBottom: '25px'}} src="https://media.istockphoto.com/id/1327276218/photo/the-picturesque-mountain-landscape-on-the-sunset-background.jpg?b=1&s=170667a&w=0&k=20&c=8tzAabsLYLhMW6iDoeuBZUuaozi-F0lL2KcE49JVVaI=" />

                    <div style={{border: '1px solid #f1f1f1', float: 'right', marginLeft: '15px'}}>
                        <h2 style={{margin: '0 10px'}}>Table of contents</h2>
                        <TableOfContents executeScroll={executeScroll}/>
                    </div>

                    <Alert id="summary" style={{marginBottom: '15px'}} severity="info">
                        <AlertTitle>Summary</AlertTitle>
                        {post.summary}
                    </Alert>

                    <div ref={myRef} dangerouslySetInnerHTML={{__html: html}}></div>

                    <hr />

                    <p>Categories: {post.categories?.split(',').map((category, i) => {
                        if(post.categories.split(',').length != i+1) {
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
    const postDoc = await getDoc(docRef)
    const post = postDoc.data()

    //Get the faqs
    const docsSnap = await getDocs(collection(firebaseDb,`sites/${host}/posts/${query.post}/faqs`))
    const faqs = docsSnap.docs.map(doc => doc.data())
    
    //Get recent posts
    const recentPostsSnap = await getDocs(collection(firebaseDb,`sites/${host}/posts`))
    const recent_posts = recentPostsSnap.docs.map(doc => doc.data())

    return {
        props: { post, faqs, recent_posts }, // will be passed to the page component as props
      }
}

export default Category