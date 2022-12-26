import React from 'react'

const Header = ({ topRef, heading, headerImage }) => {
    return (
        <>
            <img style={{marginBottom: '25px'}} src={headerImage} width="100%" />
            <h1 ref={topRef}>{heading}</h1>
        </>
    )
}

export default Header