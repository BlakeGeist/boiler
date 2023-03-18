import React from 'react'
import ArticleIdea from 'components/Post/ArticleIdeas/ArticleIdea'
import { ArticleIdeasList } from 'components/Post/ArticleIdeas/styles'

const ArticleIdeas = ({ articleIdeas, setSelectedIdea, setPost, setStep }) => {
    return (
        <ArticleIdeasList>
            {articleIdeas?.map((idea, index) => ( <ArticleIdea idea={idea} index={index} key={`${idea}`} setSelectedIdea={setSelectedIdea} setPost={setPost} setStep={setStep} /> ))}
        </ArticleIdeasList>
    )
}

export default ArticleIdeas