import React, { FC } from 'react'
import { NavigationStyles } from './Navigation.styles'
import Link from 'next/link'
import styled from 'styled-components'
import { useRouter } from "next/router"

const StyledInput = styled.input`
    font-size: 0.8rem;
    border-radius: 30px;
    overflow: hidden;
    border: 1px solid rgba(0,0,0,0.04);
    padding: 10px;
`

interface NavProps {
    borderTop?: boolean
}

const Nav:FC<NavProps> = ({ borderTop }) => {
    const router = useRouter()

    const NavItem = ({ href, text }) => {
        return (
            <li>
                <Link href={href}>
                    <a>{text}</a>    
                </Link>
            </li>
        )
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const searchTerm = e.target.search.value
        router.push(`/search?search=${searchTerm}`)
    }

    return (
        <NavigationStyles borderTop={borderTop}>
            <ol>
                <NavItem href="/posts" text="Posts" />
                <NavItem href="/categories" text="Categories" />
                <form onSubmit={(e) => onSubmit(e)}>
                    <StyledInput name="search" placeholder='Search' type="search" />
                    <input type="submit" />
                </form>
            </ol>
        </NavigationStyles>
    )
}

export default Nav