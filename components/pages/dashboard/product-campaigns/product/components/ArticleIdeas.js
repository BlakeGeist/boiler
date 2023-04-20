import React from 'react'
import ArticleIdea from './ArticleIdea'

const ArticleIdeas = ({ articleIdeas }) => {
    if(!articleIdeas || articleIdeas.length === 0) return null

    return (
        <>
            <h2>Article Ideas</h2>
            {articleIdeas.map((articleIdea) => (
                <ArticleIdea articleIdea={articleIdea} key={`${articleIdea.title}-checkbox`} />
            ))}
        </>        
    )
}

export default ArticleIdeas