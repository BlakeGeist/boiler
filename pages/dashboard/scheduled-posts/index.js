import React from 'react'
import ScheduledPostsMain from 'components/pages/dashboard/ScheduledPosts/Main'
import Layout from 'components/Layout'

const SchdeduledPosts = ({ site, host }) => (
    <Layout site={site}>
        <Layout.Main>
            <ScheduledPostsMain host={host} />
        </Layout.Main>
    </Layout>
)

export const getServerSideProps = async ({req}) => {
    const host = req.headers.host

    return {
        props: { host }
    }
}

export default SchdeduledPosts