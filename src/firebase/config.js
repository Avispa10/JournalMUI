// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBetkLTCsGqS5Huzo_Aa5PyCZHCVgcIduk",
  authDomain: "react-journal-wasp.firebaseapp.com",
  projectId: "react-journal-wasp",
  storageBucket: "react-journal-wasp.appspot.com",
  messagingSenderId: "1052116711989",
  appId: "1:1052116711989:web:81b819fcb7b0f11d104f7c"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore (FirebaseApp)
