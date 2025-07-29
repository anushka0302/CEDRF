import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDAOG7AJCBRbsS6mbxwPOC65sfCKkFI3Ys",
  authDomain: "cedrf-91d00.firebaseapp.com",
  projectId: "cedrf-91d00",
  storageBucket: "cedrf-91d00.appspot.com",
  messagingSenderId: "833387966042",
  appId: "1:833387966042:web:af4191f4d4f6514725f263",
  measurementId: "G-XTRT1C112M"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };