import React from 'react'

const Header = ({ topRef, heading, headerImage }) => {
    return (
        <>
            <h1 ref={topRef}>{heading}</h1>
            <img style={{marginBottom: '25px'}} src={headerImage} width="100%" />
        </>
    )
}

export default Header