import React from 'react'
import Layout from 'components/Layout'
import { firebaseDb } from 'utils/firebase'
import { doc, setDoc, getDoc } from "firebase/firestore" 
import slugify from 'slugify'
import { useRouter } from "next/router"
import Input from 'components/pages/post/forms/Input'
import TextArea from 'components/pages/post/forms/TextArea'

const NewCategory = ({ category_data }) => {
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
                    <Input name="Meta Title" initalVal={category_data.meta_title} />
                    <TextArea name="Meta Description" initalVal={category_data.meta_description} />
                    <Input name="Category Heading" initalVal={category_data.category_heading} />
                    <Input name="Category Name" initalVal={category_data.category_name} />
                    <Input name="Category Emoji" initalVal={category_data.category_emoji} />
                    <TextArea name="Category Description" initalVal={category_data.category_description} />
                    <input type="submit" />
                </form>
            </>
        </Layout>
    )
}

export const getServerSideProps = async (ctx) => {
    const docRef = doc(firebaseDb, "categories", ctx.query.category)
    const category = await getDoc(docRef)

    const category_data = category.data()

    return {
        props: { category_data }, // will be passed to the page component as props
      }
}

export default NewCategory