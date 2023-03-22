import React from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { firebaseDb } from 'utils/firebase'
import NewPostTemplate from 'components/Post/NewPostTemplate'

const NewPost = ({ site, host, lang }) => {
    return (
        <NewPostTemplate site={site} host={host} lang={lang} />
    )
}

export const getServerSideProps = async ({ req, locale }) => {
    const host = req.headers.host
    const lang = locale
    const docRef = doc(firebaseDb, "sites", host)
    const siteDoc = await getDoc(docRef)
    const site = siteDoc.data()

    return {
        props: { site, host, lang }
    }
}

export default NewPost