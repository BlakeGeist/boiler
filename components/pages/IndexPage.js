import React from 'react'
import { FeaturedPosts, Posts } from 'components/pages/Index/FeaturedPosts'
import { Heading } from 'components/pages/IndexPageStyles'

const IndexPage = ({ posts, map }) => {
    const featuredPosts = posts.slice(0, 4)
    const regularPosts = posts.slice(4, posts.length)

    return (
            <>
                <Heading><span>Featured</span></Heading>
                <FeaturedPosts featuredPosts={featuredPosts} />
                <Heading><span>All Stories</span></Heading>
                <Posts regularPosts={regularPosts} />
                {map &&
                    <div>
                        <iframe src={map} width="100%" height="450" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                }
            </>
    )
}

export default IndexPage

