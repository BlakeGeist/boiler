import React from 'react'
import Link from 'next/link'
import Button from '@mui/material/Button'
import { doc, deleteDoc } from "firebase/firestore"
import { firebaseDb } from 'utils/firebase'
import { useRouter } from 'next/router'

import styled from 'styled-components'

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;

    th {
        text-align: left
    }

    td {
        padding: 5px 0;
    }

    td:last-of-type {
        text-align: right;
    }

    tr {
        border-bottom: 1px solid #ccc;
    }
`

const PostsTable = ({ posts, lang, host }) => {
    const router = useRouter()
    return (
        <Table>
            <thead>
                <tr>
                    <th>Title</th>
                </tr>
            </thead>
            <tbody>
                {posts.map(post => {
                    const deletePost = async (e) => {
                        e.preventDefault()

                        const postPath = `/sites/${host}/langs/${lang}/posts`
                        await deleteDoc(doc(firebaseDb, postPath, post.slug))
                            .then(() => {
                                router.push(`/dashboard/posts`)
                            })
                            .catch(e => console.log('error:, ', e))
                    }
                    return (

                        <tr key={post.slug}>
                            <td>
                                <Link href={`/posts/${post.slug}`}>{post.heading}</Link>
                            </td>
                            <td>
                                <Link href={`/dashboard/posts/drafts/${post.slug}`}>
                                    <Button variant="outlined">Edit</Button>                                    
                                </Link>
                            </td>
                            <td>
                                <Button onClick={(e) => deletePost(e)} variant="outlined">Delete</Button>
                            </td>                            
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    )
}

export default PostsTable