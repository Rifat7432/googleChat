// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAv1ZloxNiSBt9zkz5RPF0ofqnYMT6vb_I",
  authDomain: "chat-cdbb7.firebaseapp.com",
  projectId: "chat-cdbb7",
  storageBucket: "chat-cdbb7.appspot.com",
  messagingSenderId: "442281142069",
  appId: "1:442281142069:web:f23c27279dd1959c0a8e7c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;