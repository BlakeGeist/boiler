import React from 'react'
import SerachPageTemplate from 'components/search'
import { getDocFromPathAndSlug } from 'utils/firebase'

const Index = ({ site }) => <SerachPageTemplate site={site} />

export const getServerSideProps = async ({ req }) => {
    const host = req.headers.host
    const site = await getDocFromPathAndSlug("sites", host)

    return { props: { site } }
  }

export default Index