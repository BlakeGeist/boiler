import React, { FC } from 'react'
import { firebaseDb } from 'utils/firebase'
import { doc, setDoc } from "firebase/firestore"
import slugify from 'slugify'
import { useRouter } from "next/router"
import Layout from 'components/Layout'

interface HomeProps {
  sitesArray: any,
  site: any
}

const Home:FC<HomeProps> = ({ sitesArray, site }) => {
  const router = useRouter()

  const onSubmit = (e) => {
    e.preventDefault()

    const url = e.target.url.value
    const domain = e.target.domain.value
    const slug = slugify(domain)
    const site = {
      url,
      slug,
      domain
    }

    setDoc(doc(firebaseDb, "sites", slug), site).then(() => {
      router.push(`/sites/${slug}`)
    })
  }

  return (
    <Layout site={site}>
        <Layout.Main>
          {sitesArray?.map((site) => {
            return (
              <p key={site.url}>
                Site: {site.domain}
              </p>
            )
          })}

          <form onSubmit={e => onSubmit(e)}>
            <input type="url" name="url" />
            <input type="text" name="domain" />
            <input type="submit" value="Add Site" />
          </form>
      </Layout.Main>
    </Layout>
  )
}

export default Home
