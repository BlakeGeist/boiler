import React from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { firebaseDb } from 'utils/firebase'
import NewPostTemplate from 'components/Post/NewPostTemplate'

const NewPost = ({ site, host }) => {
    return (
        <NewPostTemplate site={site} host={host} />
    )
}

export const getServerSideProps = async ({ req }) => {
    const { host } = req.headers
    
    const docRef = doc(firebaseDb, "sites", host)
    const siteDoc = await getDoc(docRef)
    const site = siteDoc.data()

    return {
        props: { site, host }
    }
}

export default NewPost