// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD50BsmIbqUPPrYrBPmIOaAKcGTUNA6wFo",
  authDomain: "koalita-223b7.firebaseapp.com",
  projectId: "koalita",
  storageBucket: "koalita.appspot.com",
  messagingSenderId: "640368484641",
  appId: "1:640368484641:web:dd7a74f405961d1561de60",
  measurementId: "G-KWQ6Z3G6JV"
};

// Initialize Firebase
if (typeof window !== "undefined") {
     const app = initializeApp(firebaseConfig);
     // eslint-disable-next-line no-unused-vars
     const analytics = getAnalytics(app);
     logEvent(analytics, 'Accueil triggered')
    console.log("Hey, mais regardez pas ma console !!")
  }

