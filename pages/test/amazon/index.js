import React from 'react'
import Layout from 'components/Layout'
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

export default Amazon