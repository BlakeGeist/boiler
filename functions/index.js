const functions = require('firebase-functions')
const https = require('https')

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.serveSitemap = functions.https.onRequest((req, res) => {
  https.get('https://legos-1ab16.web.app/sitemap.xml', (response) => {
    res.setHeader('Content-Type', 'application/xml')
    response.pipe(res)
  })
})