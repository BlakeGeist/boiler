import React from 'react'
import { SiteLayout } from './index.styles'
import GlobalHeader from './Header'
import GlobalFooter from './Footer'
import UserNav from 'components/Layout/UserNav'

const Layout = ({ children, site, user = null }) => {
    return (
        <SiteLayout>
            <UserNav user={user} />
            <GlobalHeader logoAlt={site?.logoAlt} logoSrc={site?.logoSrc} />
            {children}
            <GlobalFooter site={site} />
        </SiteLayout>        
    )
}

const Header = ({ children }) => (
    <header>{children}</header>
)

const Main = ({ children }) => (    
    <main>{children}</main>
)

const Aside = ({ children }) => (
    <aside>{children}</aside>
)

const Footer = ({ children }) => (
    <footer>{children}</footer>
)

Layout.Header = Header
Layout.Main = Main
Layout.Aside = Aside
Layout.Footer = Footer

export default Layout