const { SitemapStream, streamToPromise } = require( 'sitemap' )
const { Readable } = require( 'stream' )
const { petTipsNTricksPostsIndex } = require('utils/searchClient')
const moment = require('moment')
import { sortBy } from 'lodash'

const { uploadSitemapToHosting } = require("utils/firebaseAdmin")

export default async function handler(req, res) {
    //req, res
    
    const host = `https://pet-tips-n-tricks.com`

    const searchParams = {
        hitsPerPage: 1000
    }

    const links = await petTipsNTricksPostsIndex.search('', searchParams).then(async ({ hits }) => {

        const sortedHits = sortBy(hits, ['lastmodified']).reverse()

        const mappedHits = sortedHits.map(hit => {

            if(hit.isTranslated) {
                return hit.slugs.map(slug => {
                    console.log(slug)
                    let route = `/${slug.lang}/posts/${slug.slug}`
                    if(slug.lang === 'en') route = `/posts/${slug.slug}`
                    return {
                        url: route,
                        lastmod: moment(hit.lastmodified).format('YYYY-MM-DD:hh:mm:ss').toString(),
                        priority: 0.3,
                        changefreq: 'monthly'
                    }
                })
            }

            if(!hit.lastmodified) return null
            return {
                url: `/posts/${hit.objectID}`,
                lastmod: moment(hit.lastmodified).format('YYYY-MM-DD:hh:mm:ss').toString(),
                priority: 0.3,
                changefreq: 'monthly'
            }
        })

        return mappedHits.filter(Boolean).flat()
    })

    //query a list of all the posts

    // Create a stream to write to
    const stream = new SitemapStream( { hostname: host } )

    // Return a promise that resolves with your XML string
    const xmlSitemap = await streamToPromise(Readable.from(links).pipe(stream)).then((data) =>
        data.toString()
    )

    await uploadSitemapToHosting(xmlSitemap)

    res.status(200).json(xmlSitemap)
}