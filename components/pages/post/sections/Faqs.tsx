import React from 'react'
import Accordion from 'components/Accordion'

const Faqs = ({ faqsRef, faqs }) => {
    if(faqs.length === 0) return null
    
    const faqsArray = faqs.map((faq) => {
        return {
            "@type":"Question",
            "name": faq.question,
            "acceptedAnswer":{
               "@type":"Answer",
               "text": faq.answer
            }
        }})

    const faqsSchema = {
        "@context":"https://schema.org",
        "@type":"FAQPage",
        "mainEntity":[ faqsArray ]
    }

    function createMarkup() {
        return {__html: JSON.stringify(faqsSchema) }
    }

    return (
        <>
            <h2 id="faqs" ref={faqsRef}><span>FAQS</span></h2>
            <Accordion faqs={faqs} /> 
            <script type="application/ld+json" dangerouslySetInnerHTML={createMarkup()} />
        </>
    )
}

export default Faqs