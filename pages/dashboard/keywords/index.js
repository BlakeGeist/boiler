import React from 'react'
import { firebaseDb, getDocFromPathAndSlug, getDocsFromQuery } from 'utils/firebase'
import { collection, limit, query, orderBy } from "firebase/firestore"
import KeywordsPageTemplate from 'components/pages/dashboard/Keywords'

const Keywords = ({ site, host, keywords }) => <KeywordsPageTemplate site={site} host={host} keywords={keywords} />

export const getServerSideProps = async ({ req, locale }) => {
    const host = req.headers.host

    const keywordsPath = `sites/${host}/keywords`
    const keywordsQuery = query(collection(firebaseDb, keywordsPath), orderBy('createdAt', "desc"), limit(10))
    const keywords = await getDocsFromQuery(keywordsQuery)

    const site = await getDocFromPathAndSlug("sites", host)

    return { props: { keywords, host, site, locale } }
}

export default Keywords