import React from 'react'
import Link from 'next/link'
import { Card, CardImage, CardContent, CardHeader, FeaturedCard, FeaturedCardImageLink, FeaturedCardContent, FeaturedCardText, FeaturedCardContentAurthor, FeaturedCardContentAurthorImage, FeaturedCardContentAuthorText, FeaturedCardContentPostDate } from './PostStyles'
import { truncateString } from 'utils/helpers'

export const Post = ({ post, lang }) =>  {
    return (
        <Card>
            <Link href={`/post/${post.slug}`} legacyBehavior>
                <a><CardImage src={post.mediumImageSrc} /></a>
            </Link>
            <CardContent>
                <div>
                    <div>
                        <CardHeader>
                            <Link href={`/post/${post.slug}`} legacyBehavior>
                                <a>{post.heading[lang]}</a>
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
}
export const FeaturedPost = ({ post, lang }) => {
    return (
    <FeaturedCard>
        <Link href={`/post/${post.slug}`} legacyBehavior>
            <FeaturedCardImageLink src={post.mediumImageSrc} />
        </Link>
        <FeaturedCardContent>
            <FeaturedCardText>
                <h2>
                    <Link href={`/post/${post.slug}`} legacyBehavior>
                        <a>{post.heading[lang]}</a>
                    </Link>
                </h2>
                <p>{truncateString(post.shortDescription, 275)}</p>                                
            </FeaturedCardText>
            <FeaturedCardContentAurthor>
                <FeaturedCardContentAurthorImage />
                <FeaturedCardContentAuthorText>
                    <div>name</div>
                    <FeaturedCardContentPostDate>{post.createdAt} - 6 min read</FeaturedCardContentPostDate>
                </FeaturedCardContentAuthorText>
            </FeaturedCardContentAurthor>
        </FeaturedCardContent>
    </FeaturedCard>    
)
    }