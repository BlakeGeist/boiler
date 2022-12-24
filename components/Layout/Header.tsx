import React, { FC } from 'react'
import styled from 'styled-components'
import Navigation from 'components/Layout/Navigation'
import Link from 'next/link'

const StyledHeader = styled.header`
  overflow: auto;
  display: flex;
  align-items: center;
  width: 100%;

  background: rgba(255,255,255,.97);
  box-shadow: 0 2px 2px -2px rgb(0 0 0 / 15%);
`

const Index: FC = () => (
  <StyledHeader>
    <Link href="/">
      <a><img src="https://static.vecteezy.com/system/resources/previews/005/484/042/original/dog-logo-illustration-free-vector.jpg" height="75px" /></a>
    </Link>
    <Navigation />
  </StyledHeader>
)

export default Index
