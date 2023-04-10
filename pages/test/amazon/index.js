import React from 'react'
import AmazonMain from 'components/pages/test/AmazonMain'
import Layout from 'components/Layout'

const Amazon = ({ site }) => {
    return (
        <Layout site={site}>
            <Layout.Main>
                <AmazonMain />
            </Layout.Main>
        </Layout>
    )
}

export default Amazon