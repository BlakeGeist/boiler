import React from 'react'
import styled from 'styled-components'
import { StyledList } from 'components/pages/dashboard/posts/post/index.styles'
import { truncateString } from 'utils/helpers'
import Link from 'next/link'

import Button from '@mui/material/Button'

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

const PostImage = styled.div`
    flex: 1 1 400px;

    a {
        background-image: url(${props => props.src});
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;     
        min-height: 100%;
        display: block;        
    }
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

const PostsContainer = styled.div`
    max-width: 770px;
    margin: 0 auto;
`

const PostsTemplate = ({ posts, page = 0, hasNextPage = true }) => {
    return (
        <PostsContainer>
            <h1>Posts</h1>
            <StyledList>
                {posts.map((post, i) => {
                    return (
                        <Post key={`${post.slug}-${i}-key`}>
                            <PostImage src={post.mediumImageSrc}>
                                <Link href={`/posts/${post.slug}`}>
                                </Link>
                            </PostImage>
                            <PostContent>
                                <PostContentText>
                                    <h2>
                                        <Link href={`/posts/${post.slug}`}>
                                            {post.heading}
                                        </Link>
                                    </h2>
                                    <p>{truncateString(post.shortDescription, 200)}</p>                                
                                </PostContentText>
                            </PostContent>
                        </Post>
                    )
                })}

                {parseInt(page) > 0 &&
                    <>
                        {parseInt(page) > 1 &&
                            <Button variant='outlined' href={`/posts/page/${parseInt(page) - 1}`}>Prev</Button>
                        }
                        {hasNextPage &&
                            <Button variant='outlined' href={`/posts/page/${parseInt(page) + 1}`}>Next</Button>                        
                        }
                    </>
                }
            </StyledList>
        </PostsContainer>        
    )
} 

export default PostsTemplate