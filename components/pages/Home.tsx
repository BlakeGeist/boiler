import React from 'react'
import Layout from 'components/Layout'

const Home = ({ site }) => {
    return (
        <Layout>
            <h1>{site.domain}</h1>
        </Layout>
    )
}

export default Home