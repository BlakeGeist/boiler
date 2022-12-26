import React, { useRef } from 'react'
import Layout from 'components/Layout'

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

import { PostContainer, Body } from './post.styles'

const Post = ({ post, faqs, html, listItems, recent_posts }) => {
    const topRef = useRef(null)
    const summaryRef = useRef(null)
    const faqsRef = useRef(null)
    const listicleRef = useRef(null)
    const articleRef = useRef(null)
    const quoteRef = useRef(null)
    const recentPostsRef = useRef(null)

    return (
        <Layout>
            <>
                <Header topRef={topRef} heading={post.heading} headerImage={post.headerImage} />
                <PostContainer>
                    <Share />
                    <Body>
                        <Summary summaryRef={summaryRef} summary={post.summary} />
                        <Article articleRef={articleRef} html={html} />
                        <Categories categories={post.categories} />                        
                        <Quote quoteRef={quoteRef} quote={post.quote} />
                        <Faqs faqs={faqs} faqsRef={faqsRef} />
                        <Listicle post={post} listItems={listItems} listicleRef={listicleRef} />                            
                        <RecentPosts recentPostsRef={recentPostsRef} recentPosts={recent_posts} />

                        {
                            // might be cool to make a pros and cons list
                        }
                    </Body>
                    <Aside
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
        </Layout>
    )
}

export default Post