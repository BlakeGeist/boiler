import React from 'react'
import { useAuth } from "context/AuthContext"
import { useRouter }  from 'next/router'

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
            </div>
        </div>
    )
}

export default UserNav