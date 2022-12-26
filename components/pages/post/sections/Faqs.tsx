import React from 'react'
import Accordion from 'components/Accordion'

const Faqs = ({ faqsRef, faqs }) => {
    if(!faqs) return null
    
    return (
        <>
            <h2 id="faqs" ref={faqsRef}><span>FAQS</span></h2>
            <Accordion faqs={faqs} /> 
        </>
    )
}

export default Faqs