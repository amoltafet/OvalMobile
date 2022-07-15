import { initializeApp } from 'firebase/app';
import { doc, getFirestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyC2Q7qFGnrIBQ2ekRuQImxdDQz3slzxEao",
    authDomain: "omi-app-94406.firebaseapp.com",
    projectId: "omi-app-94406",
    storageBucket: "omi-app-94406.appspot.com",
    messagingSenderId: "907664852389",
    appId: "1:907664852389:web:1c373080b2394fd33a144c",
    measurementId: "G-MHV1CTKH93"
  };
  
const firebase = initializeApp(firebaseConfig);
const db = getFirestore(firebase)
const collectionRef = doc(db, 'tenants');



