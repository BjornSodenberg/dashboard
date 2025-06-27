// src/Firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const getDataFromFirestore = async () => {
    const querySnapshot = await getDocs(collection(db, "data"));
    const data = [];

    querySnapshot.forEach((doc) => {
        data.push(doc.data());
    });

    return data;
};

export default db;