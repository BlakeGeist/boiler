import React from 'react'
import { firebaseDb } from 'utils/firebase'
import { doc, getDoc, collection, getDocs, query, limit } from "firebase/firestore"
import Head from 'next/head'
import { stateToHTML } from "draft-js-export-html"
import { convertFromRaw } from 'draft-js'
import PostTemplate from 'components/pages/post/Post'
import Layout from 'components/Layout'
import { useRouter } from 'next/router'

import { languages } from 'utils/languages'

const Post = ({ post, recent_posts, host, site }) => {
    const router = useRouter()

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

    const handleChange = (e) => {
        const lang = e.target.value

        router.push(`/${lang}/post/${post.slug}`)
    }

    return (
        <>
            <Head>
                <title>{post.metaTitle}</title>
                <meta name="description" content={post.metaDescription} />
            </Head>
            <Layout site={site}>
                <>
                <PostTemplate 
                    site={site}
                    post={post}
                    html={html}
                    recent_posts={recent_posts}
                    host={host}
                    categories={post.categories}
                />
                <select onChange={e => handleChange(e)}>
                    {languages.map(lanugage => {
                        return (
                            <option key={lanugage.code} value={lanugage.code}>{lanugage.name}</option>
                        )
                    })}
                </select>
                </>
            </Layout>
        </>
    )
}

export const getServerSideProps = async (ctx) => {
    const ctxQuery = ctx.query
    const { lang } = ctx.query
    const req = ctx.req
    const host = req.headers.host

    const docRef = doc(firebaseDb, `/sites/${host}/langs/${lang}/posts`, ctxQuery.post)
    const postDoc = await getDoc(docRef)
    const post = postDoc.data()

    //Get recent posts
    const recentPostsQuery = query(collection(firebaseDb, `sites/${host}/langs/${lang}/posts`), limit(6))
    const recentPostsSnap = await getDocs(recentPostsQuery)
    const recent_posts = recentPostsSnap.docs.map(doc => doc.data())

    const siteRef = doc(firebaseDb, "sites", host)
    const siteDoc = await getDoc(siteRef)
    const site = siteDoc.data()

    return {
        props: { post, recent_posts, host, site, lang }, // will be passed to the page component as props
      }
}

export default Post