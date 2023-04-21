import React, { useState, useEffect } from 'react'
import { localEnPostsIndex } from 'utils/searchClient'
import styled from 'styled-components'
import Link from 'next/link'
import { doc, updateDoc } from "firebase/firestore"
import { firebaseDb } from 'utils/firebase'
import { getDocFromPathAndSlug } from 'utils/firebase'

import { EditorState, ContentState, convertToRaw } from 'draft-js'
import { stateToHTML } from "draft-js-export-html"
import { convertFromRaw } from 'draft-js'

let htmlToDraft = null

const HightlightedResult = styled.p`
    em {
        background-color: #ffe781;
    }
`
const Keyword = ({ locale, keyword }) => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        htmlToDraft = require('html-to-draftjs').default
      }, [])

    const searchPostsForKeyPhrase = async (e) => {
        e.preventDefault()

        await localEnPostsIndex.search(keyword.keyphrase).then(async ({ hits }) => {
            const postsResp = await Promise.all(hits.map(async (hit) => {
                const post = await getDocFromPathAndSlug('sites/localhost:3000/langs/en/posts/', hit.objectID)
                post._highlightResult = hit._highlightResult.rawArticleResponse.value
                
                return post
            }))
            setPosts(postsResp)
        })

    }
    
    const handleAutoLink = async (post, e) => {
        e.preventDefault()

        const link = `<a href="${keyword.link}">${keyword.keyphrase}</a>`      

        const article = JSON.parse(post?.article)
        const html = stateToHTML(convertFromRaw(article))
        const updatedHtml = html.replace(keyword.keyphrase, link)
        
        const blocksFromHtml = htmlToDraft(updatedHtml)
        const { contentBlocks, entityMap } = blocksFromHtml
        const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap)
        const editorState = EditorState.createWithContent(contentState)

        const contentFromText = editorState.getCurrentContent()

        const articleContent =  JSON.stringify(convertToRaw(contentFromText))   

        const updatedPost = {
            article: articleContent,
            articleHtml: updatedHtml
        }

        const siteRef = doc(firebaseDb, `sites/localhost:3000/langs/${locale}/posts`, post.slug)

        await updateDoc(siteRef, updatedPost)

    }


    return (
        <>
            <h1>{keyword.keyphrase}</h1>

            <button onClick={searchPostsForKeyPhrase}>Search for posts with keyphrase</button>

            {posts.length > 0 &&
                <>
                    <hr />
                    {posts.map(post => {
                        return (
                            <div key={post.heading}>
                                <h2>
                                    <Link href={`/posts/${post.slug}`}>
                                        {post.heading}
                                    </Link>
                                </h2>
                                <HightlightedResult dangerouslySetInnerHTML={{ __html: post._highlightResult }} />
                                <button onClick={e => handleAutoLink(post, e)}>Auto Link</button>
                            </div>
                        )
                    })}
                </>
            }
        </>
    )
}

export default Keyword