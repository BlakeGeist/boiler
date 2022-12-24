import React from 'react'
import Layout from 'components/Layout'
import styled from 'styled-components'
import Link from 'next/link'

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
    flex: 1 0 33%;
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
`

const CardContent = styled.div`
    padding: 0 1.25rem 1.25rem;
`

const Home = ({ posts }) => {

    const daPosts = posts

    const featuredPosts = daPosts.slice(0, 4)

    const regularPosts = posts.slice(4, posts.length)

    const truncateString = (str, num) => {
        // If the length of str is less than or equal to num
        // just return str--don't truncate it.

        if(!str) return null

        if (str.length <= num) {
          return str
        }
        // Return str truncated with '...' concatenated to the end of str.
        return str.slice(0, num) + '...'
      }

      const FeaturedCardContainer = ({ post }) => (
        <FeaturedCard>
            <Link href={`/posts/${post.slug}`}>
                <FeaturedCardImageLink src={post.mediumImageSrc} />
            </Link>
            <FeaturedCardContent>
                <FeaturedCardText>
                    <h2>
                        <Link href={`/posts/${post.slug}`}>
                            <a>{post.heading}</a>
                        </Link>
                    </h2>
                    <p>{truncateString(post.shortDescription, 75)}</p>                                
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
            <Link href={`/posts/${post.slug}`}>
                <a><CardImage src={post.mediumImageSrc} /></a>
            </Link>
            <CardContent>
                <div>
                    <div>
                        <h2>
                            <Link href={`/posts/${post.slug}`}>
                                <a>{post.heading}</a>
                            </Link>
                        </h2>
                        <p>{truncateString(post.shortDescription, 75)}</p>                                
                    </div>
                </div>
                <FeaturedCardContentAurthor>
                    <FeaturedCardContentAurthorImage />
                    <FeaturedCardContentAuthorText>
                        <div>name</div>
                        <FeaturedCardContentPostDate>22 July 2045 - 6 min read</FeaturedCardContentPostDate>
                    </FeaturedCardContentAuthorText>
                </FeaturedCardContentAurthor>
            </CardContent>
        </Card>
    )

    return (
        <Layout>
            <>
                <h1>Site heading 1</h1>

                <FeaturedCards>
                    {featuredPosts.map((post, i) => {
                        return <FeaturedCardContainer key={`${post.slug}-${i}-key`} post={post} />
                    })}
                </FeaturedCards>
                <h2>All Stories</h2>
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