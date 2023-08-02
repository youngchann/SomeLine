// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider, signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,} from "firebase/auth"
import {getFirestore} from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtSZy21CsUnkRwUg_ZJdTDDjXdPnNuG9s",
  authDomain: "chatapp-a206b.firebaseapp.com",
  projectId: "chatapp-a206b",
  storageBucket: "chatapp-a206b.appspot.com",
  messagingSenderId: "573917547452",
  appId: "1:573917547452:web:88771b4635f190e53279b9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const signUpEmail = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password)
}
export const loginEmail = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
}
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)
export const storage = getStorage(app)
export const firebase = app
