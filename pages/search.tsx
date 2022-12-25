import React from 'react'
import Layout from 'components/Layout'

const Search = ({ searchTerm }) => {
    return (
        <Layout>
            <h1>Search: {searchTerm}</h1>
        </Layout>
    )
}

export const getServerSideProps = async ({ query }) => {
    const searchTerm = query.search || null
  
    return { props: { searchTerm } }
  
  }

export default Search