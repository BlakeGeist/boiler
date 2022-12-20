
import { getFirestore } from "firebase/firestore" 
import { initializeApp } from "firebase/app"

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

export default firebaseApp

