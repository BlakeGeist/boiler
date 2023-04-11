import React from 'react'
import ArticleIdea from './ArticleIdea'
import { ArticleIdeasList } from './styles'

const ArticleIdeas = ({ articleIdeas, setSelectedIdea, setPost, setStep, stepUp }) => {

    const handleSubmit = (e) => {
        e.preventDefault()
        const customIdea = e.target.customIdea.value
        setSelectedIdea(customIdea)
        setPost({ heading: customIdea })
        stepUp()
    }

    return (
        <ArticleIdeasList>
            
            {articleIdeas?.map((idea, index) => ( <ArticleIdea idea={idea} index={index} key={`${idea}`} setSelectedIdea={setSelectedIdea} setPost={setPost} setStep={setStep} /> ))}

            <form onSubmit={handleSubmit}>
                <input type="text" id="customIdea" placeholder="Enter Custom Heading" name="customIdea" />
                <input type="submit" />
            </form>
        </ArticleIdeasList>
    )
}

export default ArticleIdeas