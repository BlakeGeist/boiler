import React from 'react'
import ScheduledPostsMain from 'components/pages/dashboard/ScheduledPosts/Main'
import NewLayout from 'components/Layout/NewLayout'

const SchdeduledPosts = ({ site, host }) => (
    <NewLayout site={site}>
        <NewLayout.Main>
            <ScheduledPostsMain host={host} />
        </NewLayout.Main>
    </NewLayout>
)

export const getServerSideProps = async ({req}) => {
    const host = req.headers.host

    return {
        props: { host }
    }
}

export default SchdeduledPosts