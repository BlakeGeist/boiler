import React from 'react'
import { firebaseDb } from 'utils/firebase'
import { collection, getDocs } from "firebase/firestore"
import Layout from 'components/Layout'
import Link from 'next/link'
import { StyledList, StyledDivider, ReadMore } from 'components/pages/post/index.styles'

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

export const getServerSideProps = async ({ req }) => {
    const host = req.headers.host
    const postsSnap = await getDocs(collection(firebaseDb,`sites/${host}/posts`))
    const posts = postsSnap.docs.map(doc => doc.data())
  
    return { props: { posts: posts || null  } }
  }
  

export default Posts