import React from 'react'
import { firebaseDb } from 'utils/firebase'
import { collection, query, orderBy, limit, startAfter, getDocs } from 'firebase/firestore'

import PostsMain from 'components/pages/posts/Main'
import Layout from 'components/Layout'

const Page = ({ posts, host, site, locale, page }) => {
    console.log(page)
    return (
        <Layout site={site}>
            <Layout.Main>
                <PostsMain host={host} posts={posts} locale={locale} page={page} />
            </Layout.Main>
        </Layout>
    )
}

export const getServerSideProps = async ({ req, locale, query: reqQuery }) => {
    const{ page } = reqQuery
    const lang = locale
    const host = req.headers.host

    const posts = await fetchPage(page, host, lang)

    return { props: { posts: posts || null, host, locale, page } }
}

export default Page


// Define the page size and target page number
const pageSize = 10 // Number of documents per page

// Function to fetch a specific page
async function fetchPage(page, host, lang) {
    // Calculate the document offset for the target page
    const offset = (page - 1) * pageSize
  
    // Create a query for the collection, order by a specified field, and limit the result to the pageSize
    const q = query(collection(firebaseDb, `sites/${host}/langs/${lang}/posts`), orderBy('createdAt'), limit(pageSize))
  
    // If it's not the first page, start after the document at the calculated offset
    if (offset > 0) {
      const snapshot = await getDocs(q)
      const startAfterDoc = snapshot.docs[offset - 1]
  
      // Check if the document at the offset exists before using startAfter
      if (startAfterDoc) {
        const qWithStartAfter = query(q, startAfter(startAfterDoc))
        const snapshotWithStartAfter = await getDocs(qWithStartAfter)
        const results = snapshotWithStartAfter.docs.map(doc => doc.data())
        return results
      }
    }
  
    const snapshot = await getDocs(q)
    const results = snapshot.docs.map(doc => doc.data())

    return results
  }
  

