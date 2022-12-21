import React, { useState } from 'react'
import { addDoc, collection } from "firebase/firestore" 
import { firebaseDb } from 'utils/firebase'

const Faqs = ({ faq, postSlug, host }) => {

    const [faqData, setFaqData] = useState({
        question: faq.question || '',
        answer: faq.answer || ''
    })

    const onFaqSubmit = async (e) => {
        e.preventDefault()
    
        //TODO add an update FAQ feature

        //add the faq as a sub collection
        addDoc(
            collection(firebaseDb, "sites", host, "posts", postSlug, "faqs"),
            faqData
        )
    }

    const onChange = (e) => {
        const v = e.currentTarget.value
        setFaqData({
            ...faqData,
            [e.currentTarget.name]: v
        })
    } 

    return (
        <form onSubmit={(e) => onFaqSubmit(e)}>
            <input type="text" onChange={(e) => onChange(e)} name="question" value={faq.question} />
            <input type="text" onChange={(e) => onChange(e)} name="answer" value={faq.answer} />
            <input type="submit" />
        </form>
    )
}

export default Faqs