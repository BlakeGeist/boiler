const { simpleSitemapAndIndex } = require( 'sitemap' )
const { petTipsNTricksPostsIndex } = require('utils/searchClient')
const moment = require('moment')

export default async function handler(req, res) {
    //req, res
    
    console.log('before')

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

    console.log(links)

    //query a list of all the posts

    simpleSitemapAndIndex({
        hostname: host,
        destinationDir: './',
        sourceData: links,
        gzip: false
      }).then(() => {
        // Do follow up actions
      })

    res.status(200)

}