import React from 'react'
import { getDocFromPathAndSlug } from 'utils/firebase'
import Layout from 'components/Layout'
import DraftPostMain from 'components/pages/dashboard/posts/drafts/draft/Main'

const DraftPostsPost = ({ post, site, host }) => (
    <Layout site={site}>
        <Layout.Main>
            <DraftPostMain post={post} site={site} host={host} />
        </Layout.Main>
    </Layout>
)

export const getServerSideProps = async ({ req, locale, query: reqQuery }) => {
    const host = req.headers.host
    const{ post: slug } = reqQuery

    const postPath = `/sites/${host}/langs/${locale}/posts`
    const post = await getDocFromPathAndSlug(postPath, slug) || null

    return { props: { post, host, locale } }
}


export default DraftPostsPost