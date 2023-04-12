import React from 'react'
import NewPostMain from 'components/pages/dashboard/posts/new/Main'
import Layout from 'components/Layout'
import Breadcrumbs from 'components/BreadCrumbs'

const NewPost = ({ site, host, lang }) => (
    <Layout site={site}>
        <Layout.Main>
            <Breadcrumbs pathArray={[{text: 'Dashboard', href: "/dashboard"}, {text: 'Posts', href: "/dashboard/posts"}, {text: 'New Post'}]} />
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