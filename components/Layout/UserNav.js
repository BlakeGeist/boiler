import React from 'react'
import { useAuth } from "context/AuthContext"
import { useRouter }  from 'next/router'
import UserMenu from './UserMenu'

const UserNav = ({ user }) => {
    if(!user) return null

    const { logOut } = useAuth()
    const router = useRouter()

    const signOut = async (e) => {
        e.preventDefault()

        try {
            await logOut()
            router.push("/")
        } catch (error) {
            console.error(error.message)
        }
    } 

    return (
        <div>
            <div>
                {user.email}: <button onClick={signOut}>Sign Out</button>
                <UserMenu />
            </div>
        </div>
    )
}

export default UserNav