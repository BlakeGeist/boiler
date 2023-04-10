import React from 'react'
import { firebaseDb, getDocFromPathAndSlug, getDocsFromQuery } from 'utils/firebase'
import { collection, query, limit } from "firebase/firestore"
import Head from 'next/head'
import PostMain from 'components/pages/posts/post/Main'
import NewLayout from 'components/Layout/NewLayout'

const Post = ({ post, recent_posts, site }) => {
    return (
        <>
            <Head>
                <title>{post.metaTitle}</title>
                <meta name="description" content={post.metaDescription} />
            </Head>
            <NewLayout site={site}>
                <NewLayout.Main>
                    <PostMain 
                        site={site}
                        post={post}
                        recent_posts={recent_posts}
                        categories={post.categories}
                    />
                </NewLayout.Main>
            </NewLayout>
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

    return {
        props: { post, recent_posts, lang }, // will be passed to the page component as props
    }
}

export default Post