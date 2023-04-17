import React from 'react'
import NewPostMain from 'components/pages/dashboard/posts/new/Main'
import Layout from 'components/Layout'
import Breadcrumbs from 'components/BreadCrumbs'
import nookies from 'nookies'
import { firebaseAdmin } from 'utils/firebaseAdmin'

const NewPost = ({ user, site, host, lang }) => (
    <Layout site={site} user={user}>
        <Layout.Main>
            <Breadcrumbs pathArray={[{text: 'Dashboard', href: "/dashboard"}, {text: 'Posts', href: "/dashboard/posts"}, {text: 'New Post'}]} />
            <NewPostMain host={host} site={site} lang={lang} />
        </Layout.Main>
    </Layout>
)

export const getServerSideProps = async (ctx) => {
    try {
        const cookies = nookies.get(ctx)
        const host = ctx.req.headers.host
        const lang = ctx.locale
        
        const token  = await firebaseAdmin.auth().verifyIdToken(cookies.token)

        return {
            props: { host, lang, user: token }
        }
    } catch (err) {
        ctx.res.writeHead(302, { Location: '/dashboard/login' })
        ctx.res.end()

        return { props: {}}
    }
}

export default NewPost