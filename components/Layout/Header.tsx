import React, { FC } from 'react'
import styled from 'styled-components'
import Navigation from 'components/Layout/Navigation'
import Link from 'next/link'

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  width: 100%;

  background: rgba(255,255,255,.97);
  box-shadow: 0 2px 2px -2px rgb(0 0 0 / 15%);
`
interface HeaderProps {
  logoSrc: string
}

const Header:FC<HeaderProps> = ({ logoSrc }) => (
  <StyledHeader>
    <Link href="/">
      <img src={logoSrc} height="75px" />
    </Link>
    <Navigation />
  </StyledHeader>
)

export default Header
