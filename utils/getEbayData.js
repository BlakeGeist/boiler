const axios = require("axios");
const { getFirestore } = require("firebase/firestore"); 
const { initializeApp } = require("firebase/app");
const { doc, updateDoc, collection } = require("firebase/firestore"); 

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

const data = {
    "keywords": "Lego 70751",
    "max_search_results": "240",
    "remove_outliers": true,
    "aspects": [
        {
            "name": "LH_ItemCondition",
            "value": "3"
        },
    ]
}

const options = {
  method: 'POST',
  url: 'https://ebay-average-selling-price.p.rapidapi.com/findCompletedItems',
  headers: {
    'content-type': 'application/json',
    'X-RapidAPI-Key': 'f0e8153803msh7efbc70383f5751p1baaecjsn6c32aa1b3e5a',
    'X-RapidAPI-Host': 'ebay-average-selling-price.p.rapidapi.com'
  },
  data: data
};

axios.request(options).then(function (response) {
    response.data.products.forEach(async product => {
        const docRef = doc(db, "sets", '70751-1')
        const colRef = collection(docRef, "soldItems")

        await updateDoc(colRef, product);
    })
}).catch(function (error) {
	console.error(error);
});