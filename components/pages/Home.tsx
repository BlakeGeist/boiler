import React from 'react'
import Layout from 'components/Layout'
import styled from 'styled-components'
import Link from 'next/link'
import { truncateString } from 'utils/helpers'

const FeaturedCards = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    font-family: Helvetica;
`

const FeaturedCard = styled.div`
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

const FeaturedCardImageLink = styled.a<CardImageProps>`
    flex: 1 0 200px;
    background-image: url(${props => props.src});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    cursor: pointer;
`

const FeaturedCardContent = styled.div`
    flex: 0 1 67%;
    margin-left: 15px;
    padding: 0 1.25rem 1.25rem;
    display: flex;
    flex-direction: column;
`

const FeaturedCardContentAurthor = styled.div`
    display: flex;
`

const FeaturedCardText = styled.div`
    flex: 1 1 auto;

    p {
        color: rgba(0,0,0,.44);
        font-size: 0.95rem;
        line-height: 1.4;
        font-weight: 400;
    }
`

const FeaturedCardContentAurthorImage = styled.div`
    height: 40px;
    flex: 0 0 40px;
    background-color: #bbb;
    border-radius: 50%;
    display: inline-block;
    margin-right: 15px;
`

const FeaturedCardContentAuthorText = styled.div`
    color: rgba(0,0,0,.8);
    font-size: 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const FeaturedCardContentPostDate = styled.div`
    color: rgba(0,0,0,.44);
    margin-top: 5px;
`

interface CardImage2Props {
    src: string
}

const CardImage = styled.div<CardImage2Props>`
    background-image: url(${props => props.src});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    min-height: 235px;
`

const Card = styled.div`
    flex: 0 1 350px;
    border: 1px solid #ccc;
    display: flex;
    margin-bottom: 15px;
    flex-direction: column;

    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
`

const CardContent = styled.div`
    padding: 0 1.25rem 1.25rem;
`

const Heading = styled.div`
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
`

const CardHeader = styled.h2`
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;  
    overflow: hidden;
    min-height: 84px;
`

const Home = ({ posts }) => {

    const daPosts = posts

    const featuredPosts = daPosts.slice(0, 4)

    const regularPosts = posts.slice(4, posts.length)

      const FeaturedCardContainer = ({ post }) => (
        <FeaturedCard>
            <Link href={`/post/${post.slug}`}>
                <FeaturedCardImageLink src={post.mediumImageSrc} />
            </Link>
            <FeaturedCardContent>
                <FeaturedCardText>
                    <h2>
                        <Link href={`/post/${post.slug}`}>
                            <a>{post.heading}</a>
                        </Link>
                    </h2>
                    <p>{truncateString(post.shortDescription, 275)}</p>                                
                </FeaturedCardText>
                <FeaturedCardContentAurthor>
                    <FeaturedCardContentAurthorImage />
                    <FeaturedCardContentAuthorText>
                        <div>name</div>
                        <FeaturedCardContentPostDate>22 July 2045 - 6 min read</FeaturedCardContentPostDate>
                    </FeaturedCardContentAuthorText>
                </FeaturedCardContentAurthor>
            </FeaturedCardContent>
        </FeaturedCard>
    )

    const CardContainer = ({ post }) => (
        <Card>
            <Link href={`/post/${post.slug}`}>
                <a><CardImage src={post.mediumImageSrc} /></a>
            </Link>
            <CardContent>
                <div>
                    <div>
                        <CardHeader>
                            <Link href={`/post/${post.slug}`}>
                                <a>{post.heading}</a>
                            </Link>
                        </CardHeader>
                        <p>{truncateString(post.shortDescription, 375)}</p>                                
                    </div>
                </div>
                <FeaturedCardContentAurthor>
                    <FeaturedCardContentAurthorImage />
                    <FeaturedCardContentAuthorText>
                        <div>name</div>
                        <FeaturedCardContentPostDate>{post.createdAt} - 6 min read</FeaturedCardContentPostDate>
                    </FeaturedCardContentAuthorText>
                </FeaturedCardContentAurthor>
            </CardContent>
        </Card>
    )

    return (
        <Layout>
            <>
                <Heading><span>Featured</span></Heading>

                <FeaturedCards>
                    {featuredPosts.map((post, i) => {
                        return <FeaturedCardContainer key={`${post.slug}-${i}-key`} post={post} />
                    })}
                </FeaturedCards>
                <Heading><span>All Stories</span></Heading>
                <FeaturedCards>
                    {regularPosts?.map((post, i) => {
                        return <CardContainer key={`${post.slug}-${i}-key`} post={post} />
                    })}
                </FeaturedCards>
            </>
        </Layout>
    )
}

export default Home