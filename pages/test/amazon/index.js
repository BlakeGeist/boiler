import React from 'react'
import Layout from 'components/Layout'
import AmazonTemplate from 'components/pages/test/amazon'

const Amazon = ({ site }) => {
    return (
        <Layout site={site}>
            <AmazonTemplate />
        </Layout>
    )
}

export default Amazon