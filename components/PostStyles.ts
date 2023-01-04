import styled from 'styled-components'

export const FeaturedCard = styled.div`
    border: 1px solid #ccc;
    display: flex;
    flex: 0 1 545px;
    margin-bottom: 15px;

    h2 {
        font-size: 18px;
        font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
        color: rgba(0,0,0,.8);
    }
`

interface CardImageProps {
    src: string
}

export const FeaturedCardImageLink = styled.a<CardImageProps>`
    flex: 1 0 280px;
    background-image: url(${props => props.src});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    cursor: pointer;
`

export const FeaturedCardContent = styled.div`
    flex: 0 1 67%;
    margin-left: 15px;
    padding: 0 1.25rem 1.25rem;
    display: flex;
    flex-direction: column;
`

export const FeaturedCardContentAurthor = styled.div`
    display: flex;
`

export const FeaturedCardText = styled.div`
    flex: 1 1 auto;

    p {
        color: rgba(0,0,0,.44);
        font-size: 0.95rem;
        line-height: 1.4;
        font-weight: 400;
    }
`

export const FeaturedCardContentAurthorImage = styled.div`
    height: 40px;
    flex: 0 0 40px;
    background-color: #bbb;
    border-radius: 50%;
    display: inline-block;
    margin-right: 15px;
`

export const FeaturedCardContentAuthorText = styled.div`
    color: rgba(0,0,0,.8);
    font-size: 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

export const FeaturedCardContentPostDate = styled.div`
    color: rgba(0,0,0,.44);
    margin-top: 5px;
`

interface CardImage2Props {
    src: string
}

export const CardImage = styled.div<CardImage2Props>`
    background-image: url(${props => props.src});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    min-height: 235px;
`

export const Card = styled.div`
    flex: 0 1 350px;
    border: 1px solid #ccc;
    display: flex;
    margin-bottom: 15px;
    flex-direction: column;

    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
`

export const CardContent = styled.div`
    padding: 0 1.25rem 1.25rem;
`

export const CardHeader = styled.h2`
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;  
    overflow: hidden;
    min-height: 84px;
`