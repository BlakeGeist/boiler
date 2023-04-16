
import { getFirestore, doc, getDoc, getDocs } from "firebase/firestore" 

import { initializeApp } from "firebase/app"
import { getAuth  } from "firebase/auth"

import { getStorage } from "firebase/storage"

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
}
const firebaseApp = initializeApp(firebaseConfig)

export const auth = getAuth(firebaseApp)


export const firebaseDb = getFirestore(firebaseApp)

export const storage = getStorage(firebaseApp)

export const getDocFromPathAndSlug = async (path, slug) => {
  const docRef = doc(firebaseDb, path, slug)
  const postDoc = await getDoc(docRef)
  const document = postDoc.data()
  document.id = postDoc.id

  if(document.startDate) document.startDate = document.startDate.toDate().getTime()
  if(document.endDate) document.endDate = document.endDate.toDate().getTime()
  if(document.publishedDate) document.publishedDate = document.publishedDate.toDate().getTime()

  return document
}

export const getDocsFromQuery = async (q) => {
  const postsSnap = await getDocs(q)
  const posts = postsSnap.docs.map(doc => { 

    const document = { 
      ...doc.data(), 
      id: doc.id
    }

    if(document.startDate) document.startDate = document.startDate.toDate().getTime()
    if(document.endDate) document.endDate = document.endDate.toDate().getTime()

    return document

  })

  return posts
}

export default firebaseApp

