import React, { FC, ReactChild } from 'react'
import { SiteLayout, Main, Content } from './index.styles'
import Header from './Header'
import Footer from './Footer'

interface LayoutProps {
    children: ReactChild,
}

const Layout: FC<LayoutProps> = ({ children }) => (
  <SiteLayout>
    <Header />
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
