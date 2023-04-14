import React from 'react'
import App, { AppContext, AppProps } from "next/app"
import { getDoc, doc } from 'firebase/firestore'
import { firebaseDb } from 'utils/firebase'
import '../styles/globals.css'
import { AuthProvider } from 'context/AuthContext'

type TProps = AppProps & {
  site: any;
};

export function MyCustomApp({ Component, pageProps, site }: TProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} site={site} />
    </AuthProvider>
  )
}

MyCustomApp.getInitialProps = async (context: AppContext) => {
  const ctx = await App.getInitialProps(context)
  const host = context.ctx.req.headers.host

  const siteRef = doc(firebaseDb, "sites", host)
  const siteDoc = await getDoc(siteRef)
  const site = siteDoc.data()

  return { ...ctx, site }
}

export default MyCustomApp
