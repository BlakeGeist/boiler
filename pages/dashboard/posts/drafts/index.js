import React from 'react'
import DraftPostsMain from 'components/pages/dashboard/posts/drafts/Main'
import Layout from 'components/Layout'
import { collection, where, query, orderBy, getDocs } from "firebase/firestore"
import { firebaseDb } from 'utils/firebase'
import Breadcrumbs from 'components/BreadCrumbs'
import nookies from 'nookies'
import { firebaseAdmin } from 'utils/firebaseAdmin'

const Drafts = ({ user, site, host, draftPosts }) => {
    return (
        <Layout site={site} user={user}>
            <Layout.Main>
                <Breadcrumbs pathArray={[{text: 'Dashboard', href: "/dashboard"}, {text: 'Posts', href: "/dashboard/posts"}, {text: 'Drafts'}]} />
                <DraftPostsMain posts={draftPosts} host={host} />
            </Layout.Main>
        </Layout>
    )
}

export const getServerSideProps = async (ctx) => {
    try {
        const cookies = nookies.get(ctx)
        const host = ctx.req.headers.host
        const lang = ctx.locale
        
        const token  = await firebaseAdmin.auth().verifyIdToken(cookies.token)

        const draftPostsPath = collection(firebaseDb, `sites/${host}/langs/${lang}/posts`)
        const draftPostsQuery = query(draftPostsPath, where("status", "==", 'draft'), orderBy("createdAt", "desc"))
        const draftPostsDocs = await getDocs(draftPostsQuery)
        const draftPosts = draftPostsDocs?.docs?.map(doc => doc.data())        

        return {
            props: { host, draftPosts, lang, user: token }
        }
    } catch (err) {
        ctx.res.writeHead(302, { Location: '/dashboard/login' })
        ctx.res.end()

        return { props: {}}
    }
}


export default Drafts