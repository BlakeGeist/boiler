import React, { useState } from 'react'
import Layout from 'components/Layout'
import { getDocFromPathAndSlug } from 'utils/firebase'
import Link from 'next/link'
import { localEnPostsIndex } from 'utils/searchClient'

const Index = ({ site }) => {

    const [posts, setPosts] = useState([])
    const [inputVal, setInputVal] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault()

        await localEnPostsIndex.search(inputVal).then(async ({ hits }) => {
            const postsResp = await Promise.all(hits.map(async (hit) => {
                const post = await getDocFromPathAndSlug('sites/localhost:3000/langs/en/posts/', hit.objectID)
                return post
            }))
            console.log(postsResp)
            setPosts(postsResp)
        });
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
        <Layout site={site}>
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
                                    <Link href={`/post/${post.slug}`}>
                                        {post.heading}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            }

        </Layout>
    )
}

export const getServerSideProps = async ({ req, locale }) => {
    const host = req.headers.host
    const site = await getDocFromPathAndSlug("sites", host)

    return { props: { site } }
  }

export default Index