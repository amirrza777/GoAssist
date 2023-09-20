// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {getFirestore, colleaction, collection} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcPzuzG0C4Hecrw-KlrQG2sF1Ktbz6l8c",
  authDomain: "goassist-d2d8e.firebaseapp.com",
  projectId: "goassist-d2d8e",
  storageBucket: "goassist-d2d8e.appspot.com",
  messagingSenderId: "24949705359",
  appId: "1:24949705359:web:dea98af69d5ae030dc7efa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export const distanceRef = collection(db, 'distance')
export const engineRef = collection(db, 'EngineType')

export default app;