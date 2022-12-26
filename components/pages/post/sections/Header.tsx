import React from 'react'

const Header = ({ topRef, heading, headerImage }) => {
    return (
        <>
            <img ref={topRef} style={{marginBottom: '25px'}} src={headerImage} width="100%" />
            <h1>{heading}</h1>
        </>
    )
}

export default Header