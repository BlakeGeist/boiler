const { SitemapStream, streamToPromise } = require( 'sitemap' )
const { Readable } = require( 'stream' )

export default async function handler() {
    //req, res
    
    //query a list of all the posts

    //loop the posts and map them with changeFreq and priorty

    // An array with your links
    const links = [{ url: '/page-1/',  changefreq: 'daily', priority: 0.3  }]

    // Create a stream to write to
    const stream = new SitemapStream( { hostname: 'https://...' } )

    streamToPromise(Readable.from(links).pipe(stream)).then((data) => {
        data.toString()

        console.log(data.toString())
    })
}