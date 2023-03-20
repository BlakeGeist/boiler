
import { updateDoc, doc } from 'firebase/firestore'
import { firebaseDb } from 'utils/firebase'
import { imageResponse } from 'utils/apiHelpers'
import got from 'got'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"

export default async function handler(req, res) {
    const { host, mediumImagePrompt, slug, lang } = req.query

    try {
        let mediumImageSrc
        
        const mediumImage = await imageResponse(mediumImagePrompt, 'medium')
        let mediumImageFile = await got(mediumImage)
    
        const storage = getStorage()
        const mediumImageFileRef = ref(storage, `${slug}-medium.jpg`)
    
        await uploadBytes(mediumImageFileRef, mediumImageFile['rawBody']).then( async (snapshot) => {
            await getDownloadURL(snapshot.ref).then( (downloadURL) => {
                mediumImageSrc = downloadURL
              })
    
        }).catch(e => console.log(e))
    
        const post = {
            mediumImageSrc
        }
    
        const postRef = doc(firebaseDb, `/sites/${host}/langs/${lang}/posts`, slug)

        await updateDoc(postRef, post)
        return res.status(200).json(post)
    } catch(e) {
        const errorMessage = 'there was an error while running the addMediumImage api, '
        console.log(errorMessage, e)
        res.status(500).json(errorMessage, e)
    }
}