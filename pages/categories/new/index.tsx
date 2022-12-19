import React, { useState } from 'react'
import Layout from 'components/Layout'
import { firebaseDb } from 'utils/firebase';
import { doc, setDoc } from "firebase/firestore"; 
import slugify from 'slugify';
import { useRouter } from "next/router";


const NewCategory = () => {


    const Input = ({ name }) => {
        const [value, setValue] = useState('')

        const rawInputID = name.toLowerCase()
        const check = chr  => `&\/#, +()$~%.'":*?<>{}`.includes(chr);
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

    const TextArea = ({ name }) => {
        const [value, setValue] = useState('')

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

    const onSubmit = (e) => {
        e.preventDefault()
        const router = useRouter()

        const slug = slugify(e.target.meta_title.value)
        const meta_title = e.target.meta_title.value
        const meta_description = e.target.meta_description.value
        const category_description = e.target.category_description.value
        const category_heading = e.target.category_heading.value

        const category = {
            slug,
            meta_title,
            meta_description,
            category_description,
            category_heading
        }

        setDoc(doc(firebaseDb, "categories", slug), category).then(() => {
            router.push(`/posts/${slug}`)
        })

        console.log(category)
    }

    return (
        <Layout heading="New Category">
            <>
                <form onSubmit={onSubmit}>
                    <Input name="Meta Title" />
                    <TextArea name="Meta Description" />
                    <Input name="Category Heading" />
                    <TextArea name="Category Description" />
                    <input type="submit" />
                </form>
            </>
        </Layout>
    )
}

export default NewCategory