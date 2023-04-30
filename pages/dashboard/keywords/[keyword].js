import React from 'react'
import { getDocFromPathAndSlug } from 'utils/firebase'
import KeywordPageTemplate from 'components/pages/dashboard/Keywords/Keyword'
import Layout from 'components/Layout'
import nookies from 'nookies'
import { firebaseAdmin } from 'utils/firebaseAdmin'

const Keyword = ({ user, keyword, site, locale }) => (
    <Layout site={site} user={user}>
        <Layout.Main>
            <KeywordPageTemplate keyword={keyword} locale={locale} />
        </Layout.Main>
    </Layout>
)

export const getServerSideProps = async (ctx) => {
    try {
        const cookies = nookies.get(ctx)
        const host = ctx.req.headers.host
        const locale = ctx.locale
        const slug = ctx.query.keyword
        
        const token  = await firebaseAdmin.auth().verifyIdToken(cookies.token)

        const keyword = await getDocFromPathAndSlug(`sites/${host}/keywords`, slug)

        return {
            props: { host, keyword, locale, user: token }
        }
    } catch (err) {
        console.error(err)
        return { props: {}}
    }
}

export default Keyword