import React from 'react'

const Header = ({ topRef, heading, headerImageSrc }) => {

    const HeaderImage = () => {
        if(!headerImageSrc) return null
        return <img ref={topRef} style={{marginBottom: '25px'}} src={headerImageSrc} width="100%" />
    }

    return (
        <>
            <HeaderImage />
            <h1>{heading}</h1>
        </>
    )
}

export default Header