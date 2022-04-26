// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDr_JmXsfbmXLrXc2TpcD4T81bf_ltjT-8",
  authDomain: "ema-john-11-cf0c3.firebaseapp.com",
  projectId: "ema-john-11-cf0c3",
  storageBucket: "ema-john-11-cf0c3.appspot.com",
  messagingSenderId: "119323087598",
  appId: "1:119323087598:web:19502f84f5287f4f71d9ff",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
