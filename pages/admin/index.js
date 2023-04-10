import React from 'react'
import AdminPageTemplate from 'components/pages/Admin'
import Layout from 'components/Layout'

const Admin = ({ site }) => (
    <Layout site={site}>
        <AdminPageTemplate site={site} />
    </Layout>
)

export default Admin