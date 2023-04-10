import React from 'react'
import AmazonMain from 'components/pages/test/AmazonMain'
import NewLayout from 'components/Layout/NewLayout'

const Amazon = ({ site }) => {
    return (
        <NewLayout site={site}>
            <NewLayout.Main>
                <AmazonMain />
            </NewLayout.Main>
        </NewLayout>
    )
}

export default Amazon