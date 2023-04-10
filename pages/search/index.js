import React from 'react'
import SearchMain from 'components/pages/search/SearchMain'
import NewLayout from 'components/Layout/NewLayout'

const Index = ({ site }) => (
    <NewLayout site={site}>
        <NewLayout.Main>
            <SearchMain />
        </NewLayout.Main>
    </NewLayout>
)

export default Index