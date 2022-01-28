import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import firebaseConfig from "../firebase-config";

const firebase = initializeApp(firebaseConfig);

const db = getFirestore(firebase);

export default db;
