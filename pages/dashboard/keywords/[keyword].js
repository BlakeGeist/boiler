import React from 'react'
import { getDocFromPathAndSlug } from 'utils/firebase'
import KeywordPageTemplate from 'components/pages/dashboard/Keywords/Keyword'
import NewLayout from 'components/Layout/NewLayout'

const Keyword = ({ keyword, site, locale }) => (
    <NewLayout site={site}>
        <NewLayout.Main>
            <KeywordPageTemplate keyword={keyword} locale={locale} />
        </NewLayout.Main>
    </NewLayout>
)

export const getServerSideProps = async ({ req, locale, query: reqQuery }) => {
    const host = req.headers.host
    const{ keyword: slug } = reqQuery

    const keyword = await getDocFromPathAndSlug(`sites/${host}/keywords`, slug)

    return { props: { keyword, host, locale } }
}


export default Keyword