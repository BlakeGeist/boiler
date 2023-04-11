import React from 'react'
import NewPostMain from 'components/pages/dashboard/new/Main'
import Layout from 'components/Layout'

const NewPost = ({ site, host, lang }) => (
    <Layout site={site}>
        <Layout.Main>
            <NewPostMain host={host} site={site} lang={lang} />
        </Layout.Main>
    </Layout>
)

export const getServerSideProps = async ({ req, locale }) => {
    const { host } = req.headers

    return {
        props: { host, lang: locale }
    }
}

export default NewPost