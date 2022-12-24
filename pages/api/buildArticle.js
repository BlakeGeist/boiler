//import slugify from 'slugify'
//import { firebaseDb } from 'utils/firebase'
//import { setDoc, doc, addDoc, collection } from 'firebase/firestore'
//import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
//import got from 'got'
//import sharp from 'sharp'
//import { promptResponse, imageResponse } from 'utils/apiHelpers'

export default async function handler() {
    //req, res
   /* const { host, prompt } = req.query

    const concept = prompt

    let headerImage

    const image = await imageResponse(prompt, 'large')
    let dafile = await got(image)
    
    const dastorage = getStorage()
    const dastorageRef = ref(dastorage, 'file-name-resized.jpg')    

    await sharp(dafile['rawBody'])
        .extract({ left: 0, top: 450, width: 1024, height: 350 })
        .jpeg({ mozjpeg: true })
        .toBuffer()
        .then( async (data) => {
            await uploadBytes(dastorageRef, data).then( async (snapshot) => {
                await getDownloadURL(snapshot.ref).then( (downloadURL) => {
                    headerImage = downloadURL
                    console.log('File available at', downloadURL)
                  })
        
            }).catch(e => console.log(e))

        })
        .catch( err => console.log(err))

    let mediumImageSrc
    const mediumImage = await imageResponse(prompt, 'medium')
    let mediumImageFile = await got(mediumImage)        
    const mediumImageFileRef = ref(dastorage, 'file-name-resized-medium.jpg')    

    await uploadBytes(mediumImageFileRef, mediumImageFile['rawBody']).then( async (snapshot) => {
        await getDownloadURL(snapshot.ref).then( (downloadURL) => {
            mediumImageSrc = downloadURL
            console.log('File available at', downloadURL)
          })

    }).catch(e => console.log(e))

    const post = {
        headerImage,
        mediumImageSrc
    }

   /* await setDoc(doc(firebaseDb, "sites", host, "posts", slug), post)
        .then(() => {
            faqs.forEach(faq => {
                addDoc(
                    collection(firebaseDb, "sites", host, "posts", slug, "faqs"),
                    faq
                )
            })
            listicleItems.forEach(listItem => {
                addDoc(
                    collection(firebaseDb, "sites", host, "posts", slug, "listItems"),
                    { listItem }
                )                
            })
        })
    //console.log(post)

    res.status(200).json(post)
*/

}
  