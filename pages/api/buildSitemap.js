const { SitemapStream, streamToPromise } = require( 'sitemap' )
const { Readable } = require( 'stream' )
const { petTipsNTricksPostsIndex } = require('utils/searchClient')
const moment = require('moment')

const { uploadSitemapToHosting } = require("utils/firebaseAdmin")

export default async function handler(req, res) {
    //req, res
    
    const host = `https://pet-tips-n-tricks.com`

    const links = await petTipsNTricksPostsIndex.search().then(async ({ hits }) => {
        const mappedHits = hits.map(hit => {
            return {
                url: `/posts/${hit.objectID}`,
                lastmod: moment(hit.lastmodified).format('YYYY/MM/DD:HH:mm:ss').toString(),
                priority: 0.3,
                changefreq: 'monthly'
            }
        })

        return mappedHits
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