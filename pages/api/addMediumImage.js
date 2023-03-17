
import { updateDoc, doc } from 'firebase/firestore'
import { firebaseDb } from 'utils/firebase'
import { imageResponse } from 'utils/apiHelpers'
import got from 'got'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"

export default async function handler(req, res) {
    const { host, mediumImagePrompt, slug } = req.query

    console.log('mediumImagePrompt, ', mediumImagePrompt)

    let mediumImageSrc
    const mediumImage = await imageResponse(mediumImagePrompt, 'medium')
    let mediumImageFile = await got(mediumImage)

    const storage = getStorage()
    const mediumImageFileRef = ref(storage, `${slug}-medium.jpg`)

    await uploadBytes(mediumImageFileRef, mediumImageFile['rawBody']).then( async (snapshot) => {
        await getDownloadURL(snapshot.ref).then( (downloadURL) => {
            mediumImageSrc = downloadURL
            console.log('File available at', downloadURL)
          })

    }).catch(e => console.log(e))

    const post = {
        mediumImageSrc
    }

    const postRef = doc(firebaseDb, "sites", host, "posts", slug)

    await updateDoc(postRef, post).then(() => {
        res.status(200).json(post)
    }).catch((e) => {
        console.log(e)
        res.status(500).json(e)
    })
}