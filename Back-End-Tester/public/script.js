// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAzAFxWe3LOC9979AFi8hoSqxOvewYAvwo",
  authDomain: "basketballstats-f03ae.firebaseapp.com",
  projectId: "basketballstats-f03ae",
  storageBucket: "basketballstats-f03ae.appspot.com",
  messagingSenderId: "237581118780",
  appId: "1:237581118780:web:90442dc777ddd8c48a4239",
  measurementId: "G-9X72PCWB3T"
};

