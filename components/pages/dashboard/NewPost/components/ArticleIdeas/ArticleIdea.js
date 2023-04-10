import React, { useState } from 'react'
import { ArticleIdeasCheckBoxContainer } from './styles'

const ArticleIdea = ({ idea, index, setSelectedIdea, setPost, setStep }) => {
    const [isChecked, setIsChecked] = useState(false)
    const ideaId = `idea-${index}`

    const handleCheck = () => {
        setIsChecked(!isChecked)

        if(isChecked) {
            setSelectedIdea()
        } else {
            setSelectedIdea(idea)
            setPost({ heading: idea })
            setStep(3)
        }
    }

    return (
        <li>
            <ArticleIdeasCheckBoxContainer>
                <input type="checkbox" name={ideaId} id={ideaId} defaultChecked={isChecked} onChange={() => handleCheck()} />
                <label htmlFor={ideaId}>{idea}</label>
            </ArticleIdeasCheckBoxContainer>
        </li>
    )            
}

export default ArticleIdea