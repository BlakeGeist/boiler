import React, { useState } from 'react'
import { getDocFromPathAndSlug } from 'utils/firebase'
import Link from 'next/link'
import { petTipsNTricksPostsIndex } from 'utils/searchClient'

const Search = ({ host, lang }) => {
    const [posts, setPosts] = useState([])
    const [inputVal, setInputVal] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault()

        await petTipsNTricksPostsIndex.search(inputVal).then(async ({ hits }) => {
            const postsResp = await Promise.all(hits.map(async (hit) => {
                const post = await getDocFromPathAndSlug(`sites/${host}/langs/${lang}/posts/`, hit.objectID)
                return post
            }))
            setPosts(postsResp)
        })
    }

    const handleInputChange = (e) => {
        const newVal = e.target.value
        setInputVal(newVal)
    }

    const handleClearForm = (e) => {
        e.preventDefault()
        setInputVal('')
        setPosts('')
    }

    return (
        <>
            <h1>Search</h1>

            <form onSubmit={onSubmit}>
                <input type="text" onChange={handleInputChange} value={inputVal} name="searchTerm" id="searchterm" />
                <input type="submit" />
                <button onClick={handleClearForm}>Clear</button>
            </form>

            {posts.length > 0 &&
                <div>
                    <h2>Results:</h2>
                    <ul>
                        {posts.map(post => {
                            return (
                                <li key={post.heading}>
                                    <Link href={`/posts/${post.slug}`}>
                                        {post.heading}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            }
        </>
    )
}

export default Search