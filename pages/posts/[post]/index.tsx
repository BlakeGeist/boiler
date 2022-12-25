import React, { useRef } from 'react'
import { firebaseDb } from 'utils/firebase'
import { doc, getDoc, collection, getDocs, query, limit } from "firebase/firestore"
import Layout from 'components/Layout'
import Head from 'next/head'
import { stateToHTML } from "draft-js-export-html"
import { convertFromRaw } from 'draft-js'
import Accordion from 'components/Accordion'
import RecentPosts from 'components/RecentPosts'

import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'

import styled from 'styled-components'
import { useStickyBox } from "react-sticky-box"

const Article = styled.div`

    img {
            float: left;
            margin: 0 15px 5px 0;
        }
`

const Category = styled.div`
    background: rgba(0,0,0,.05);
    color: rgba(0,0,0,.6);
    border-radius: 3px;
    padding: 5px 10px;
    margin: 0 5px;

    &:first-of-type {
        margin: 0;
    }
`

const Categories = styled.div`
    display: flex;
    flex-wrap: wrap;
    font-size: 14px;
`

const Body = styled.div`
    flex: 0 1 770px;

    h2 {
        border-bottom: 1px solid rgba(0,0,0,.15);
        margin-bottom: 25px;
        font-weight: 700;
        font-size: 1.4rem;
        margin-bottom: 27px;
    
        span {
            border-bottom: 1px solid rgba(0,0,0,.44);
            display: inline-block;
            padding: 20px 0;
        }
    }    
`

const PostContainer = styled.div`
    display: flex;
    justify-content: center;
`

const TableOfContentsContainer = styled.div`
    border: 1px solid #ccc;
    margin-bottom: 15px;
    border-radius: 8px;

    position: sticky;
    top: 0;    

    h2 {
        font-size: 16px;
        margin: 10px;
    }

    ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    li {
        padding: 0;
        margin: 0;
        &:last-of-type {

            button {
                border-bottom: none;
            }
        }
    }

    button {
        background: #ccc;
        border: none;
        width: 100%;
        margin: 0;
        padding: 10px;
        border-bottom: 1px solid #eee;
        text-align: left;
        cursor: pointer;
    }
`

const Aside = styled.div`
    margin: 0 0 0 15px;
    flex: 0 1 200px;
`

const Post = ({ post, faqs, recent_posts, listItems }) => {

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

    const topRef = useRef(null)
    const summaryRef = useRef(null)
    const faqsRef = useRef(null)
    const listicleRef = useRef(null)
    const articleRef = useRef(null)
    const recentPostsRef = useRef(null)
    
    const html = stateToHTML(convertFromRaw(article))

    const stickyRef = useStickyBox({offsetTop: 20, offsetBottom: 20})

    const scrollTo = (ref) => {
        if (ref && ref.current /* + other conditions */) {
          ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }

    return (
        <>
            <Head>
                <title>{post.metaTitle}</title>
                <meta name="description" content={post.metaDescription} />
            </Head>
            <Layout>
                <>
                    <h1 ref={topRef}>{post.heading}</h1>

                    <img style={{marginBottom: '25px'}} src={post.headerImage} width="100%" />

                    <PostContainer>
                        <Body>
                            <Alert ref={summaryRef} id="summary" style={{marginBottom: '15px'}} severity="info">
                                <AlertTitle style={{fontWeight: 'bold'}}>Summary</AlertTitle>
                                {post.summary}
                            </Alert>

                            <Article ref={articleRef} dangerouslySetInnerHTML={{__html: html}} />

                            <Categories>
                                {post?.categories?.map((category, i) => {
                                    return (
                                        <Category key={`${category}-${i}-key`}>
                                            {category}
                                        </Category>
                                    )
                                })}
                            </Categories>

                            {faqs &&
                                <>
                                    <h2 id="faqs" ref={faqsRef}><span>FAQS</span></h2>
                                    <Accordion faqs={faqs} /> 
                                </>
                            }
                        
                            <h2 ref={listicleRef}><span>{post.listicleHeading}</span></h2>
                            <ul style={{padding: "0", listStyle: "none"}}>
                                {listItems.map(item => {
                                    return (
                                        <li key={item.listItem}>{item.listItem}</li>
                                    )
                                })}
                            </ul>

                            <hr />

                            <h2 ref={recentPostsRef} id="recent-posts"><span>Recent Posts</span></h2>
                            <RecentPosts recentPosts={recent_posts} />

                        </Body>
                        <Aside>
                            <TableOfContentsContainer ref={stickyRef}>
                                <h2>Table of contents</h2>
                                <ul>
                                    <li>
                                        <button onClick={() => {scrollTo(topRef)}}>Top</button>
                                    </li>
                                    <li>
                                        <button onClick={() => {scrollTo(summaryRef)}}>Summary</button>
                                    </li>                                
                                    <li>
                                        <button onClick={() => {scrollTo(articleRef)}}>Article</button>
                                    </li>
                                    <li>
                                        <button onClick={() => {scrollTo(faqsRef)}}>Faqs</button>
                                    </li>
                                    <li>
                                        <button onClick={() => {scrollTo(listicleRef)}}>Listicle</button>
                                    </li>                                
                                    <li>
                                        <button onClick={() => {scrollTo(listicleRef)}}>Recent Posts</button>
                                    </li>                                                                                                                             
                                </ul>
                            </TableOfContentsContainer>  
                        </Aside>
                    </PostContainer>
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

export default Post