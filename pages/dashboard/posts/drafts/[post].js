import React from 'react'
import { getDocFromPathAndSlug } from 'utils/firebase'
import Layout from 'components/Layout'
import DraftPostMain from 'components/pages/dashboard/posts/drafts/draft/Main'
import Breadcrumbs from 'components/BreadCrumbs'

const DraftPostsPost = ({ post, site, host, lang }) => (
    <Layout site={site}>
        <Layout.Main>
            <Breadcrumbs pathArray={[{text: 'Dashboard', href: "/dashboard"}, {text: 'Posts', href: "/dashboard/posts"}, {text: 'Drafts', href: '/dashboard/posts/drafts'}, { text: 'Draft'}]} />
            <DraftPostMain post={post} site={site} host={host} lang={lang} />
        </Layout.Main>
    </Layout>
)

export const getServerSideProps = async ({ req, locale, query: reqQuery }) => {
    const host = req.headers.host
    const{ post: slug } = reqQuery

    const postPath = `/sites/${host}/langs/${locale}/posts`
    const post = await getDocFromPathAndSlug(postPath, slug) || null

    return { props: { post, host, lang: locale } }
}


export default DraftPostsPost