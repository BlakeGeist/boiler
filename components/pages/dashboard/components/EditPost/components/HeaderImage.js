import React, { useState } from 'react'

import EditHeader from './EditHeaderImage'
import PostHeader from 'components/pages/posts/post/components/Header'

const Heading = ({ post, host }) => {
    const hasHeaderImage = post?.headerImageSrc.length > 0
    const [isEditing] = useState(!hasHeaderImage)

    if(isEditing) return <EditHeader post={post} host={host} />
    return <PostHeader headerImageSrc={post.headerImageSrc} host={host} />
}

export default Heading