import React, { useRef } from 'react'
import { firebaseDb } from 'utils/firebase'
import { doc, getDoc, collection, getDocs, query, limit } from "firebase/firestore"
import Layout from 'components/Layout'
import Head from 'next/head'
import { stateToHTML } from "draft-js-export-html"
import { convertFromRaw } from 'draft-js'
import RecentPosts from 'components/RecentPosts'

import styled from 'styled-components'

import Aside from 'components/pages/post/sections/Aside'
import Listicle from 'components/pages/post/sections/Listicle'
import Faqs from 'components/pages/post/sections/Faqs'
import Categories from 'components/pages/post/sections/Categories'
import Summary from 'components/pages/post/sections/Summary'
import Article from 'components/pages/post/sections/Article'

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
                            <Summary summaryRef={summaryRef} summary={post.summary} />
                            <Article html={html} articleRef={articleRef} />
                            <Categories categories={post.categories} />
                            <Faqs faqs={faqs} faqsRef={faqsRef} />
                            <Listicle post={post} listItems={listItems} listicleRef={listicleRef} />                            
                            <RecentPosts recentPostsRef={recentPostsRef} recentPosts={recent_posts} />
                        </Body>
                        <Aside
                            topRef={topRef}
                            summaryRef={summaryRef}
                            articleRef={articleRef}
                            faqsRef={faqsRef}
                            listicleRef={listicleRef}
                            recentPostsRef={recentPostsRef}
                        />
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