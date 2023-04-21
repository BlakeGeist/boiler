import React from 'react'
import ArticleIdea from './ArticleIdea'
import { doc, updateDoc } from "firebase/firestore"
import { firebaseDb } from 'utils/firebase'

const ArticleIdeas = ({ setArticleIdeas, product, articleIdeas, host, lang }) => {
    if(!articleIdeas || articleIdeas.length === 0) return null

    const handleDeleteArticle = async (articleIdea, e) => {
        e.preventDefault()

        const newArticleIdeasArray = articleIdeas.filter(idea => idea.title !== articleIdea.title)
        const updatedProductCampaign = {
            articleIdeasArray: newArticleIdeasArray
        }
        const productCampaginRef = doc(firebaseDb, `sites/${host}/productCampaigns`, product.slug)

        await updateDoc(productCampaginRef, updatedProductCampaign)

        setArticleIdeas(newArticleIdeasArray)
    }

    return (
        <>
            <h2>Article Ideas</h2>
            {articleIdeas.map((articleIdea) => (
                <ArticleIdea handleDeleteArticle={handleDeleteArticle} articleIdea={articleIdea} key={`${articleIdea.title}-checkbox`} host={host} lang={lang} />
            ))}
        </>        
    )
}

export default ArticleIdeas