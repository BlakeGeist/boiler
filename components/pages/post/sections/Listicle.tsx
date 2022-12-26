import React from 'react'

const Listicle = ({ listicleRef, post, listItems}) => {
    if(!listItems) return null
    
    return (
        <>
            <h2 ref={listicleRef}><span>{post.listicleHeading}</span></h2>
            <ul style={{padding: "0", listStyle: "none"}}>
                {listItems.map(item => {
                    return (
                        <li key={item.listItem}>{item.listItem}</li>
                    )
                })}
            </ul>        
        </>
    )
}

export default Listicle