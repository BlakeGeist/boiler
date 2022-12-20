import React from 'react'
import { firebaseDb } from 'utils/firebase'
import { collection, getDocs, query, limit } from "firebase/firestore"
import Layout from 'components/Layout'
import Link from 'next/link'
import { StyledList, StyledDivider, ReadMore } from 'components/pages/sites/index.styles'

const Posts = ({ posts }) => {
    return (
        <Layout>
            <>
                <h1>Posts</h1>
                <StyledList>
                    {posts.map((post, i) => {
                        return (
                            <li key={post.slug}>
                                <h2>
                                    <Link href={`/posts/${post.slug}`}>
                                        <a>{post.post_heading}</a>
                                    </Link>
                                </h2>

                                <p>{post.post_description}</p>
                            
                                <ReadMore>
                                    <Link href={`/posts/${post.slug}`}>
                                        <a>Full Post &#8594;</a>
                                    </Link>
                                </ReadMore>

                                {posts.length !== i+1 && <StyledDivider />}                                
                            </li>
                        )
                    })}
                </StyledList>
            </>
        </Layout>
    )
}

export const getServerSideProps = async () => {
    const orderedDocs = query(collection(firebaseDb, "posts"), limit(100))
    const querySnapshot = await getDocs(orderedDocs)
    const posts = querySnapshot.docs.map(doc => doc.data())
  
    return { props: { posts: posts || null  } }
  }
  

export default Posts