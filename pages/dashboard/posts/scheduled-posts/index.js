import React from 'react'
import ScheduledPostsMain from 'components/pages/dashboard/posts/scheduled-posts/Main'
import Layout from 'components/Layout'
import { collection, where, query, orderBy, getDocs } from "firebase/firestore"
import { firebaseDb } from 'utils/firebase'
import Breadcrumbs from 'components/BreadCrumbs'
import nookies from 'nookies'
import { firebaseAdmin } from 'utils/firebaseAdmin'

const SchdeduledPosts = ({ user, site, host, scheduledPosts, lang }) => (
    <Layout site={site} user={user}>
        <Layout.Main>
            <Breadcrumbs pathArray={[{text: 'Dashboard', href: "/dashboard"}, {text: 'Posts', href: "/dashboard/posts"}, {text: 'Scheduled Posts'}]} />
            <ScheduledPostsMain scheduledPosts={scheduledPosts} host={host} lang={lang} />
        </Layout.Main>
    </Layout>
)

export const getServerSideProps = async (ctx) => {
    try {
        const cookies = nookies.get(ctx)
        const host = ctx.req.headers.host
        const lang = ctx.locale
        
        const token  = await firebaseAdmin.auth().verifyIdToken(cookies.token)

        const scheduledPostsPath = collection(firebaseDb, `sites/${host}/langs/${lang}/posts`)
        const scheduledPostsQuery = query(scheduledPostsPath, where("status", "==", 'scheduled'), orderBy("createdAt", "desc"))
        const scheduledPostsDocs = await getDocs(scheduledPostsQuery)
        const scheduledPosts = scheduledPostsDocs?.docs?.map(doc => doc.data())
    
        return {
            props: { host, scheduledPosts, user: token }
        }
    } catch (err) {
        ctx.res.writeHead(302, { Location: '/dashboard/login' })
        ctx.res.end()

        return { props: {}}
    }
}

export default SchdeduledPosts