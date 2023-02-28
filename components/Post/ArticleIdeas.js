import React, { useState} from 'react'
import styled from 'styled-components'



const IdeaChockboxContainer = styled.div`
    display: flex;
`



const ArticleIdeas = ({ articleIdeas, setSelectedIdea }) => {

    const Idea = ({ idea }) => {
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
                <IdeaChockboxContainer>
                    <input type="checkbox" name="idea" defaultChecked={isChecked} onChange={() => handleCheck()} />
                    <p>{idea}</p>
                </IdeaChockboxContainer>
            </li>
        )            
    }

    return (
        <>
            <h2>Select an Article and describe the images</h2>
            <ul style={{listStyle: 'none', padding: '0'}}>
                {articleIdeas?.map((idea) => {                    
                    return ( <Idea idea={idea} key={`${idea}`} /> )
                })}
            </ul>
        </>        
    )
}

export default ArticleIdeas