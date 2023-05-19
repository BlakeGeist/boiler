import React from 'react'
import { firebaseDb } from 'utils/firebase'
import { collection, query, orderBy, limit, startAfter, getDocs, where } from 'firebase/firestore'

import PostsMain from 'components/pages/posts/Main'
import Layout from 'components/Layout'
import moment from 'moment'

const Page = ({ posts, host, site, locale, page, hasNextPage }) => {
    return (
        <Layout site={site}>
            <Layout.Main>
                <PostsMain host={host} posts={posts} locale={locale} page={page} hasNextPage={hasNextPage} />
            </Layout.Main>
        </Layout>
    )
}

export const getServerSideProps = async ({ req, locale, query: reqQuery }) => {
    const{ page } = reqQuery
    const lang = locale
    const host = req.headers.host

    const pageNumber = parseInt(page) // The page number you want to fetch
    const pageSize = 10 // The number of documents per page
    const collectionRef = collection(firebaseDb, `sites/pet-tips-n-tricks.com/langs/${lang}/posts`)

    
    const posts = await fetchDocumentsByPage(collectionRef, pageNumber, pageSize)

    const hasNextPage = posts.hasNextPage

    return { props: { posts: posts.documents || null, host, locale, page, hasNextPage } }
}

export default Page

async function fetchDocumentsByPage(collectionRef, pageNumber, pageSize) {
    const currentTime = moment().format('YYYY/MM/DD:HH:mm:ss').toString()

    try {
      const documents = []
      let hasNextPage = false
  
      let q = query(
        collectionRef,
        where("publishedDate", "<", currentTime),
        orderBy('publishedDate', "desc"),
        limit(pageSize)
      )
  
      if (pageNumber > 1) {
        const startAfterDoc = await getStartAfterDocument(collectionRef, pageNumber, pageSize)
        q = query(q, startAfter(startAfterDoc))
      }
  
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        documents.push({ id: doc.id, ...doc.data() })        
      })

      if(documents.length === pageSize) {
        hasNextPage = true
      }
  
      return {
        documents,
        hasNextPage,
      }
    } catch (error) {
      console.error('Error fetching documents:', error)
      throw error
    }
  }

  async function getStartAfterDocument(collectionRef, pageNumber, pageSize) {
    const startAfterQuery = query(collectionRef, orderBy('createdAt'), limit((pageNumber - 1) * pageSize))
    const querySnapshot = await getDocs(startAfterQuery)
    const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1]
    return lastDoc
  }