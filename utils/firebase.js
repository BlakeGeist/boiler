
import { getFirestore, doc, getDoc, getDocs } from "firebase/firestore" 

import { initializeApp } from "firebase/app"
import { getAuth, setPersistence, signInWithEmailAndPassword, browserSessionPersistence  } from "firebase/auth"

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

  setPersistence(auth, browserSessionPersistence)
    .then(() => {
      // Existing and future Auth states are now persisted in the current
      // session only. Closing the window would clear any existing state even
      // if a user forgets to sign out.
      // ...
      // New sign-in will be persisted with session persistence.
      return signInWithEmailAndPassword(auth, email, password) // eslint-disable-line
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code
      const errorMessage = error.message
      console.log(errorCode, errorMessage)
    })


export const firebaseDb = getFirestore(firebaseApp)

export const storage = getStorage(firebaseApp)


export const getDocFromPathAndSlug = async (path, slug) => {
  const docRef = doc(firebaseDb, path, slug)
  const postDoc = await getDoc(docRef)
  const document = postDoc.data()
  document.id = postDoc.id

  return document
}

export const getDocsFromQuery = async (q) => {
  const postsSnap = await getDocs(q)
  const posts = postsSnap.docs.map(doc => { return { ...doc.data(), id: doc.id}})

  return posts
}

export default firebaseApp

