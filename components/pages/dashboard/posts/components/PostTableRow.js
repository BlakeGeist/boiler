import React, { useState } from 'react'
import Link from 'next/link'
import Button from '@mui/material/Button'
import { doc, deleteDoc } from "firebase/firestore"
import { firebaseDb } from 'utils/firebase'
import { LoadingButton } from '@mui/lab'

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
            <td>
                <Link href={`/posts/${post.slug}`}>{post.heading}</Link>
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