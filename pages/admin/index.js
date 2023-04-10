import React from 'react'
import AdminMain from 'components/pages/Admin/Main'
import NewLayout from 'components/Layout/NewLayout'

const Admin = ({ site }) => (
    <NewLayout site={site}>
        <NewLayout.Main>
            <AdminMain site={site} />
        </NewLayout.Main>
    </NewLayout>
)

export default Admin