import React from 'react'
import Accordion from 'components/Accordion'
import axios from 'axios'

const Faqs = ({ faqsRef, faqs, promptText, setFaqs, host, slug }) => {
    if(!faqs || faqs.length === 0) return null

    const faqsArray = faqs?.map((faq) => {
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

    const regenFaqs = async (e) => {
        e.preventDefault()

        const faqsRes = await axios.get('/api/addFaqsToPost', { params: {
            prompt: promptText,
            host,
            slug
        } })

        console.log(faqsRes)

        setFaqs([...faqs, faqsRes.data])
    }

    return (
        <>
            <button onClick={e => regenFaqs(e)}>Regenerate Faqs</button>
            <h2 id="faqs" ref={faqsRef}><span>FAQS</span></h2>
            <Accordion faqs={faqs} /> 
            <script type="application/ld+json" dangerouslySetInnerHTML={createMarkup()} />
        </>
    )
}

export default Faqs