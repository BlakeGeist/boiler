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

    const listiclePrompt  = `Create a listicle related to the previous ${concept} article`
    const faqsPrompt = `Create 5 frequently asked questions and answers related to the previous ${concept} article`

    //const listicleResponse = await promptResponse(listiclePrompt)
    const faqsResponse = await promptResponse(faqsPrompt)

    const faqsArray = faqsResponse.split(/\r?\n/)
    const faqsAsArrayItems = faqsArray.map(faq => {if(faq.length > 0) return faq}).filter(Boolean)
    console.log(faqsAsArrayItems)
    const faqs = faqsAsArrayItems.map((faq, i) => {
        if(i % 2 !== 0) return 

        const cleanAnswer = (string) => {
            if(!string) return ''
            if(string.startsWith('Answer: ')) string = string.slice(8)
            if(string.startsWith('Answer:')) string = string.slice(7)
            if(string.startsWith('A: ')) string = string.slice(3)
            if(string.startsWith('A:')) string = string.slice(2)
            if(string.startsWith('A')) string = string.slice(1)

            return string
        }

        const cleanQuestion = (string) => {
            string = string.slice(3)
            return string
        }

        const tempFaq = {
            question: cleanQuestion(faq),
            answer: cleanAnswer(faqsAsArrayItems[i+1])
        }
        return tempFaq
    }).filter(Boolean)

    /*
    const listicleArray = listicleResponse.split(/\r?\n/)
    const listicleArrayItems = listicleArray.map(listItem => {if(listItem.length > 0) return listItem}).filter(Boolean)

    const listicleHeading = listicleArrayItems[0]
    const numberedListicleItems = listicleArrayItems.slice(1)
    const listicleItems = numberedListicleItems.map((listItem, i) => {
        const checkFor = `${i+1}. `
        if(listItem.startsWith(checkFor)) listItem = listItem.slice(checkFor.length).trim()

        return listItem
    })

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
        listicleHeading,
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
  