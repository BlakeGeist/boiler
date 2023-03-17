import React, { useState } from 'react'
import { ArticleIdeasCheckBoxContainer } from 'components/Post/ArticleIdeas/styles'

const ArticleIdea = ({ idea }) => {
    const [isChecked, setIsChecked] = useState(false)
    
    const handleCheck = () => {
        setIsChecked(!isChecked)

        if(isChecked) {
            setSelectedIdea()
        } else {
            setSelectedIdea(idea)
        }
    }

    return (
        <li>
            <ArticleIdeasCheckBoxContainer>
                <input type="checkbox" name="idea" defaultChecked={isChecked} onChange={() => handleCheck()} />
                <p>{idea}</p>
            </ArticleIdeasCheckBoxContainer>
        </li>
    )            
}

export default ArticleIdea