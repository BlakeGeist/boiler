
import { promptResponse } from 'utils/apiHelpers'
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore'
import { firebaseDb } from 'utils/firebase'

export default async function handler(req, res) {
    const { host, prompt, slug } = req.query

    const listiclePrompt  = `Create a listicle related to the previous ${prompt} article`
    const listicleResponse = await promptResponse(listiclePrompt)
    
    const listicleArray = listicleResponse.split(/\r?\n/)
    const listicleArrayItems = listicleArray.map(listItem => {if(listItem.length > 0) return listItem}).filter(Boolean)

    const listicleHeading = listicleArrayItems[0]
    const numberedListicleItems = listicleArrayItems.slice(1)
    const listicleItems = numberedListicleItems.map((listItem, i) => {
        const checkFor = `${i+1}. `
        if(listItem.startsWith(checkFor)) listItem = listItem.slice(checkFor.length).trim()

        return listItem
    })

    const post = {
        listicleHeading
    }

    listicleItems.forEach(listItem => {
        addDoc(
            collection(firebaseDb, "sites", host, "posts", slug, "listItems"),
            { listItem }
        )                
    })

    const postRef = doc(firebaseDb, "sites", host, "posts", slug)

    await updateDoc(postRef, post).then(() => {
        res.status(200).json(post)
    }).catch((e) => {
        console.log(e)
        res.status(500).json(e)
    })    

    res.status(200).json(post)
}