import React from 'react'
import { doc, getDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore, query, limit } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCBXCXdvpPYz1rY9Wximbz0OIAhPVpYdek",
  authDomain: "legos-1ab16.firebaseapp.com",
  projectId: "legos-1ab16",
  storageBucket: "legos-1ab16.appspot.com",
  messagingSenderId: "712892128313",
  appId: "1:712892128313:web:f76f772da24f7cd8f301e8",
  measurementId: "G-X3Q97THP7W"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const Set = (props) => {
  const {set, soldSets} = props


  return (
      <div>
          <h1>{set.name}</h1>
          <p>{set.set_num}</p>
          <img src={set.set_img_url}  width="400px"/>

          <table>
            <tbody>
              {soldSets.map(soldItem => {
                return (
                  <tr>
                    <td>{soldItem.sale_price}</td>
                    <td>{soldItem.title}</td>
                    <td>{soldItem.buying_format}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
      </div>
  )
}

export const getServerSideProps = async (ctx) => {
    const { set_num } = ctx.query
    const docRef = doc(db, "sets", set_num);
    const docSnap = await getDoc(docRef);
  
    const subColRef = collection(db, "sets", set_num, "soldItems");
    const qSnap = await getDocs(subColRef)
    const soldSets = qSnap.docs.map(d => ({id: d.id, ...d.data()}))

    if (docSnap.exists()) {
      return { props: { set: docSnap.data() || null, soldSets: soldSets || null  } }
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      return { props: { set: {} || null  } }
    }
  }

export default Set