import React from 'react'

const Listicle = ({ listicleRef, post, listItems}) => {
    if(!listItems) return null

    return (
        <>
            <h2 ref={listicleRef}><span>{post.listicleHeading}</span></h2>
            <ol >
                {listItems.map(item => {
                    return (
                        <li key={item.listItem}><p>{item.listItem}</p></li>
                    )
                })}
            </ol>        
        </>
    )
}

export default Listicle