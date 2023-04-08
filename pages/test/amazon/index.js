import React from 'react'
import Layout from 'components/Layout'
import { getDocFromPathAndSlug } from 'utils/firebase'
import axios from 'axios'

const Amazon = ({ site }) => {

    const handleSubmit = async (e) => {
        e.preventDefault()
        const searchTerm = e.target.searchTerm.value
        console.log(searchTerm)

        const params = {
        }

        await axios.get('/api/getAwsProducts', { params })
            .then((res) => {
                console.log(res.data)
            })
            .catch(e => console.log('error:, ', e))
    }



    return (
        <Layout site={site}>
            <h1>Amazon Search Page</h1>

            <form onSubmit={handleSubmit}>
                <input type="text" id="searchTerm" name="searchTerm" />
                <input type="submit" />
            </form>

        </Layout>
    )
}

export const getServerSideProps = async ({ req }) => {
    const host = req.headers.host
    const site = await getDocFromPathAndSlug("sites", host)

    return {
        props: { site }, // will be passed to the page component as props
    }
}

export default Amazon