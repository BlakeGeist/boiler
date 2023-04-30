import React from 'react'
import ScheduledPostsMain from 'components/pages/dashboard/posts/scheduled-posts/Main'
import Layout from 'components/Layout'
import { collection, where, query, orderBy, getDocs } from "firebase/firestore"
import { firebaseDb } from 'utils/firebase'
import Breadcrumbs from 'components/BreadCrumbs'
import nookies from 'nookies'
import { firebaseAdmin } from 'utils/firebaseAdmin'
import moment from 'moment'

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
        const host = 'pet-tips-n-tricks.com'
        const lang = ctx.locale
        
        const token  = await firebaseAdmin.auth().verifyIdToken(cookies.token)
        const currentTime = moment().format('YYYY/MM/DD:HH:mm:ss').toString()

        const scheduledPostsPath = collection(firebaseDb, `sites/${host}/langs/${lang}/posts`)
        const scheduledPostsQuery = query(scheduledPostsPath, where("publishedDate", ">", currentTime), orderBy("publishedDate", "asc"))
        const scheduledPostsDocs = await getDocs(scheduledPostsQuery)
        const scheduledPosts = scheduledPostsDocs?.docs?.map(doc => doc.data())
    
        return {
            props: { host, scheduledPosts, user: token, lang }
        }
    } catch (err) {
        ctx.res.writeHead(302, { Location: '/dashboard/login' })
        ctx.res.end()

        return { props: {}}
    }
}

export default SchdeduledPosts