import React, { FC, ReactChild } from 'react'
import { SiteLayout, Main } from './index.styles'
import Header from './Header'
import Footer from './Footer'

interface LayoutProps {
    children: ReactChild,
}

const Layout: FC<LayoutProps> = ({ children }) => (
  <SiteLayout>
    <Header />
    <Main>
        {children}
      </Main>
    <Footer />
  </SiteLayout>
)

export default Layout
