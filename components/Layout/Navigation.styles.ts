import styled from 'styled-components'

interface NavigationStylesProps {
    borderTop?: boolean
}


export const NavigationStyles = styled.nav<NavigationStylesProps>`
    ${props => props.borderTop ? 'border-top: 1px solid black;' : 'border-bottom: 1px solid black;' }
   
    ol {
        list-style-type: none;
        padding-left: 0;
    }
    
    li {
        display: inline-block;
    }
    
    li a::after {
        display: inline-block;
        color: #000;
        content: '>';
        font-size: 80%;
        font-weight: bold;
        padding: 0 3px;
    }
`
