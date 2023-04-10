import React from 'react'
import SearchMain from 'components/pages/search/SearchMain'
import Layout from 'components/Layout'

const Index = ({ site }) => (
    <Layout site={site}>
        <Layout.Main>
            <SearchMain />
        </Layout.Main>
    </Layout>
)

export default Index