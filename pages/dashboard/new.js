import React from 'react'
import NewPostTemplate from 'components/Post/NewPostTemplate'

const NewPost = ({ site, host }) => <NewPostTemplate site={site} host={host} />

export const getServerSideProps = async ({ req }) => {
    const { host } = req.headers
    
    return {
        props: { host }
    }
}

export default NewPost