
import { updateDoc, doc } from 'firebase/firestore'
import { firebaseDb } from 'utils/firebase'
import { imageResponse } from 'utils/apiHelpers'
import got from 'got'
import sharp from 'sharp'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"

export default async function handler(req, res) {
    const { host, prompt, slug } = req.query

    let headerImage

    const image = await imageResponse(prompt, 'large')
    let dafile = await got(image)
    
    const dastorage = getStorage()
    const dastorageRef = ref(dastorage, `${slug}-header.jpg`)    

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

    const post = {
        headerImage
    }

    const postRef = doc(firebaseDb, "sites", host, "posts", slug)

    await updateDoc(postRef, post).then(() => {
        res.status(200).json(post)
    }).catch((e) => {
        console.log(e)
        res.status(500).json(e)
    })
}