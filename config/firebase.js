import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC04KMcOAZF5_u855B6iozDtpDZpjQiqzs",
  authDomain: "example-b8c4d.firebaseapp.com",
  projectId: "example-b8c4d",
  storageBucket: "example-b8c4d.appspot.com",
  messagingSenderId: "934339496890",
  appId: "1:934339496890:web:0e1b331f835913c6acab83",
  measurementId: "G-GSL6S5C9PV",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
