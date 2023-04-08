import React, { FC } from 'react'
import { NavigationStyles } from './Navigation.styles'
import Link from 'next/link'

interface NavProps {
    borderTop?: boolean
}

const Nav:FC<NavProps> = ({ borderTop }) => {

    const NavItem = ({ href, text }) => {
        return (
            <li>
                <Link href={href}>
                    {text} 
                </Link>
            </li>
        )
    }

    /*

        const onSubmit = (e) => {
            e.preventDefault()

            const searchTerm = e.target.search.value
            router.push(`/search?search=${searchTerm}`)
        }

        <form onSubmit={(e) => onSubmit(e)}>
            <StyledInput name="search" placeholder='Search' type="search" />
            <input type="submit" />
        </form>
    */    

    return (
        <NavigationStyles borderTop={borderTop}>
            <ol>
                <NavItem href="/posts" text="Posts" />
                <NavItem href="/categories" text="Categories" />
                <NavItem href="/search" text="Search" />
            </ol>
        </NavigationStyles>
    )
}

export default Nav