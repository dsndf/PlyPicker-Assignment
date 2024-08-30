// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARgLAXkw6q7tk06J6EhOGxiUNf9XTyitE",
  authDomain: "nextjs-4c497.firebaseapp.com",
  projectId: "nextjs-4c497",
  storageBucket: "nextjs-4c497.appspot.com",
  messagingSenderId: "365806736256",
  appId: "1:365806736256:web:6d024870579ab1502f2765"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imgDb = getStorage(app);