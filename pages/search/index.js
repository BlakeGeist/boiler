import React from 'react'
import SearchMain from 'components/pages/search/SearchMain'
import Layout from 'components/Layout'

const Index = ({ site, host, lang }) => (
    <Layout site={site}>
        <Layout.Main>
            <SearchMain lang={lang} host={host} />
        </Layout.Main>
    </Layout>
)

export const getServerSideProps = async ({ req, locale }) => {
    const host = req.headers.host
    const lang = locale

    return { props: { host, lang } }
}
  

export default Index