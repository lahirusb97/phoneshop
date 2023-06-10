// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBXLZvtj_vJRFBfUOH_lZM6Qs6bjtQy33g",
  authDomain: "e-commerce-9774a.firebaseapp.com",
  projectId: "e-commerce-9774a",
  storageBucket: "e-commerce-9774a.appspot.com",
  messagingSenderId: "825100389207",
  appId: "1:825100389207:web:902c4e04e4b1aba6128c12",
  measurementId: "G-9N7DREDJ44",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
