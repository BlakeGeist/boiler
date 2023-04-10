import React from 'react'
import { firebaseDb, getDocFromPathAndSlug, getDocsFromQuery } from 'utils/firebase'
import { collection, query, limit } from "firebase/firestore"
import Head from 'next/head'
import PostTemplate from 'components/pages/post/Post'
import Layout from 'components/Layout'
import { useRouter } from 'next/router'

const Post = ({ post, recent_posts, site }) => {

    console.log('we made it here')

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
    

    const handleChange = (e) => {
        const lang = e.target.value
        const toUrl = post.slugs.filter(s => s.lang.code === lang)[0]

        const redTo = `/${lang}/post/${toUrl.slug}`

        router.push(redTo, redTo, { locale: lang })
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
                        recent_posts={recent_posts}
                        categories={post.categories}
                    />
                    <select onChange={e => handleChange(e)}>
                        {post.slugs.map(slug => {
                            return (
                                <option key={slug.lang.code} value={slug.lang.code}>{slug.lang.name}</option>
                            )
                        })}
                    </select>
                </>
            </Layout>
        </>
    )
}

export const getServerSideProps = async ({ req, query: reqQuery, locale  }) => {
    const{ post: slug } = reqQuery

    const lang = locale
    const host = req.headers.host

    const postPath = `/sites/${host}/langs/${lang}/posts`
    const post = await getDocFromPathAndSlug(postPath, slug) || null

    if (!post) {
        return { 
          notFound: true
        }
      }

    const recentPostsPath = `sites/${host}/langs/${lang}/posts`
    const recentPostsQuery = query(collection(firebaseDb, recentPostsPath), limit(6))
    const recent_posts = await getDocsFromQuery(recentPostsQuery)

    const site = await getDocFromPathAndSlug("sites", host)

    return {
        props: { post, recent_posts, site, lang }, // will be passed to the page component as props
    }
}

export default Post