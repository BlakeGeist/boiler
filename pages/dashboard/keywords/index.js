import React from 'react'
import { firebaseDb, getDocsFromQuery } from 'utils/firebase'
import { collection, limit, query, orderBy } from "firebase/firestore"
import KeywordsPageTemplate from 'components/pages/dashboard/Keywords'
import Layout from 'components/Layout'
import nookies from 'nookies'
import { firebaseAdmin } from 'utils/firebaseAdmin'

const Keywords = ({ user, site, host, keywords }) => (
    <Layout site={site} user={user}>
        <Layout.Main>
            <KeywordsPageTemplate host={host} keywords={keywords} />
        </Layout.Main>
    </Layout>
)

export const getServerSideProps = async (ctx) => {
    try {
        const cookies = nookies.get(ctx)
        const host = ctx.req.headers.host
        const lang = ctx.locale
        
        const token  = await firebaseAdmin.auth().verifyIdToken(cookies.token)

        const keywordsPath = `sites/${host}/keywords`
        const keywordsQuery = query(collection(firebaseDb, keywordsPath), orderBy('createdAt', "desc"), limit(10))
        const keywords = await getDocsFromQuery(keywordsQuery)
    
        return {
            props: { host, keywords, lang, user: token }
        }
    } catch (err) {
        ctx.res.writeHead(302, { Location: '/dashboard/login' })
        ctx.res.end()

        return { props: {}}
    }
}


export default Keywords