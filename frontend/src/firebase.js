import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAHeyO_rQQUchhEtMabHsaPWLp2OtkXgmc",
    authDomain: "eduquest-90801.firebaseapp.com",
    projectId: "eduquest-90801",
    storageBucket: "eduquest-90801.appspot.app",
    messagingSenderId: "932689227925",
    appId: "1:932689227925:web:5553c51043d62dcdd9ab9c",
    measurementId: "G-XQJCJXT2X8"
  };

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);