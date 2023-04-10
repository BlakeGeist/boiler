import React from 'react'
import { getDocFromPathAndSlug } from 'utils/firebase'
import KeywordPageTemplate from 'components/pages/dashboard/Keywords/Keyword'

const Keyword = ({ keyword, site, locale }) => <KeywordPageTemplate keyword={keyword} site={site} locale={locale} />

export const getServerSideProps = async ({ req, locale, query: reqQuery }) => {
    const host = req.headers.host
    const{ keyword: slug } = reqQuery

    const keyword = await getDocFromPathAndSlug(`sites/${host}/keywords`, slug)

    return { props: { keyword, host, locale } }
}


export default Keyword