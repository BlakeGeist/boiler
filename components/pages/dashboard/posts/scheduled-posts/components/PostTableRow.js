import React, { useState } from 'react'
import Link from 'next/link'
import Button from '@mui/material/Button'
import { doc, deleteDoc } from "firebase/firestore"
import { firebaseDb } from 'utils/firebase'
import { LoadingButton } from '@mui/lab'
import styled from 'styled-components'

const PostHas = styled.ul`
    padding: 0 20px;
    font-size: 10px;

    li {
        display: inline-block;
    }
`

const PostHasItem = styled.li`
    color: ${props => props.hasItem ? "black" : "red"};
    font-weight: ${props => props.hasItem ? "normal" : "bold"};
    padding: 0 5px;

    &:first-of-type {
        padding-left: 0;
    }
`

const PostHeading = styled.td`
    a {
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;  
        overflow: hidden;
        text-overflow: ellipsis;        
    }
`

const PostTableRow = ({ setPosts, posts, host, post, lang }) => {
    const [isLoading, setIsLoading] = useState(false)

    const deletePost = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        const postPath = `/sites/${host}/langs/${lang}/posts`

        await deleteDoc(doc(firebaseDb, postPath, post.slug))
            .then(async () => {
                setPosts(posts.filter( fpost => fpost.slug !== post.slug ))
            })
            .catch(e => console.log('error:, ', e))
    }
    return (

        <tr key={post.slug}>
            <PostHeading>
                <Link href={`/posts/${post.slug}`}>{post.heading}</Link>
            </PostHeading>
            <td>{post.publishedDate}</td>
            <td>
                <PostHas>
                    <PostHasItem hasItem={post.articleHtml && post.articleHtml.length > 0}>Article</PostHasItem>
                    <PostHasItem hasItem={post.headerImageSrc && post.headerImageSrc.length > 0}>Header Image</PostHasItem>
                    <PostHasItem hasItem={post.mediumImageSrc && post.mediumImageSrc.length > 0}>Body Image</PostHasItem>
                    <PostHasItem hasItem={post.faqs && post.faqs.length > 0}>Faqs</PostHasItem>
                    <PostHasItem hasItem={post.listicleItems && post.listicleItems.length > 0}>Listicle</PostHasItem>
                </PostHas>
            </td>
            <td>
                <Link href={`/posts/${post.slug}`} target="_blank">
                    <Button variant="outlined">View</Button>                                    
                </Link>
            </td>                            
            <td>
                <Link href={`/dashboard/posts/drafts/${post.slug}`}>
                    <Button variant="outlined">Edit</Button>                                    
                </Link>
            </td>
            <td>
                <LoadingButton onClick={(e) => deletePost(e)} loading={isLoading} loadingIndicator="Loading…" variant="outlined">Delete</LoadingButton>
            </td>                            
        </tr>
    )
}

export default PostTableRow