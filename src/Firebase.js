// src/Firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCozLpoZ06Wi4MGbHgNVzeEZHGI3K5znQ8",
    authDomain: "dashboard-78440.firebaseapp.com",
    projectId: "dashboard-78440",
    storageBucket: "dashboard-78440.firebasestorage.app",
    messagingSenderId: "605040740231",
    appId: "1:605040740231:web:d30a1f264ab05b83803522"
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