import React, { useState } from 'react'
import PostsTable from './components/PostsTable'
import PostsSearchForm from './components/PostsSearchForm'
import styled from 'styled-components'
import { LoadingButton } from '@mui/lab'
import { collection, getDocs, limit, query, orderBy, startAfter, where } from "firebase/firestore"
import moment from 'moment'
import { firebaseDb } from 'utils/firebase'

const LoadingButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 25px;
`

const DashboardPostsMain = ({ posts: initialPosts, host, lang }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [posts, setPosts] = useState(initialPosts)
    const [showLoadMore, setShowLoadMore] = useState(true)
    const [lastVisible, setLastVisible] = useState(null)
    const currentTime = moment().format('YYYY/MM/DD:HH:mm:ss').toString()

    const loadMorePosts = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        const postsPath = `sites/${host}/langs/${lang}/posts`
        const next = query(collection(firebaseDb, postsPath),
            where("publishedDate", "<", currentTime),
            orderBy('publishedDate', "desc"),
            startAfter(lastVisible),
            limit(50))
    
        const morePostsSnap = await getDocs(next)
        const morePosts = morePostsSnap.docs.map(doc => doc.data())

        if(morePosts.length < 50) setShowLoadMore(false)

        setLastVisible(morePostsSnap.docs[morePostsSnap.docs.length-1])
        setPosts(posts.concat(morePosts))
        setIsLoading(false)
    }

    return (
        <>
            <h1>Dashboard - Posts</h1>
            <PostsSearchForm setPosts={setPosts} initialPosts={initialPosts} />
            <hr />
            <PostsTable setPosts={setPosts} posts={posts} host={host} lang={lang} />

            {showLoadMore &&
                <LoadingButtonContainer>
                    <LoadingButton onClick={loadMorePosts} loading={isLoading} loadingIndicator="Loading…" variant="outlined">
                        Load More
                    </LoadingButton>
                </LoadingButtonContainer>                
            }
        </>
    )
}

export default DashboardPostsMain