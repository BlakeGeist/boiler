import React, { FC } from 'react'
import '../styles/globals.css'

interface MyAppProps {
  Component: any;
  pageProps: any;
}

const MyApp:FC<MyAppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

export default MyApp
