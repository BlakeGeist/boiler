import React from 'react'
import Layout from 'components/Layout'
import Head from 'next/head'
import PostsTemplate from 'components/pages/posts/PostsTemplate'

const CategoryTemplate = ({ site, category, posts, locale, host }) => {
    return (
        <>
            <Head>
                <title>{category.categoryMetaTitle}</title>
                <meta name="description" content={category.categoryMetaDesc} />
            </Head>
            <Layout site={site}>
                <>
                    <h1>{category.name}</h1>
                    <p>{category.description}</p>
                    <PostsTemplate host={host} posts={posts} locale={locale} />
                </>
            </Layout>
        </>
    )
}

export default CategoryTemplate