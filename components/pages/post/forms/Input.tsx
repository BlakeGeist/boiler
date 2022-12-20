import React, { useState, FC } from 'react'
// @ts-nocheck

interface InputProps {
    name: string,
    initalVal?: string
}

const Input:FC<InputProps> = ({ name, initalVal }) => {
    const [value, setValue] = useState(initalVal || '')

    const rawInputID = name.toLowerCase()
    const check = (chr)  => `&\/#, +()$~%.'":*?<>{}`.includes(chr)
    const inputID = [...rawInputID].reduce((s, c) => check(c) ? s+'_' : s + c, '')

    const onChange = (e) => {
        setValue( e.currentTarget.value)
    }

    return (
        <div>
            <label htmlFor={inputID}>{name}</label> <br />
            <input onChange={(e) => onChange(e)} type="text" id={inputID} name={inputID} value={value} />
            <div>Count: {value.length}</div>
        </div>
    )
}

export default Input