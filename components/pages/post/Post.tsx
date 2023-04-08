import React, { useRef } from 'react'

import Share from 'components/pages/post/sections/Share'
import Aside from 'components/pages/post/sections/Aside'
import Listicle from 'components/pages/post/sections/Listicle'
import Faqs from 'components/pages/post/sections/Faqs'
import Categories from 'components/pages/post/sections/Categories'
import Summary from 'components/pages/post/sections/Summary'
import Article from 'components/pages/post/sections/Article'
import Header from 'components/pages/post/sections/Header'
import RecentPosts from 'components/RecentPosts'
import Quote from 'components/pages/post/sections/Quote'
import Map from 'components/pages/post/sections/Map'

import { PostContainer, Body, QuoteAndAd } from './post.styles'

const Post = ({ post, html, recent_posts, categories, site }) => {
    const topRef = useRef(null)
    const summaryRef = useRef(null)
    const faqsRef = useRef(null)
    const listicleRef = useRef(null)
    const articleRef = useRef(null)
    const quoteRef = useRef(null)
    const recentPostsRef = useRef(null)
    const mapRef = useRef(null)

    
    let splitArticle = post?.articleHtml?.split(/(<p>)/g) || ''

    splitArticle.length > 1 ? splitArticle?.splice(2, 0, `<img src="${post.mediumImageSrc}" />`).join('') : ''

    splitArticle = splitArticle.length > 1 ? splitArticle.join('') : ''

    console.log(splitArticle, 'here2')

    return (
        <>
            <Header topRef={topRef} heading={post.heading} headerImageSrc={post.headerImageSrc} />
            <PostContainer>
                <Share />
                <Body>
                    <Summary summaryRef={summaryRef} summary={post.summary} />
                    {site.headerAd &&
                        <div dangerouslySetInnerHTML={{ __html: site.headerAd }} />
                    }
                    <Article articleRef={articleRef} html={splitArticle} />
                    <Categories categories={categories} />
                    <QuoteAndAd>
                        <Quote quoteRef={quoteRef} quote={post.quote} />
                        {site.bodyAd &&
                            <div dangerouslySetInnerHTML={{ __html: site.bodyAd }} />
                        }
                    </QuoteAndAd>
                    <Faqs faqs={post.faqs} faqsRef={faqsRef} />
                    <Listicle post={post} listicleRef={listicleRef} />
                    <RecentPosts recentPostsRef={recentPostsRef} recentPosts={recent_posts} />
                    <Map mapSrc={post.map} mapRef={mapRef} />

                    {
                        // might be cool to make a pros and cons list
                        // might be cool to add a guide type
                    }
                </Body>
                <Aside
                    sidebarAd={site.sidebarAd}
                    topRef={topRef}
                    summaryRef={summaryRef}
                    articleRef={articleRef}
                    faqsRef={faqsRef}
                    listicleRef={listicleRef}
                    quoteRef={quoteRef}
                    recentPostsRef={recentPostsRef}
                />
            </PostContainer>
        </>
    )
}

export default Post