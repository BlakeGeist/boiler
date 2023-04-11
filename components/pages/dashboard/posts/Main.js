import React from 'react'
import Link from 'next/link'
import Button from '@mui/material/Button'
import { doc, deleteDoc } from "firebase/firestore"
import { firebaseDb } from 'utils/firebase'
import { useRouter } from 'next/router'

const DashboardPostsMain = ({ posts, host, lang }) => {
    const router = useRouter()

    return (
        <>
            <h1>Dashboard - Posts</h1>
            <table>
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
                                    <Button onClick={(e) => deletePost(e)} variant="outlined">Delete</Button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export default DashboardPostsMain