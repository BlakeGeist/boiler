import React, { useRef } from 'react'

import Share from 'components/pages/posts/post/components/Share'
import Aside from 'components/pages/posts/post/components/Aside'
import Listicle from 'components/pages/posts/post/components/Listicle'
import Faqs from 'components/pages/posts/post/components/Faqs'
import Categories from 'components/pages/posts/post/components/Categories'
import Summary from 'components/pages/posts/post/components/Summary'
import Article from 'components/pages/posts/post/components/Article'
import Header from 'components/pages/posts/post/components/Header'
import Heading from 'components/pages/posts/post/components/Heading'
import RecentPosts from 'components/RecentPosts'
import Quote from 'components/pages/posts/post/components/Quote'
import Map from 'components/pages/posts/post/components/Map'
import { useRouter } from 'next/router'
import { PostContainer, Body, QuoteAndAd } from './post.styles'
import Head from 'next/head'

const Post = ({ post, recent_posts, categories, site, lang, host }) => {

    if(!post.heading) return null

    console.log(post.slugs)

    const topRef = useRef(null)
    const summaryRef = useRef(null)
    const faqsRef = useRef(null)
    const listicleRef = useRef(null)
    const articleRef = useRef(null)
    const quoteRef = useRef(null)
    const recentPostsRef = useRef(null)
    const mapRef = useRef(null)
    
    let splitArticle = post?.articleHtml
    //this is hacky, but its how the medium image is injected part way into the post
    if(post.mediumImageSrc && post.mediumImageSrc.length > 0) {
        splitArticle = post?.articleHtml?.split(/(<p>)/g) || ''

        splitArticle.length > 1 ? splitArticle?.splice(2, 0, `<img src="${post.mediumImageSrc}" />`).join('') : ''

        splitArticle = splitArticle.length > 1 ? splitArticle.join('') : ''
    }

    const router = useRouter()

    const handleChange = (e) => {
        const newLang = e.target.value
        const toUrl = post.slugs.filter(s => {
            return s.lang === newLang
        })[0]
        
        let redTo = `/${newLang}/posts/${toUrl.slug}`

        if(newLang === 'en') {
            redTo = `/posts/${toUrl.slug}`
        }

        router.push(redTo, redTo, { locale: newLang })
    }

    return (
        <>
            <Head>
                {post.isTranslated &&
                    post.slugs.map(slug => {
                        console.log(slug)
                        return (
                            <link key={slug.name} rel="alternate" hrefLang={slug.lang} href={`https://${host}/${slug.lang}/posts/${slug.slug}`} />
                        )
                    })

                }
            </Head>
            <Header topRef={topRef} headerImageSrc={post.headerImageSrc} />
            <Heading heading={post.heading} />
            <PostContainer>
                <Share />
                <Body>
                    <Summary summaryRef={summaryRef} summary={post.summary} />
                    {site?.headerAd &&
                        <div dangerouslySetInnerHTML={{ __html: site.headerAd }} />
                    }
                    <Article articleRef={articleRef} html={splitArticle} />
                    <Categories categories={categories} />
                    <QuoteAndAd>
                        <Quote quoteRef={quoteRef} quote={post.quote} />
                        {site?.bodyAd &&
                            <div dangerouslySetInnerHTML={{ __html: site.bodyAd }} />
                        }
                    </QuoteAndAd>
                    <Faqs faqs={post.faqs} faqsRef={faqsRef} />
                    <Listicle post={post} listicleRef={listicleRef} />
                    <RecentPosts recentPostsRef={recentPostsRef} recentPosts={recent_posts} />
                    <Map mapSrc={post.map} mapRef={mapRef} />
                    {post?.slugs &&
                        <select defaultValue={lang} onChange={e => handleChange(e)}>
                            {post?.slugs.map(slug => {
                                return (
                                    <option key={slug.lang} value={slug.lang}>{slug.name}</option>
                                )
                            })}
                        </select>                    
                    }

                    {
                        // might be cool to make a pros and cons list
                        // might be cool to add a guide type
                    }
                </Body>
                <Aside
                    sidebarAd={site?.sidebarAd}
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