import React, { FC, ReactChild } from 'react'
import { SiteLayout, Main } from './index.styles'
import Header from './Header'
import Footer from './Footer'

interface LayoutProps {
    children: ReactChild,
    site: any
}

const Layout: FC<LayoutProps> = ({ children, site }) => (
  <SiteLayout>
    <Header logoSrc={site.logoSrc} />
    <Main>
        {children}
      </Main>
    <Footer site={site} />
  </SiteLayout>
)

export default Layout
