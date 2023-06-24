// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdLDn7C29AM5wLMh5x4XZaN5yxS7-YtXo",
  authDomain: "budget-5ce7e.firebaseapp.com",
  projectId: "budget-5ce7e",
  storageBucket: "budget-5ce7e.appspot.com",
  messagingSenderId: "30391392422",
  appId: "1:30391392422:web:972056a5cb306230437c67",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Init service

export const db = getFirestore(app);
