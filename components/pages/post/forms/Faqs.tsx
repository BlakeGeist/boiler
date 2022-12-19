import React from 'react'

const Faqs = ({ faq }) => {
    const onFaqSubmit = (e) => {
        e.preventDefault()
        console.log(e.target.question.value)
        console.log(e.target.answer.value)
    
        //add the faq as a sub collection
    }

    return (
        <form onSubmit={(e) => onFaqSubmit(e)}>
            <input type="text" name="question"  />
            <input type="text" name="answer"  />
            <input type="submit" />
        </form>
    )
}

export default Faqs