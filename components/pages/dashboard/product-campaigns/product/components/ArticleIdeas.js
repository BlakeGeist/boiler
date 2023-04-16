import React, { useState } from 'react'
import timestamp from 'time-stamp'

import ArticleIdea from './ArticleIdea'

const ArticleIdeas = ({ setSchedule, articleIdeas, handleAddTitleToProductCampagin, setSelectedIdeas, selectedIdeas }) => {
    if(!articleIdeas || articleIdeas.length === 0) return null

    const [allSelected, setAllSelected] = useState(articleIdeas.length === selectedIdeas.length)

    const handleSelectAllToggle = () => {
        setAllSelected(!allSelected)

        if(allSelected) {
            return setSelectedIdeas([])
        }

        const newSelectedIdeas = articleIdeas.map(idea => {
            const createdAt = timestamp('YYYY/MM/DD:mm:ss')

            return {
                title: idea.title,
                createdAt: createdAt
            }
        })

        console.log(newSelectedIdeas)

        setSelectedIdeas(newSelectedIdeas)
    }

    return (
        <>
            <h2>Article Ideas</h2>
            <form onSubmit={handleAddTitleToProductCampagin}>
                
                {articleIdeas.map((articleIdea, i) => (
                    <ArticleIdea setSchedule={setSchedule} articleIdea={articleIdea} key={`${articleIdea.title}-checkbox`} i={i} setSelectedIdeas={setSelectedIdeas} selectedIdeas={selectedIdeas} />
                ))}

                <div>
                    <label htmlFor="selectAll">Select All</label>
                    <input type='checkbox' name={`selectAll`}  id='selectAll' onChange={handleSelectAllToggle} checked={allSelected} value={allSelected} />
                </div>
                <input type="submit" />
            </form>
        </>        
    )
}

export default ArticleIdeas