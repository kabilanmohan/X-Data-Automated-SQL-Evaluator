// Import the functions you need from the SDKs you need
import { initializeApp} from "firebase/app";
// import { createUserWithEmailAndPassword } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyuQxiX9dqBPLoaHgZ9MCFwkXmq4JTCXI",
  authDomain: "query-validator-cf9b7.firebaseapp.com",
  projectId: "query-validator-cf9b7",
  storageBucket: "query-validator-cf9b7.appspot.com",
  messagingSenderId: "431109036182",
  appId: "1:431109036182:web:a840217b26708a708f0ab7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const firestore = firebase.firestore();
// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
