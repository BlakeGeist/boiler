import React from 'react'

import ArticleIdea from './ArticleIdea'

const ArticleIdeas = ({ setSchedule, articleIdeas, handleAddTitleToProductCampagin, setSelectedIdeas, selectedIdeas }) => {
    if(!articleIdeas || articleIdeas.length === 0) return null

    return (
        <>
            <h2>Article Ideas</h2>
            <form onSubmit={handleAddTitleToProductCampagin}>
                
                {articleIdeas.map((articleIdea, i) => (
                    <ArticleIdea setSchedule={setSchedule} articleIdea={articleIdea} key={`${articleIdea.title}-checkbox`} i={i} setSelectedIdeas={setSelectedIdeas} selectedIdeas={selectedIdeas} />
                ))}
                <input type="submit" />
            </form>
        </>        
    )
}

export default ArticleIdeas