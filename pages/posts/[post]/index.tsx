import React, { useRef } from 'react'
import { firebaseDb } from 'utils/firebase'
import { doc, getDoc, collection, getDocs, query, limit } from "firebase/firestore"
import Layout from 'components/Layout'
import Head from 'next/head'
import { stateToHTML } from "draft-js-export-html"
import { convertFromRaw } from 'draft-js'
import Accordion from 'components/Accordion'
import RecentPosts from 'components/RecentPosts'
import TableOfContents from 'components/TableOfContents'

import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'

import styled from 'styled-components'

const Article = styled.div`

    img {
            float: left;
            margin: 0 15px 5px 0;
        }

`

const Category = ({ post, faqs, recent_posts, listItems }) => {


    const article = JSON.parse(post?.article)


    const blocks = article.blocks

    const test =   {
        key: '28ewer6nu',
        text: ` `,        
        type: 'atomic',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [{ offset: 0, length: 1, key: 0 }],
        data: {}
      }

    const entity = {
        '0': {
            type: 'IMAGE',
            mutability: 'MUTABLE',
            data: {
              src: post.mediumImageSrc,
              height: 'auto',
              width: '225',
              alt: 'a'
            }
          }
    }

      const start = Math.ceil(5)  

    blocks.splice(start, 0, test)

    article.blocks = blocks
    article.entityMap = entity

    const myRef = useRef(null)
    const executeScroll = () => myRef.current.scrollIntoView()
    const html = stateToHTML(convertFromRaw(article))

    return (
        <>
            <Head>
                <title>{post.metaTitle}</title>
                <meta name="description" content={post.metaDescription} />
            </Head>
            <Layout heading={post.heading}>
                <>
                    <img style={{marginBottom: '25px'}} src={post.headerImage} width="100%" />

                    <div style={{border: '1px solid #f1f1f1', float: 'right', marginLeft: '15px'}}>
                        <h2 style={{margin: '0 10px'}}>Table of contents</h2>
                        <TableOfContents executeScroll={executeScroll}/>
                    </div>

                    <Alert id="summary" style={{marginBottom: '15px'}} severity="info">
                        <AlertTitle>Summary</AlertTitle>
                        {post.summary}
                    </Alert>

                    <Article ref={myRef} dangerouslySetInnerHTML={{__html: html}} />

                    <hr />

                    <p>Categories: {post?.categories?.map((category, i) => {
                        if(i+1 !== post.categories.length) return `${category}, `
                        return category
                    })}</p>

                    <hr />

                    {faqs &&
                        <>
                            <h2 id="faqs">FAQS</h2>
                            <Accordion faqs={faqs} /> 
                        </>
                    }
                   
                    <hr />

                    <h2>{post.listicleHeading}</h2>

                    <ul style={{padding: "0", listStyle: "none"}}>
                        {listItems.map(item => {
                            return (
                                <li key={item.listItem}>{item.listItem}</li>
                            )
                        })}
                    </ul>

                    <hr />

                    <RecentPosts recentPosts={recent_posts} />
                </>
            </Layout>
        </>
    )
}

export const getServerSideProps = async (ctx) => {
    const ctxQuery = ctx.query
    const req = ctx.req
    const host = req.headers.host

    const docRef = doc(firebaseDb, "sites", host, "posts", ctxQuery.post)
    const postDoc = await getDoc(docRef)
    const post = postDoc.data()

    //Get the faqs
    const docsSnap = await getDocs(collection(firebaseDb,`sites/${host}/posts/${ctxQuery.post}/faqs`))
    const faqs = docsSnap.docs.map(doc => doc.data())
    
    //Get recent posts
    const recentPostsQuery = query(collection(firebaseDb, `sites/${host}/posts`), limit(6))
    const recentPostsSnap = await getDocs(recentPostsQuery)
    const recent_posts = recentPostsSnap.docs.map(doc => doc.data())

    //Get recent posts
    const q = query(collection(firebaseDb, `sites/${host}/posts/${ctxQuery.post}/listItems`))
    const listicleSnap = await getDocs(q)
    const listItems = listicleSnap.docs.map(doc => doc.data())

    return {
        props: { post, faqs, recent_posts, listItems }, // will be passed to the page component as props
      }
}

export default Category