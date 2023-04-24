const { SitemapStream, streamToPromise } = require( 'sitemap' )
const { Readable } = require( 'stream' )
const { petTipsNTricksPostsIndex } = require('utils/searchClient')
const moment = require('moment')

const { uploadSitemapToHosting } = require("utils/firebaseAdmin")

export default async function handler(req, res) {
    //req, res
    
    const host = `https://pet-tips-n-tricks.com`

    const searchParams = {
      }

    const links = await petTipsNTricksPostsIndex.search(searchParams).then(async ({ hits }) => {
        const mappedHits = hits.map(hit => {
            console.log(hit)
            if(!hit.lastModified) return null
            return {
                url: `/posts/${hit.objectID}`,
                lastmod: moment(hit.lastModified).format('YYYY/MM/DD:HH:mm:ss').toString(),
                priority: 0.3,
                changefreq: 'monthly'
            }
        })

        return mappedHits.filter(Boolean)
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