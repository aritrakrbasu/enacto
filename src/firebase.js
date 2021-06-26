import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/storage"
import "firebase/auth"

const app = firebase.initializeApp({
  apiKey: "AIzaSyDN7hp_BesHvWIcRrmaqMUbNoLdNEBxDBw",
  authDomain: "enacto-app.firebaseapp.com",
  projectId: "enacto-app",
  storageBucket: "enacto-app.appspot.com",
  messagingSenderId: "829579513909",
  appId: "1:829579513909:web:ac21256cd160a9cc65e17c",
  measurementId: "G-3M6XRMZJC4"
})

export const auth = app.auth()
export const db = firebase.firestore();
export var provider = new firebase.auth.GoogleAuthProvider();
export const firebasevalue = firebase.firestore.FieldValue;
export const storageRef = firebase.storage().ref();
export const timestamp = firebase.firestore.FieldValue.serverTimestamp()
export default app