import styled from 'styled-components'

export const ReadMore = styled.div`
    text-align: end;
    text-decoration: underline;
`

export const StyledDivider = styled.hr`
    background-color: transparent;
    border: 0;
    border-top: 3px double slategray;
    height: 3px;
    margin: 2rem auto;
    width: 30%;

    &:before {
        background-color: snow;
        color: slategray;
        content: '🐕';
        font-size: 20px;
        left: 50%;
        letter-spacing: 0;
        line-height: 1;
        position: absolute;
        text-indent: -2px;
        text-rendering: geometricPrecision;
        transform: translate(-50%, -65%);
        width: 10px;
    }
`

export const StyledList = styled.ul`
    padding: 0;
    list-style: none;
`