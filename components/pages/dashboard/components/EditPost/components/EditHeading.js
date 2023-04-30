import React, { useState } from 'react'
import { doc, updateDoc } from "firebase/firestore"
import { firebaseDb } from 'utils/firebase'
import { LoadingButton } from '@mui/lab'
import { cleanSlug } from 'utils/helpers'
import styled from 'styled-components'

const HeadingInput = styled.input`
    display: block;
    font-size: 2em;
    margin-block-start: 0.67em;
    margin-block-end: 0.67em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
    border: none;
    width: 100%;
`

const Heading = ({ post, host }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [slug, setSlug] = useState(post?.slug || '')

    const [heading, setHeading] = useState(post?.heading || '')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        const slug = cleanSlug(heading)
        setSlug(slug)

        const updatedPost = {
            heading,
            slug
        }

        const draftRef = doc(firebaseDb, `sites/${host}/drafts`, post.id)

        await updateDoc(draftRef, updatedPost)
            .then(() => {
                console.log('after update')
            })
            .catch( e => console.log('there was an error updating this post ', e))

        setIsLoading(false)

    }

    const handleChange = (e) => {
        const newInputVal = e.target.value
        setHeading(newInputVal)
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                Heading: 
                <HeadingInput placeholder='Heading' value={heading} onChange={handleChange} type='text' id='heading' />
                <LoadingButton type='submit' loading={isLoading} loadingIndicator="Loading…" variant="outlined">Update</LoadingButton>
            </div>
            <div>
                Slug: 
                <input value={slug} onChange={() => {}} type="text" name="slug" id="slug" />
            </div>
        </form>
    )
}

export default Heading