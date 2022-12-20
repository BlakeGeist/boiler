import React, { FC } from 'react'
import styled from 'styled-components'

const StyledHeader = styled.header`
  overflow: auto;
`

interface ChildProps {
    heading: string
}

const Index: FC<ChildProps> = ({ heading }) => (
  <StyledHeader>
    <h1>{heading}</h1>
  </StyledHeader>
)

export default Index
