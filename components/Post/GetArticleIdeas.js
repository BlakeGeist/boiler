import React from 'react'
import styled from 'styled-components'
import { LoadingButton } from '@mui/lab'
import axios from 'axios'

const GetArticleIdeasForm = styled.form`
    max-width: 300px;

    input {
        min-height: 34px;
        width: 100%;        
    }

    button {
        width: 100%;
        margin-top: 20px;
    }
`

const GetArticleIdeas = ({ loading, setLoading, host, setStep, setArticleIdeas }) => {
    const getArticleIdeas = async (e) => {
        e.preventDefault()
        const promptText = e.target.prompt.value
        setLoading(true)

        const params = {
            host,
            prompt: promptText
        }

        await axios.get('/api/getArticleIdeas', { params })
            .then((res) => {
                setStep(2)
                setLoading(false)
                setArticleIdeas(res.data)
            })
            .catch(e => console.log(e))

    }

    return (
        <div>
            <GetArticleIdeasForm onSubmit={getArticleIdeas}>
                <div>
                    <p>Enter a topic and get article ideas</p>
                    <input type="input" name="prompt" />                                
                </div>
                <LoadingButton type="submit" loading={loading} loadingIndicator="Loading..." variant="outlined">
                    Get Article Ideas
                </LoadingButton>
            </GetArticleIdeasForm>
        </div>
    )
}

export default GetArticleIdeas