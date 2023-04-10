import React from 'react'
import { firebaseDb, getDocsFromQuery } from 'utils/firebase'
import { collection, limit, query, orderBy } from "firebase/firestore"
import KeywordsPageTemplate from 'components/pages/dashboard/Keywords'
import NewLayout from 'components/Layout/NewLayout'

const Keywords = ({ site, host, keywords }) => (
    <NewLayout site={site}>
        <NewLayout.Main>
            <KeywordsPageTemplate host={host} keywords={keywords} />
        </NewLayout.Main>
    </NewLayout>
)

export const getServerSideProps = async ({ req, locale }) => {
    const host = req.headers.host

    const keywordsPath = `sites/${host}/keywords`
    const keywordsQuery = query(collection(firebaseDb, keywordsPath), orderBy('createdAt', "desc"), limit(10))
    const keywords = await getDocsFromQuery(keywordsQuery)

    return { props: { keywords, host, locale } }
}

export default Keywords