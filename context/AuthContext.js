import React, { createContext, useContext, useEffect, useState } from "react"
import { auth, } from 'utils/firebase'

import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth"

import nookies from 'nookies'

const AuthContext = createContext({
  user: null,
})

export const useAuth = () => {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  // listen for token changes
  // call setUser and write new token as a cookie
  useEffect(() => {
    return onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setUser(null)
        nookies.set(undefined, 'token', '', { path: '/' })
      } else {
        const token = await user.getIdToken()
        setUser(user)
        nookies.set(undefined, 'token', token, { path: '/' })
      }
    })
  }, [])

  // force refresh the token every 10 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      const user = auth.currentUser
      if (user) await user.getIdToken(true)
    }, 10 * 60 * 1000)

    // clean up setInterval
    return () => clearInterval(handle)
  }, [])

  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const logIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logOut = async () => {
    setUser({ email: null, uid: null })
    await signOut(auth)
  }

  return (
    <AuthContext.Provider value={{ user, signUp, logIn, logOut }}>{children}</AuthContext.Provider>
  )
}
