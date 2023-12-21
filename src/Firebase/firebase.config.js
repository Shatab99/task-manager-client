import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCxeksx71rozfVHup7bB9Xm4gWiYRA92BI",
  authDomain: "simple-project-f74b4.firebaseapp.com",
  projectId: "simple-project-f74b4",
  storageBucket: "simple-project-f74b4.appspot.com",
  messagingSenderId: "454875937164",
  appId: "1:454875937164:web:b231569438111ca6a4fea9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)