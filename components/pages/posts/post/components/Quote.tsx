import React from 'react'

const Quote = ({ quoteRef, quote }) => (
    <blockquote ref={quoteRef}>{quote}</blockquote>
)

export default Quote