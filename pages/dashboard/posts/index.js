import React from 'react'
import { firebaseDb, getDocsFromQuery } from 'utils/firebase'
import { collection, limit, query, orderBy } from "firebase/firestore"
import Layout from 'components/Layout'
import DashboardPostsMain from 'components/pages/dashboard/posts/Main'
import Breadcrumbs from 'components/BreadCrumbs'
import nookies from 'nookies'
import { firebaseAdmin } from 'utils/firebaseAdmin'

const DashboardPosts = ({ user, site, posts, host, lang }) => (
    <Layout site={site} user={user}>
        <Layout.Main>
            <Breadcrumbs pathArray={[{text: 'Dashboard', href: "/dashboard"}, {text: 'Posts'}]} />
            <DashboardPostsMain host={host} lang={lang} posts={posts} />
        </Layout.Main>
    </Layout>
)

export const getServerSideProps = async (ctx) => {
    try {
        const cookies = nookies.get(ctx)
        const host = ctx.req.headers.host
        const lang = ctx.locale
        
        const token  = await firebaseAdmin.auth().verifyIdToken(cookies.token)

        const postsPath = `sites/${host}/langs/${lang}/posts`
        const postsQuery = query(collection(firebaseDb, postsPath), orderBy('createdAt', "desc"), limit(10))
        const posts = await getDocsFromQuery(postsQuery) || null
    
        return {
            props: { host, lang, posts, user: token }
        }
    } catch (err) {
        ctx.res.writeHead(302, { Location: '/dashboard/login' })
        ctx.res.end()

        return { props: {}}
    }
}

export default DashboardPosts