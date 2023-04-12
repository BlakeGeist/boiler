import React, { useState } from 'react'

import EditHeading from './EditHeading'
import PostHeading from 'components/pages/posts/post/components/Heading'

const Heading = ({ post, host }) => {
    const [isEditing] = useState(!post?.heading?.length > 0)

    if(isEditing) return <EditHeading post={post} host={host} />

    return <PostHeading heading={post.heading} />
}

export default Heading