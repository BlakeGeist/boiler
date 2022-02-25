import React, { FC } from 'react'
import Button from '@mui/material/Button'
import Layout from '../Layout'

const Home:FC = () => (
  <Layout>
    <>
      <h2>This is the main content</h2>
      <div>
        <p>This is the content in main</p>
        <Button variant="contained" color="primary">
          Hello World
        </Button>
      </div>
    </>
  </Layout>
)

export default Home
