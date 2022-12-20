import React from 'react'
import Layout from 'components/Layout'
import { firebaseDb } from 'utils/firebase'
import { doc, setDoc } from "firebase/firestore" 
import slugify from 'slugify'
import { useRouter } from "next/router"
import Input from 'components/pages/post/forms/Input'
import TextArea from 'components/pages/post/forms/TextArea'

const NewCategory = () => {
    const router = useRouter()

    const onSubmit = (e) => {
        e.preventDefault()

        const slug = slugify(e.target.category_name.value.toLowerCase())
        const meta_title = e.target.meta_title.value
        const meta_description = e.target.meta_description.value
        const category_description = e.target.category_description.value
        const category_heading = e.target.category_heading.value
        const category_name = e.target.category_name.value
        const category_emoji = e.target.category_emoji.value

        const category = {
            slug,
            meta_title,
            meta_description,
            category_description,
            category_heading,
            category_name,
            category_emoji
        }

        setDoc(doc(firebaseDb, "categories", slug), category).then(() => {
            router.push(`/categories/${slug}`)
        })

    }

    return (
        <Layout heading="New Category">
            <>
                <form onSubmit={onSubmit}>
                    <Input name="Meta Title" />
                    <TextArea name="Meta Description" />
                    <Input name="Category Heading" />
                    <Input name="Category Name" />
                    <Input name="Category Emoji" />
                    <TextArea name="Category Description" />
                    <input type="submit" />
                </form>
            </>
        </Layout>
    )
}

export default NewCategory