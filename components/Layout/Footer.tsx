import React from 'react'
import Navigation from './Navigation'
import Link from 'next/link'

const Footer = ({ site }) => {
  const { twitter, facebook, instagram } = site

  return (
    <footer>
      <Navigation borderTop />
      {twitter && 
        <Link href={twitter}><a target="_blank">Twitter</a></Link> 
      }
      {facebook && 
        <Link href={facebook}><a target="_blank">Facebook</a></Link> 
      }
      {instagram && 
        <Link href={instagram}><a target="_blank">Instagram</a></Link> 
      }            
    </footer>
  )
}

export default Footer
