import React from 'react'
import IconButton from '@mui/material/IconButton'
import TwitterIcon from '@mui/icons-material/Twitter'
import FacebookIcon from '@mui/icons-material/Facebook'
import styled from 'styled-components'

const ShareContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 15px;
`

const Share = () => {
    return (
        <ShareContainer>
            <div>Share</div>
            <IconButton aria-label="delete">
                <TwitterIcon />
            </IconButton>
            <IconButton aria-label="delete">
                <FacebookIcon />
            </IconButton>
        </ShareContainer>
    )
}

export default Share