import React, { useState } from 'react'

const TextArea = ({ name, initalVal }) => {
    const [value, setValue] = useState(initalVal || '')

    const rawInputID = name.toLowerCase()
    const check = chr  => `&\/#, +()$~%.'":*?<>{}`.includes(chr);
    const inputID = [...rawInputID].reduce((s, c) => check(c) ? s+'_' : s + c, '')

    const onChange = (e) => {
        setValue( e.currentTarget.value)
    }

    return (
        <div>
            <label htmlFor={inputID}>{name}</label> <br />
            <textarea onChange={(e) => onChange(e)} id={inputID} name={inputID} value={value} />
            <div>Count: {value.length}</div>
        </div>
    )
} 

export default TextArea