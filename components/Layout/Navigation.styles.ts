import styled from 'styled-components'

interface NavigationStylesProps {
    borderTop?: boolean
}

export const NavigationStyles = styled.nav<NavigationStylesProps>`
    flex: 1 1 100%;
    display: flex;
    justify-content: flex-end;

    ol {
        list-style-type: none;
        padding-left: 0;
        display: flex;
        align-items: center;
    }
    
    li {
        display: inline-block;
    }
    
    a {
        color: rgba(0,0,0,.5);
        padding-right: 10px;
        padding-left: 10px;
    }
`
