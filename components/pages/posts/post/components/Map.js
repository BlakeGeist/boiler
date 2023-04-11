import React from 'react'

const Map = ({ mapSrc, mapRef }) => {
    if(!mapSrc) return null

    return (
        <div ref={mapRef}>
            <iframe src={mapSrc} width="100%" height="450" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
    )
}

export default Map