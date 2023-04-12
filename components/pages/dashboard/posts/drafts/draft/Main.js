import React from 'react'
import EditPost from 'components/pages/dashboard/components/EditPost'

const DraftPostMain = ({ site, host, post}) => {
    return (
        <>
            <h1>Draft</h1>
            <EditPost
                post={post}
                host={host}
                site={site}
                isEditable={true}
            />            
        </>
    )
}

export default DraftPostMain