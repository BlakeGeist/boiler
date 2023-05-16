import React from 'react'
import App from "next/app"
import { getDoc, doc } from 'firebase/firestore'
import { firebaseDb } from 'utils/firebase'
import '../styles/globals.css'
import { AuthProvider } from 'context/AuthContext'
import absoluteUrl from 'next-absolute-url'
import Head from 'next/head'
import { useRouter } from "next/router"

export function MyCustomApp({ Component, pageProps, site, host }) {
  const router = useRouter()
  const canonicalUrl = ('https://' + host + (router.asPath === "/" ? "": router.asPath)).split("?")[0]

  return (
    <AuthProvider>
      <Head>
        <link
          rel="canonical"
          href={canonicalUrl}
          key="canonical"
        />
        <meta charSet="utf-8" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap" rel="stylesheet" />                    
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7240508925750002" crossOrigin="anonymous"></script>

        <script
            dangerouslySetInnerHTML={{
            __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);} 
                gtag('js', new Date());

                gtag('config', 'G-HMMSNDKE0N');
            `
            }}
        />
        
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-HMMSNDKE0N"></script>        
      </Head>      
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

  return { ...ctx, site, host }
}

export default MyCustomApp
