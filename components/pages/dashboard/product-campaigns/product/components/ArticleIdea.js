import React, { useState } from 'react'
import timestamp from 'time-stamp'

const ArticleIdea = ({ articleIdea, i, selectedIdeas, setSelectedIdeas }) => {
    if(!articleIdea.title) return null

    const [isChecked, setIsChecked] = useState(selectedIdeas.filter(item => item.title === articleIdea.title).length > 0)

    const handleInputChange = () => {
        setIsChecked(!isChecked)
        const createdAt = timestamp('YYYY/MM/DD:mm:ss')

        const dis = {
            title: articleIdea.title,
            createdAt: createdAt
        }

        if(!isChecked === true) {
            console.log('is checked')
            return setSelectedIdeas([...selectedIdeas, dis])
        }

        return setSelectedIdeas(selectedIdeas.filter(item => item.title !== articleIdea.title))
    }

    return (
        <div>
            {articleIdea.title}
            <input type='checkbox' name={`article-${i+1}`} onChange={handleInputChange} checked={isChecked} value={isChecked} />
        </div>   
    )
}

export default ArticleIdea