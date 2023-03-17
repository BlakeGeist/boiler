import React from 'react'
import ArticleIdea from 'components/Post/ArticleIdeas/ArticleIdea'
import { ArticleIdeasList } from 'components/Post/ArticleIdeas/styles'

const ArticleIdeas = ({ articleIdeas, setSelectedIdea }) => {

    return (
        <>
            <h2>Select an Article and describe the images</h2>
            <ArticleIdeasList>
                {articleIdeas?.map((idea) => {                    
                    return ( <ArticleIdea idea={idea} key={`${idea}`} /> )
                })}
            </ArticleIdeasList>
        </>        
    )
}

export default ArticleIdeas