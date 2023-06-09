// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGeqzqnGEygzEo4ffYnYvQid9tLvelMAs",
  authDomain: "e-commerce-6eb76.firebaseapp.com",
  databaseURL:
    "https://e-commerce-6eb76-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "e-commerce-6eb76",
  storageBucket: "e-commerce-6eb76.appspot.com",
  messagingSenderId: "118125107000",
  appId: "1:118125107000:web:432ebfa0f19018b92553cd",
  measurementId: "G-2RN8H1ZNTN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
