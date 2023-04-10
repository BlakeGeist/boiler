import React from 'react'
import { firebaseDb, getDocsFromQuery } from 'utils/firebase'
import { collection, limit, query, orderBy } from "firebase/firestore"
import KeywordsPageTemplate from 'components/pages/dashboard/Keywords'
import Layout from 'components/Layout'

const Keywords = ({ site, host, keywords }) => (
    <Layout site={site}>
        <Layout.Main>
            <KeywordsPageTemplate host={host} keywords={keywords} />
        </Layout.Main>
    </Layout>
)

export const getServerSideProps = async ({ req, locale }) => {
    const host = req.headers.host

    const keywordsPath = `sites/${host}/keywords`
    const keywordsQuery = query(collection(firebaseDb, keywordsPath), orderBy('createdAt', "desc"), limit(10))
    const keywords = await getDocsFromQuery(keywordsQuery)

    return { props: { keywords, host, locale } }
}

export default Keywords