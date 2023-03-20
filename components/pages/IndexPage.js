import React from 'react'
import Layout from 'components/Layout'
import { FeaturedPosts, Posts } from 'components/pages/Index/FeaturedPosts'
import { Heading } from 'components/pages/IndexPageStyles'

const IndexPage = ({ posts, site, lang }) => {
    const featuredPosts = posts.slice(0, 4)
    const regularPosts = posts.slice(4, posts.length)

    return (
        <Layout site={site}>
            <>
                <Heading><span>Featured</span></Heading>
                <FeaturedPosts featuredPosts={featuredPosts} lang={lang} />
                <Heading><span>All Stories</span></Heading>
                <Posts regularPosts={regularPosts} lang={lang} />
                {site.map &&
                    <div>
                        <iframe src={site.map} width="100%" height="450" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                }
            </>
        </Layout>
    )
}

export default IndexPage

