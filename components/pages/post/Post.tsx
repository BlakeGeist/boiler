import React, { useRef } from 'react'
import { doc, deleteDoc } from "firebase/firestore"
import { firebaseDb } from 'utils/firebase'
import { useRouter } from "next/router"

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

import { PostContainer, Body } from './post.styles'

const Post = ({ host, post, faqs, html, listItems, recent_posts, categories, promptText, setFaqs, isEditable = false }) => {
    const topRef = useRef(null)
    const summaryRef = useRef(null)
    const faqsRef = useRef(null)
    const listicleRef = useRef(null)
    const articleRef = useRef(null)
    const quoteRef = useRef(null)
    const recentPostsRef = useRef(null)
    const mapRef = useRef(null)
    const router = useRouter()

    const deletePost = async (e) => {
        e.preventDefault()

        await deleteDoc(doc(firebaseDb, "sites", host, "posts", post.slug))
            .then(() => {
                router.push(`/dashboard/${host}`)
            })
            .catch(e => console.log(e))
    }

    return (
            <>
                <button onClick={(e) => deletePost(e)}>Delete</button>
                <Header topRef={topRef} heading={post.heading} headerImageSrc={post.headerImageSrc} />
                <PostContainer>
                    <Share />
                    <Body>
                        <Summary summaryRef={summaryRef} summary={post.summary} isEditable={isEditable} />
                        <Article articleRef={articleRef} html={html} />
                        <Categories categories={categories} isEditable={isEditable} />                   
                        <Quote quoteRef={quoteRef} quote={post.quote} />
                        <Faqs faqs={faqs} faqsRef={faqsRef} promptText={promptText} setFaqs={setFaqs} slug={post.slug} host={host} isEditable={isEditable} />
                        <Listicle post={post} listItems={listItems} listicleRef={listicleRef} isEditable={isEditable} />                  
                        <RecentPosts recentPostsRef={recentPostsRef} recentPosts={recent_posts} />
                        <Map mapSrc={post.map} mapRef={mapRef} />

                        {
                            // might be cool to make a pros and cons list
                            // might be cool to add a guide type
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
    )
}

export default Post