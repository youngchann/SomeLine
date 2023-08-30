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
  apiKey: "firebaseconfig를 설정해주세요",
  authDomain: "firebaseconfig를 설정해주세요",
  projectId: "firebaseconfig를 설정해주세요",
  storageBucket: "firebaseconfig를 설정해주세요",
  messagingSenderId: "firebaseconfig를 설정해주세요",
  appId: "firebaseconfig를 설정해주세요"
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
