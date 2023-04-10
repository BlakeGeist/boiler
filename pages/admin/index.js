import React from 'react'
import AdminMain from 'components/pages/admin/Main'
import Layout from 'components/Layout'

const Admin = ({ site }) => (
    <Layout site={site}>
        <Layout.Main>
            <AdminMain site={site} />
        </Layout.Main>
    </Layout>
)

export default Admin