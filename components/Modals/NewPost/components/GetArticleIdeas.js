import React from 'react'
import styled from 'styled-components'
import { Input, Button } from '@mui/material'

const Form = styled.form`
    .MuiInput-root {
        background-color: #f1f1f1;
    }

    .MuiInputBase-root {
        width: 100%;
    }

    margin-bottom: 25px;
`

const GetArticleIdeas = ({ handleGetArticleIdeas }) => {
    return (
        <Form onSubmit={handleGetArticleIdeas}>
            <Input width='100%' type="text" placeholder="Enter a topic and get article ideas" id="getArticleIdeas" required name="getArticleIdeas" />
            <Button type="submit">Submit</Button>
        </Form>
    )
}

export default GetArticleIdeas