
import { getFirestore, doc, getDoc, getDocs } from "firebase/firestore" 

import { initializeApp } from "firebase/app"
import { getStorage } from "firebase/storage"

export const firebaseConfig = {
  apiKey: "AIzaSyCBXCXdvpPYz1rY9Wximbz0OIAhPVpYdek",
  authDomain: "legos-1ab16.firebaseapp.com",
  projectId: "legos-1ab16",
  storageBucket: "legos-1ab16.appspot.com",
  messagingSenderId: "712892128313",
  appId: "1:712892128313:web:f76f772da24f7cd8f301e8",
  measurementId: "G-X3Q97THP7W"
}
  
const firebaseApp = initializeApp(firebaseConfig)

export const firebaseDb = getFirestore(firebaseApp)

export const storage = getStorage(firebaseApp)

export const getDocFromPathAndSlug = async (path, slug) => {
  const docRef = doc(firebaseDb, path, slug)
  const postDoc = await getDoc(docRef)
  const document = postDoc.data()

  return document
}

export const getDocsFromQuery = async (q) => {
  const postsSnap = await getDocs(q)
  const posts = postsSnap.docs.map(doc => doc.data())

  return posts
}

export default firebaseApp

