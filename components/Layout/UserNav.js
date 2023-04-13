import React from 'react'
import { useAuth } from "context/AuthContext"
import { useRouter }  from 'next/router'
import Link from 'next/link'

const UserNav = ({ user }) => {
    const { logOut } = useAuth()
    const router = useRouter()

    const signOut = async (e) => {
        e.preventDefault()

        try {
            await logOut()
            router.push("/")
        } catch (error) {
            console.log(error.message)
        }
    } 


    if(!user) return null
    return (
        <div>
            <div>
                {user.email}: <button onClick={signOut}>Sign Out</button>
                <ul>
                    <li>
                        <Link href="/dashboard/posts">Posts</Link>
                        <ul>
                            <li><Link href="/dashboard/posts/new">New Post</Link></li>
                            <li><Link href="/dashboard/posts/drafts">Draft Posts</Link></li>
                            <li><Link href="/dashboard/posts/scheduled-posts">Scheduled Posts</Link></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default UserNav