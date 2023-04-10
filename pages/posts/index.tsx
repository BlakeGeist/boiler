import React from 'react'
import { firebaseDb, getDocsFromQuery } from 'utils/firebase'
import { collection, limit, query, orderBy } from "firebase/firestore"
import PostsMain from 'components/pages/posts/PostsMain'
import NewLayout from 'components/Layout/NewLayout'

const Posts = ({ posts, host, site, locale }) => {
    return (
        <NewLayout site={site}>
            <NewLayout.Main>
                <PostsMain host={host} posts={posts} locale={locale} />
            </NewLayout.Main>
        </NewLayout>
    )
}

export const getServerSideProps = async ({ req, locale }) => {
    const lang = locale
    const host = req.headers.host

    const postsPath = `sites/${host}/langs/${lang}/posts`
    const postsQuery = query(collection(firebaseDb, postsPath), orderBy('createdAt', "desc"), limit(10))
    const posts = await getDocsFromQuery(postsQuery)

    return { props: { posts: posts || null, host, locale } }
  }
  

export default Posts