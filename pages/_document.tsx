import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default class MyDocument extends Document {
    render () {
        return (
            <Html lang="en">
                <Head>
                    <meta charSet="utf-8" />
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap" rel="stylesheet" />                    
                    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7240508925750002" crossOrigin="anonymous"></script>
                
                    
                    <Script async src="https://www.googletagmanager.com/gtag/js?id=G-HMMSNDKE0N"></Script>
                    <Script id="google-analytics">
                        {`window.dataLayer = window.dataLayer || [];
                        function gtag(){
                            dataLayer.push(arguments); 
                        } 
                        gtag('js', new Date());

                        gtag('config', 'G-HMMSNDKE0N');`}
                    </Script>                
                </Head>
                <body>
                    <Main />
                    <NextScript />
                    {/* Empty script tag as chrome bug fix, see https://stackoverflow.com/a/42969608/943337 */}
                    <script> </script>
                </body>
            </Html>
        )
    }
}