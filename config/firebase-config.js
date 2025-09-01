import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "ضع API KEY هنا",
  authDomain: "ضع AuthDomain هنا",
  projectId: "ضع ProjectID هنا",
  storageBucket: "ضع StorageBucket هنا",
  messagingSenderId: "ضع SenderId هنا",
  appId: "ضع AppId هنا"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);