// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJ_aNBy5YFTZtTlMacfbo3gKeaS67HiNw",
  authDomain: "assignment-test-10.firebaseapp.com",
  projectId: "assignment-test-10",
  storageBucket: "assignment-test-10.firebasestorage.app",
  messagingSenderId: "164442455990",
  appId: "1:164442455990:web:c025f86c36d24da4074b17"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);