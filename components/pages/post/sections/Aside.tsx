import React from 'react'
import styled from 'styled-components'

const TableOfContentsContainer = styled.div`
    border: 1px solid #ccc;
    margin-bottom: 15px;
    border-radius: 8px;

    position: sticky;
    top: 15px;;    

    h2 {
        font-size: 16px;
        margin: 10px;
    }

    ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    li {
        padding: 0;
        margin: 0;
        &:last-of-type {

            button {
                border-bottom: none;
                border-bottom-left-radius: 8px;
                border-bottom-right-radius: 8px;
            }
        }
    }

    button {
        background: rgb(255 255 255);
        border: none;
        width: 100%;
        margin: 0;
        padding: 10px;
        border-bottom: 1px solid #eee;
        text-align: left;
        cursor: pointer;
        
        &:hover {
            background: rgb(243 243 243);
        }
    }
`

const AsideContainer = styled.div`
    margin: 0 0 0 15px;
    flex: 0 1 200px;
`

const Aside = ({ topRef, summaryRef, articleRef, faqsRef, listicleRef, recentPostsRef }) => {
    const scrollTo = (ref) => {
        if (ref && ref.current /* + other conditions */) {
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }

    return (
        <AsideContainer>
            <TableOfContentsContainer>
                <h2>Table of contents</h2>
                <ul>
                    <li>
                        <button onClick={() => {scrollTo(topRef)}}>Top</button>
                    </li>
                    <li>
                        <button onClick={() => {scrollTo(summaryRef)}}>Summary</button>
                    </li>                                
                    <li>
                        <button onClick={() => {scrollTo(articleRef)}}>Article</button>
                    </li>
                    <li>
                        <button onClick={() => {scrollTo(faqsRef)}}>Faqs</button>
                    </li>
                    <li>
                        <button onClick={() => {scrollTo(listicleRef)}}>Listicle</button>
                    </li>                                
                    <li>
                        <button onClick={() => {scrollTo(recentPostsRef)}}>Recent Posts</button>
                    </li>                                                                                                                             
                </ul>
            </TableOfContentsContainer>  
        </AsideContainer>
    )
}

export default Aside