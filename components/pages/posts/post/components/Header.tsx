import React from 'react'

const Header = ({ topRef, headerImageSrc }) => {
    if(!headerImageSrc) return null
    return <img ref={topRef} style={{marginBottom: '25px'}} src={headerImageSrc} width="100%" />
}

export default Header