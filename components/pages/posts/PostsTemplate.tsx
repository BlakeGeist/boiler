import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { StyledList } from 'components/pages/post/index.styles'
import { truncateString } from 'utils/helpers'
import Link from 'next/link'
import { LoadingButton } from '@mui/lab'
import { collection, getDocs, limit, query, orderBy, startAfter } from "firebase/firestore"
import { firebaseDb } from 'utils/firebase'

const Post = styled.div`
    border: 1px solid #ccc;
    display: flex;
    flex: 0 1 545px;
    margin-bottom: 15px;

    h2 {
        font-size: 18px;
        font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
        color: rgba(0,0,0,.8);

        a {
            &:hover {
                text-decoration: underline;
            }
        }
    }
    
`

interface PostImageProps {
    src: string
}

const PostImage = styled.div<PostImageProps>`
    background-image: url(${props => props.src});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    min-height: 100%;
`

const PostContent = styled.div`
    flex: 0 1 67%;
    margin-left: 15px;
    padding: 0 1.25rem 1.25rem;
    display: flex;
    flex-direction: column;
`

const PostContentText = styled.div`
    flex: 1 1 auto;

    p {
        color: rgba(0,0,0,.44);
        font-size: 0.95rem;
        line-height: 1.4;
        font-weight: 400;
    }
`

const PostContentAuthor = styled.div`
    display: flex;
`

const PostContentAuthorImage = styled.div`
    height: 40px;
    flex: 0 0 40px;
    background-color: #bbb;
    border-radius: 50%;
    display: inline-block;
    margin-right: 15px;
`

const PostContentAuthorText = styled.div`
    color: rgba(0,0,0,.8);
    font-size: 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const PostContentContent = styled.div`
    color: rgba(0,0,0,.44);
`

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
                        <Post key={`${post.slug}-${i}-key`}>
                            <Link href={`/post/${post.slug}`}>
                                <a style={{flex: '1 1 auto'}}><PostImage src={post.mediumImageSrc} /></a>
                            </Link>
                            <PostContent>
                                <PostContentText>
                                    <h2>
                                        <Link href={`/post/${post.slug}`}>
                                            <a>{post.heading}</a>
                                        </Link>
                                    </h2>
                                    <p>{truncateString(post.shortDescription, 250)}</p>                                
                                </PostContentText>
                                <PostContentAuthor>
                                    <PostContentAuthorImage />
                                    <PostContentAuthorText>
                                        <div>name</div>
                                        <PostContentContent>22 July 2045 - 6 min read</PostContentContent>
                                    </PostContentAuthorText>
                                </PostContentAuthor>
                            </PostContent>
                        </Post>
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