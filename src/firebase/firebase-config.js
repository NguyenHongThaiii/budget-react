import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAx2C-LMNE4kddZ6LLrz-0gFGFEnbetDnk",
  authDomain: "budget-new-app.firebaseapp.com",
  projectId: "budget-new-app",
  storageBucket: "budget-new-app.appspot.com",
  messagingSenderId: "590397050178",
  appId: "1:590397050178:web:28bd2646fe671723faccdb",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
