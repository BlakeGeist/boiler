import React, { useState } from 'react'
import { LoadingButton } from '@mui/lab'
import styled from 'styled-components'
import { createPostFromName } from './createFromProductName'

const CreateAllButtonContainer = styled.div`
    margin-top: 25px;
`

const CreateAllButton = ({ articleIdeas, host }) => {
    const [isLoading, setIsLoading] = useState(false)

    const handleCreateAll = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        for(let i = 0; articleIdeas.length > i; i++) {
            await new Promise(r => setTimeout(r, 750));
            createPostFromName(articleIdeas[i], host)
        }

        setIsLoading(false)

        console.log('create them all, ', articleIdeas)
    }

    return (
        <CreateAllButtonContainer>
            <LoadingButton onClick={handleCreateAll} loading={isLoading} loadingIndicator="Loading…" variant="outlined">Create All</LoadingButton>
        </CreateAllButtonContainer>
    )
}

export default CreateAllButton
