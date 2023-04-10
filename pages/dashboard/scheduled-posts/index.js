import React from 'react'
import ScheduledPostsTemplate from 'components/pages/dashboard/ScheduledPostsTemplate'
import Layout from 'components/Layout'

const SchdeduledPosts = ({ site, host }) => (
    <Layout site={site}>
        <ScheduledPostsTemplate host={host} />
    </Layout>
)

export const getServerSideProps = async ({req}) => {
    const host = req.headers.host

    return {
        props: { host }
    }
}

export default SchdeduledPosts