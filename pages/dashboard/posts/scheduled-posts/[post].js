import React from 'react'
import { getDocFromPathAndSlug } from 'utils/firebase'
import Layout from 'components/Layout'

const ScheduledPostsPost = ({ post, site }) => (
    <Layout site={site}>
        <Layout.Main>
            <div>
                {post.createdAt}
            </div>
        </Layout.Main>
    </Layout>
)

export const getServerSideProps = async ({ req, query: reqQuery }) => {
    const host = req.headers.host
    const{ post: slug } = reqQuery

    const post = await getDocFromPathAndSlug(`sites/${host}/scheduledPosts`, slug)

    return { props: { post, host } }
}


export default ScheduledPostsPost