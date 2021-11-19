import {getAuth, connectAuthEmulator} from "firebase/auth"
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore"
import firebase from "firebase/compat/app"
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCy9Q5bRqojCmB8OWmb3hCeUX4IePejfvY",
  authDomain: "chat-app-demo-ca0b4.firebaseapp.com",
  projectId: "chat-app-demo-ca0b4",
  storageBucket: "chat-app-demo-ca0b4.appspot.com",
  messagingSenderId: "980695992241",
  appId: "1:980695992241:web:531116cf3aaced29fe5f90",
  measurementId: "G-1N8M101L34"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
 connectAuthEmulator(auth, "http://localhost:9099");
 connectFirestoreEmulator(db, "http://localhost", "8080")
 if(window.location.hostname === "localhost"){
    }
 getAnalytics(app)
 
export {auth, db}
export default firebase;