import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCvK06pxNYpwaZ6XZ6Z8x22eUdEj9eYbCY",
    authDomain: "andreasjabrell.firebaseapp.com",
    databaseURL: "https://andreasjabrell-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "andreasjabrell",
    storageBucket: "andreasjabrell.appspot.com",
    messagingSenderId: "992452534203",
    appId: "1:992452534203:web:f84bca6ab4a4231f5eee9e"
  };


export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const usersRef = ref(db, 'users');
export const assignmentsRef = ref(db, '/assignments')