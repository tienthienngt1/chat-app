import {getAuth, connectAuthEmulator, setPersistence, browserLocalPersistence} from "firebase/auth"
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore"
import firebase from "firebase/compat/app"
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
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

// set persist auth
(async () => {
    setPersistence(auth, browserLocalPersistence)
}) ()
 connectAuthEmulator(auth, "http://localhost:9099");
 connectFirestoreEmulator(db, "localhost", "8080")
 getAnalytics(app)
 
export {auth, db}
export default firebase;