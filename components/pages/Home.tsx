import React, { FC } from 'react'
import Layout from '../Layout'
import Link from 'next/link'

interface HomeProps {
  sets: any
}

const Home:FC<HomeProps> = ({ sets }) => {
  return (
    <Layout heading="Dog Walking">
      <>
        <h2>This is the main content</h2>
        {sets.map(set => {
          return (
            <p key={set.set_num}>
              Set Number: <Link href={`/set/${set.set_num}`}><a>{set.set_num}</a></Link>
            </p>
          )
        })}
      </>
    </Layout>
  )
}

export default Home
