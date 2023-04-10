import React from 'react'
import ArticleIdea from 'components/pages/dashbaord/components/ArticleIdeas/ArticleIdea'
import { ArticleIdeasList } from 'components/pages/dashbaord/components/ArticleIdeas/styles'

const ArticleIdeas = ({ articleIdeas, setSelectedIdea, setPost, setStep }) => {
    return (
        <ArticleIdeasList>
            {articleIdeas?.map((idea, index) => ( <ArticleIdea idea={idea} index={index} key={`${idea}`} setSelectedIdea={setSelectedIdea} setPost={setPost} setStep={setStep} /> ))}
        </ArticleIdeasList>
    )
}

export default ArticleIdeas