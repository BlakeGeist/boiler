import React from 'react'
import { firebaseDb } from 'utils/firebase'
import { doc, getDoc, collection, getDocs, query, limit } from "firebase/firestore"
import Head from 'next/head'
import { stateToHTML } from "draft-js-export-html"
import { convertFromRaw } from 'draft-js'
import PostTemplate from 'components/pages/post/Post'

const Post = ({ post, faqs, recent_posts, listItems, host, categories }) => {
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
    
    const html = stateToHTML(convertFromRaw(article))

    return (
        <>
            <Head>
                <title>{post.metaTitle}</title>
                <meta name="description" content={post.metaDescription} />
            </Head>

            <PostTemplate 
                post={post}
                html={html}
                faqs={faqs}
                recent_posts={recent_posts}
                listItems={listItems}
                host={host}
                categories={categories}
                />
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

    //this needs to be updated, it gets all the cats, and we only want this posts cats
    const categoriesSnap = await getDocs(collection(firebaseDb,`sites/${host}/categories`))
    const categories = categoriesSnap.docs.map(doc => doc.data())

    return {
        props: { post, faqs, recent_posts, listItems, host, categories }, // will be passed to the page component as props
      }
}

export default Post