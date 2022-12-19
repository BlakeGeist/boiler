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
                    <a>{text}</a>    
                </Link>
            </li>
        )
    }

    return (
        <NavigationStyles borderTop={borderTop}>
            <ol>
                <NavItem href="/" text="Home" />
                <NavItem href="/posts" text="Posts" />
                <NavItem href="/categories" text="Categories" />
            </ol>
        </NavigationStyles>
    )
    
}

export default Nav