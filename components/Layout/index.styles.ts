import styled from 'styled-components'

export const SiteLayout = styled.div`
    display: flex;
    flex-wrap: wrap;
    max-width: 1110px;
    margin: 20px auto;
    background-color: #fff;
    font-family: 'Open Sans', sans-serif;
    height: 100%;

    flex-direction: column;

    header, footer {
        flex: 0 0;
    }

    main {
        flex: 1 1 auto;
    }

    aside {
        flex: 0 1 250px;
        padding: 15px
    }

    iframe {
        border: none;
    }
`

export const Main = styled.main`
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