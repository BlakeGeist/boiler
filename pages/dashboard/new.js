import React from 'react'
import NewPostMain from 'components/pages/dashboard/new/Main'
import Layout from 'components/Layout'

const NewPost = ({ site, host }) => (
    <Layout site={site}>
        <Layout.Main>
            <NewPostMain host={host} site={site} />
        </Layout.Main>
    </Layout>
)

export const getServerSideProps = async ({ req }) => {
    const { host } = req.headers
    
    return {
        props: { host }
    }
}

export default NewPost