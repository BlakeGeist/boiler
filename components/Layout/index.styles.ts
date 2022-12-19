import styled from 'styled-components'

export const SiteLayout = styled.div`
    max-width: 800px;
    margin: 20px auto;
    background-color: #fff;
    padding: 0px 15px;
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