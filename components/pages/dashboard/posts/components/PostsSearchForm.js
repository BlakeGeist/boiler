import React, { useState } from 'react'
import SearchForm from 'components/Forms/SearchForm'
import { localEnPostsIndex } from 'utils/searchClient'
import { getDocFromPathAndSlug } from 'utils/firebase'

const PostsSearchForm = ({ setPosts, initialPosts }) => {
    const [inputVal, setInputVal] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault()

        await localEnPostsIndex.search(inputVal).then(async ({ hits }) => {
            const postsResp = await Promise.all(hits.map(async (hit) => {
                const post = await getDocFromPathAndSlug('sites/localhost:3000/langs/en/posts/', hit.objectID)
                return post
            }))
            setPosts(postsResp)
        })
    }   

    const handleClearForm = (e) => {
        e.preventDefault()
        setInputVal('')
        setPosts(initialPosts)
    }

    const handleInputChange = (e) => {
        const newVal = e.target.value
        setInputVal(newVal)
    }

    return <SearchForm 
                inputVal={inputVal}
                onSubmit={onSubmit}
                handleClearForm={handleClearForm}
                handleInputChange={handleInputChange}
            />
}

export default PostsSearchForm