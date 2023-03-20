import React from 'react'

const Listicle = ({ listicleRef, post }) => {
    if(!post?.listicleItems || post.listicleItems.length === 0) return null

    const listicleArray = post.listicleItems.map((listicleItem, i) => {
        return {
            "@type": "ListItem",
            "position": i+1,
            "item": {
              "@type": "listItem",
              "name": listicleItem
            }
          }
        })

    const listicleSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": post.listicleHeading,
        "description": post.listicleDescription,
        "itemListElement": listicleArray
    }

    function createMarkup() {
        return {__html: JSON.stringify(listicleSchema) }
    }

    return (
        <>
            <h2 ref={listicleRef}><span>{post.listicleHeading}</span></h2>
            <ol >
                {post.listicleItems.map((listicleItem, i) => {
                    return (
                        <li key={`${listicleItem}-${i}`}><p>{listicleItem}</p></li>
                    )
                })}
            </ol>
            <script type="application/ld+json" dangerouslySetInnerHTML={createMarkup()} />            
        </>
    )
}

export default Listicle