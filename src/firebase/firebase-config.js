import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyAdLDn7C29AM5wLMh5x4XZaN5yxS7-YtXo",
//   authDomain: "budget-5ce7e.firebaseapp.com",
//   projectId: "budget-5ce7e",
//   storageBucket: "budget-5ce7e.appspot.com",
//   messagingSenderId: "30391392422",
//   appId: "1:30391392422:web:972056a5cb306230437c67",
// };

// const app = initializeApp(firebaseConfig);

// export const db = getFirestore(app);

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
