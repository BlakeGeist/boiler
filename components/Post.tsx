import React from 'react'
import Link from 'next/link'
import { Card, CardImage, CardContent, CardHeader, FeaturedCard, FeaturedCardImageLink, FeaturedCardContent, FeaturedCardText } from './PostStyles'
import { truncateString } from 'utils/helpers'

export const Post = ({ post }) =>  {
    return (
        <Card>
            <Link href={`/posts/${post.slug}`} legacyBehavior>
                <a><CardImage src={post.mediumImageSrc} /></a>
            </Link>
            <CardContent>
                <div>
                    <div>
                        <CardHeader>
                            <Link href={`/posts/${post.slug}`} legacyBehavior>
                                <a>{post.heading}</a>
                            </Link>
                        </CardHeader>
                        <p>{truncateString(post.shortDescription, 375)}</p>                                
                    </div>
                </div>
            </CardContent>
        </Card>    
    )
}

export const FeaturedPost = ({ post }) => {
    return (
        <FeaturedCard>
            <Link href={`/posts/${post.slug}`} legacyBehavior>
                <FeaturedCardImageLink src={post.mediumImageSrc} />
            </Link>
            <FeaturedCardContent>
                <FeaturedCardText>
                    <h2>
                        <Link href={`/posts/${post.slug}`} legacyBehavior>
                            <a>{post.heading}</a>
                        </Link>
                    </h2>
                    <p>{truncateString(post.shortDescription, 275)}</p>
                </FeaturedCardText>
            </FeaturedCardContent>
        </FeaturedCard>    
    )
}