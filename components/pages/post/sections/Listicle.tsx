import React from 'react'

const Listicle = ({ listicleRef, post, listItems, isEditable }) => {
    if(!listItems) return null

    const listicleArray = listItems.map((listItem, i) => {
        return {
            "@type": "ListItem",
            "position": i+1,
            "item": {
              "@type": "listItem",
              "name": listItem.listItem
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
            {isEditable && <button>Regenerate ListItems</button>}
            <h2 ref={listicleRef}><span>{post.listicleHeading}</span></h2>
            <ol >
                {listItems.map(item => {
                    return (
                        <li key={item.listItem}><p>{item.listItem}</p></li>
                    )
                })}
            </ol>
            <script type="application/ld+json" dangerouslySetInnerHTML={createMarkup()} />            
        </>
    )
}

export default Listicle