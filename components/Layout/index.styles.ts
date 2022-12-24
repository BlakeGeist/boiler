import styled from 'styled-components'

export const SiteLayout = styled.div`
    max-width: 1110px;
    margin: 20px auto;
    background-color: #fff;
    font-family: Verdana;
`

export const Main = styled.main`
    flex: 1 1 770px;
    overflow: auto;

    ul, ol {
        li {
            margin-bottom: 15px;
        }
    }

    .rdw-image-modal {
        right: 5px !important;
        left: auto !important;
    }

    figure {
        margin: 0;
    }

    p {
        br {
            display: none;
        }
    }

`

export const Content = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`

export const Aside = styled.aside`
    flex: 0 1 240px;
    margin-left: 25px;
`