import styled from 'styled-components'

export const Body = styled.div`
    flex: 0 1 550px;

    h2 {
        border-bottom: 1px solid rgba(0,0,0,.15);
        margin-bottom: 25px;
        font-weight: 700;
        font-size: 1.4rem;
        margin-bottom: 27px;
    
        span {
            border-bottom: 1px solid rgba(0,0,0,.44);
            display: inline-block;
            padding: 20px 0;
        }
    }    

    blockquote {
        border-left: 4px solid #00ab6b;
        padding: 0 20px;
        font-style: italic;
        color: rgba(0,0,0,.5);
        margin: 35px 0 0;
    }    

`

export const PostContainer = styled.div`
    display: flex;
    justify-content: center;
`

export const QuoteAndAd = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;
`