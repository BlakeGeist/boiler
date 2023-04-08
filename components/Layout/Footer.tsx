import React from 'react'
import Navigation from './Navigation'
import Link from 'next/link'

const Footer = ({ site }) => {
  const { twitter, facebook, instagram } = site

  return (
    <footer>
      <Navigation borderTop />
      {twitter && 
        <Link href={twitter} target="_blank">Twitter</Link> 
      }
      {facebook && 
        <Link href={facebook} target="_blank">Facebook</Link> 
      }
      {instagram && 
        <Link href={instagram} target="_blank">Instagram</Link> 
      }            
    </footer>
  )
}

export default Footer
