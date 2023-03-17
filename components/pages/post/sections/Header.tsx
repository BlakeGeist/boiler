import React from 'react'

const Header = ({ topRef, heading, headerImageSrc }) => {
    return (
        <>
            <img ref={topRef} style={{marginBottom: '25px'}} src={headerImageSrc} width="100%" />
            <h1>{heading}</h1>
        </>
    )
}

export default Header