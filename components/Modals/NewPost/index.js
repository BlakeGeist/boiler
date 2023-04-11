import React, { useState } from 'react'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import DateTimePicker from 'react-datetime-picker'
import styled from 'styled-components'
import axios from 'axios'
import ArticleIdeas from 'components/pages/dashboard/new/components/ArticleIdeas'
import GetArticleIdeas from './components/GetArticleIdeas'
import PostMain from 'components/pages/posts/post/Main'
import Image from './components/Image'

const ModalBody = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    background-color: #fff;
    border: 2px solid #000;
    boxShadow: 24;
    padding: 10px;
    border-radius: 8px;
`

const Schedule = ({ onChange, value }) => {
    return (
        <DateTimePicker onChange={onChange} value={value} />
    )
}

const NewPostModal = ( { host, open, handleClose }) => {
    //const [isLoading, setIsLoading] = useState(false)
    const [step, setStep] = useState(1)
    const [value, onChange] = useState(new Date())
    const [articleIdeas, setArticleIdeas] = useState([])
    const [selectedIdea, setSelectedIdea] = useState('')
    const [post, setPost] = useState({})

    const handleClosePostModal = () => {
        handleClose()
        setPost({})
        setStep(1)
    }

    const [stepHeading, setStepHeading] = useState('Get Article Ideas')

    const stepUp = () => setStep(step+1)
    const stepDown = () => {
        if(step > 1) return setStep(step-1)
    }

    const handleStepUp = (e) => {
        e.preventDefault()
        stepUp()
    }

    const handleStepDown = (e) => {
        e.preventDefault()
        stepDown()
    }

    const handleGetArticleIdeas = async (e) => {
        e.preventDefault()
        const promptText = e.target.getArticleIdeas.value
        //setIsLoading(true)

        const params = {
            host,
            prompt: promptText
        }

        await axios.get('/api/getArticleIdeas', { params })
            .then((res) => {
                setArticleIdeas(res.data)
                stepUp()
            })
            .catch(e => console.log('error:, ', e))
    }

    const ModalBodyContent = () => {
        switch(step) {
            case 1:
                 return <GetArticleIdeas handleGetArticleIdeas={handleGetArticleIdeas} />
            case 2:
                setStepHeading('Select Article Heading')
                return <ArticleIdeas stepUp={stepUp} articleIdeas={articleIdeas} setSelectedIdea={setSelectedIdea} setPost={setPost} setStep={setStep} />
            case 3: 
                return <Image />
            case 4: 
                setStepHeading('View Post')
                return <PostMain 
                            post={post}
                        />
            case 5:
                setStepHeading('View Faqs')
                return (<div>Faws</div>)
            case 6:
                setStepHeading('View Listicle')
                return (<div>Faws</div>)                
            case 7: 
                setStepHeading('Schedule Post')
                return <Schedule onChange={onChange} value={value} />
            default:
                return null
          }
    }

    return (
        <Modal
            open={open}
            onClose={handleClosePostModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <ModalBody>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {stepHeading}
                    </Typography>

                    <h2>{selectedIdea}</h2>

                    <ModalBodyContent />                    

                    <button onClick={handleStepDown}>Back</button>
                    <button onClick={handleStepUp}>Forward</button>

                    

                </ModalBody>
        </Modal>    
    )
}

export default NewPostModal