import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBQq-Z2WGIcjr55TpH1MlTeLOPnhkhv8yg",
  authDomain: "pm-final-project.firebaseapp.com",
  projectId: "pm-final-project",
  storageBucket: "pm-final-project.firebasestorage.app",
  messagingSenderId: "1004038466905",
  appId: "1:1004038466905:web:f5a339d93a3dc2b2d23048",
  measurementId: "G-JZTMRFNKRL"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
