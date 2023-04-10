import React from 'react'
import NewPostMain from 'components/pages/dashboard/new/Main'
import NewLayout from 'components/Layout/NewLayout'

const NewPost = ({ site, host }) => (
    <NewLayout site={site}>
        <NewLayout.Main>
            <NewPostMain host={host} site={site} />
        </NewLayout.Main>
    </NewLayout>
)

export const getServerSideProps = async ({ req }) => {
    const { host } = req.headers
    
    return {
        props: { host }
    }
}

export default NewPost