import React, { FC, FormEventHandler } from 'react'

interface FormProps {
    submit: FormEventHandler<HTMLFormElement>
}

const Form: FC<FormProps> = ({submit}) => {
    return (
        <form onSubmit={submit}>
            <label htmlFor='keyphrase'>Keyphrase</label>
            <input id="keyphrase" name="keyphrase" required />
            <button type="submit">Submit</button>
        </form>
    )
}

export default Form