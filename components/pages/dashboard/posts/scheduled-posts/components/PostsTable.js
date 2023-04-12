import React from 'react'
import { firebaseDb } from 'utils/firebase'
import { doc, deleteDoc } from "firebase/firestore"
import { useRouter } from 'next/router'

const PostsTable = ({ posts, host  }) => {
    const router = useRouter()

    return (
        <table>
            <thead>
                <tr>
                    <th>Heading</th>
                    <th>Delete</th>
                </tr>
            </thead>

            <tbody>
                {posts.map(post => {

                    const handleDelete = async (e) => {
                        e.preventDefault()

                        const postPath = `/sites/${host}/scheduledPosts`
                        await deleteDoc(doc(firebaseDb, postPath, post.id))
                            .then(() => {
                                router.push(`/dashboard/scheduled-posts`)
                            })
                            .catch(e => console.log('error:, ', e))

                    }

                    const handleEdit = (e) => {
                        e.preventDefault()

                    }
                    return (
                        <tr key={post.id}>
                            <td>View</td>
                            <td>
                                <button onClick={handleEdit}>
                                    Edit
                                </button>
                            </td>
                            <td>
                                <button onClick={handleDelete}>
                                    Delete
                                </button>
                            </td>
                        </tr>                        
                    )
                })}

            </tbody>
        </table>
    )
}

export default PostsTable