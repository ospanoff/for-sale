import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
import firebaseConfig from "../firebase-config";

const firebase = initializeApp(firebaseConfig);

export default firebase;

const db = getFirestore(firebase);

export const itemsColRef = collection(db, "items");
