import React, { FC, ReactChild } from 'react'
import { SiteLayout, Main, Content } from './index.styles'
import Header from './Header'
import Footer from './Footer'
import Navigation from './Navigation'

interface LayoutProps {
    children: ReactChild,
    heading?: string
}

const Layout: FC<LayoutProps> = ({ children, heading }) => (
  <SiteLayout>
    <Navigation />
    {heading && <Header heading={heading} />}
    <Content>
      <Main>
        {children}
      </Main>
      {
        //<Aside>
          //<h4>Sidebar</h4>
        //</Aside>
       }
    </Content>
    <Footer />
  </SiteLayout>
)

export default Layout
