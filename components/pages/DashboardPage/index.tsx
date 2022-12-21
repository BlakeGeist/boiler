import React from 'react'
import Layout from 'components/Layout'
import Link from 'next/link'

const Dashboard = ({ sites }) => {
    return (
        <Layout>
            <>
                <h1>Dashboard</h1>
                <ul>
                    {sites.map((site) => {
                        return (
                            <li key={site.domain}>
                                <Link href={`/dashboard/${site.domain}`}>
                                    <a>{site.domain}</a>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </>            
        </Layout>
    )
}

export default Dashboard