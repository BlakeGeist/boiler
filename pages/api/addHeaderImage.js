
import { updateDoc, doc } from 'firebase/firestore'
import { firebaseDb } from 'utils/firebase'
import { imageResponse } from 'utils/apiHelpers'
import got from 'got'
import sharp from 'sharp'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"

export default async function handler(req, res) {
    const { host, slug, headerImagePrompt, lang } = req.query

    const articleIdeaPromotText = headerImagePrompt

    let headerImageSrc

    try {

        const image = await imageResponse(articleIdeaPromotText, 'large')
        let dafile = await got(image)
        
        const dastorage = getStorage()
        const dastorageRef = ref(dastorage, `${slug}-header.jpg`)    

        await sharp(dafile['rawBody'])
            .extract({ left: 0, top: 250, width: 1024, height: 500 })
            .jpeg({ mozjpeg: true })
            .toBuffer()
            .then( async (data) => {
                await uploadBytes(dastorageRef, data).then( async (snapshot) => {
                    await getDownloadURL(snapshot.ref).then( (downloadURL) => {
                        headerImageSrc = downloadURL
                    })
            
                }).catch(e => console.log('error:, ', e))

            })
            .catch( e => console.log('error:, ', e))

        const post = {
            headerImageSrc
        }

        const postRef = doc(firebaseDb, `/sites/${host}/langs/${lang}/posts`, slug)

        await updateDoc(postRef, post)
        return res.status(200).json(post)
    } catch(e) {
        const errorMessage = 'there was an error while running the addHeaderImage api, '
        console.log(errorMessage, e)
        res.status(500).json(errorMessage, e)
    }
}