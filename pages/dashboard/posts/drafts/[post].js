import React from 'react'
import { getDocFromPathAndSlug } from 'utils/firebase'
import Layout from 'components/Layout'
import DraftPostMain from 'components/pages/dashboard/posts/drafts/draft/Main'
import Breadcrumbs from 'components/BreadCrumbs'
import nookies from 'nookies'
import { firebaseAdmin } from 'utils/firebaseAdmin'

const DraftPostsPost = ({ user, post, site, host, lang }) => {
    return (
        <Layout site={site} user={user}>
            <Layout.Main>
                <Breadcrumbs pathArray={[{text: 'Dashboard', href: "/dashboard"}, {text: 'Posts', href: "/dashboard/posts"}, {text: 'Drafts', href: '/dashboard/posts/drafts'}, { text: 'Draft'}]} />
                <DraftPostMain post={post} site={site} host={host} lang={lang} />
            </Layout.Main>
        </Layout>
    )
}

export const getServerSideProps = async (ctx) => {
    try {
        const cookies = nookies.get(ctx)
        const host = ctx.req.headers.host
        const lang = ctx.locale
        const slug = ctx.query.post
        
        const token  = await firebaseAdmin.auth().verifyIdToken(cookies.token)

        const postPath = `/sites/${host}/langs/${lang}/posts`
        const post = await getDocFromPathAndSlug(postPath, slug) || null      

        return {
            props: { host, post, lang, user: token }
        }
    } catch (err) {
        console.log(err)
        return { props: {}}
    }
}


export default DraftPostsPost