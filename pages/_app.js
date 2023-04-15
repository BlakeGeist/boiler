import React from 'react'
import App from "next/app"
import { getDoc, doc } from 'firebase/firestore'
import { firebaseDb } from 'utils/firebase'
import '../styles/globals.css'
import { AuthProvider } from 'context/AuthContext'
import absoluteUrl from 'next-absolute-url'

export function MyCustomApp({ Component, pageProps, site }) {
  return (
    <AuthProvider>
      <Component {...pageProps} site={site} />
    </AuthProvider>
  )
}

MyCustomApp.getInitialProps = async (context) => {
  const ctx = await App.getInitialProps(context)

  const { host } = absoluteUrl(context?.ctx.req)

  const siteRef = doc(firebaseDb, "sites", host)
  const siteDoc = await getDoc(siteRef)
  const site = siteDoc.data()

  return { ...ctx, site }
}

export default MyCustomApp
