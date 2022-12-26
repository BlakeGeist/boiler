import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { StyledList, StyledDivider, ReadMore } from 'components/pages/post/index.styles'
import { truncateString } from 'utils/helpers'
import Link from 'next/link'
import { LoadingButton } from '@mui/lab'
import { collection, getDocs, limit, query, orderBy, startAfter } from "firebase/firestore"
import { firebaseDb } from 'utils/firebase'

const PostsContainer = styled.div`
    max-width: 770px;
    margin: 0 auto;
`

const LoadingButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 25px;
`

const PostsTemplate = ({ posts, host }) => {
    const [postsData, setPostsData] = useState(posts)
    const [lastVisible, setLastVisible] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [showLoadMore, setShowLoadMore] = useState(true)

    useEffect(() => {
        const fetchInitalPost = async () => {
            const postsQuery = query(collection(firebaseDb, `sites/${host}/posts`), orderBy('createdAt', "desc"), limit(10))
            const postsSnap = await getDocs(postsQuery)
            setLastVisible(postsSnap.docs[postsSnap.docs.length-1])
        }

        fetchInitalPost()
    }, [])

    const loadMorePosts = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        const next = query(collection(firebaseDb, `sites/${host}/posts`),
            orderBy("createdAt", "desc"),
            startAfter(lastVisible),
            limit(10))
    
        const morePostsSnap = await getDocs(next)
        const morePosts = morePostsSnap.docs.map(doc => doc.data())

        if(morePosts.length < 10) setShowLoadMore(false)

        setLastVisible(morePostsSnap.docs[morePostsSnap.docs.length-1])
        setPostsData(postsData.concat(morePosts))
        setIsLoading(false)
    }

    return (
        <PostsContainer>
            <h1>Posts</h1>
            <StyledList>
                {postsData.map((post, i) => {
                    return (
                        <li key={post.slug}>
                            <h2>
                                <Link href={`/post/${post.slug}`}>
                                    <a>{post.heading}</a>
                                </Link>
                            </h2>
                            <img src={post.mediumImageSrc} style={{float: 'left', maxWidth: '125px', margin: '0 15px 0 0'}} />
                            <p>{truncateString(post.shortDescription, 385)}</p>
                            <ReadMore>
                                <Link href={`/post/${post.slug}`}>
                                    <a>Full Post &#8594;</a>
                                </Link>
                            </ReadMore>
                            {posts.length !== i+1 && <StyledDivider />}                                
                        </li>
                    )
                })}

                {showLoadMore &&
                    <LoadingButtonContainer>
                        <LoadingButton onClick={loadMorePosts} loading={isLoading} loadingIndicator="Loading…" variant="outlined">
                            Load More
                        </LoadingButton>
                    </LoadingButtonContainer>                
                }

            </StyledList>
        </PostsContainer>        
    )
} 

export default PostsTemplate