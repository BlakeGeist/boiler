import * as firebaseAdmin from 'firebase-admin'
const { Readable } = require('stream')

export const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
}

if (!firebaseAdmin.apps.length) {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  const bucketName = `${projectId}.appspot.com`

  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      privateKey: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY.replace(/\\n/gm, "\n"),
      clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID      
    }),
    storageBucket: bucketName,
    databaseURL: 'https://legos-1ab16.firebaseio.com',
  })
}

export { firebaseAdmin }

export const uploadSitemapToHosting = async (sitemapXml) => {

  const bucket = firebaseAdmin.storage().bucket()

  try {
    // Create a Readable stream from the sitemap XML string
    const stream = Readable.from(sitemapXml)

    // Upload the sitemap XML file to Firebase Hosting
    const file = bucket.file('sitemap.xml')
    stream.pipe(file.createWriteStream({
      metadata: {
        contentType: 'application/xml',
        cacheControl: 'public, max-age=86400' // Cache for 1 day
      },
      public: true
    }))

    //console.log('Sitemap uploaded successfully')

    // Get the download URL for the sitemap XML file
    const [metadata] = await file.getMetadata()
    const downloadUrl = metadata.mediaLink
    //console.log(`Download URL: ${downloadUrl}`)

    return downloadUrl
  } catch (error) {
    console.error('Error uploading sitemap:', error)
  }
}
