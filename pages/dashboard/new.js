import React from 'react'
import NewPostTemplate from 'components/pages/dashboard/NewPost'
import Layout from 'components/Layout'

const NewPost = ({ site, host }) => (
    <Layout site={site}>
        <NewPostTemplate host={host} site={site} />
    </Layout>
)

export const getServerSideProps = async ({ req }) => {
    const { host } = req.headers
    
    return {
        props: { host }
    }
}

export default NewPost