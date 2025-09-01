import { auth, db } from "../config/firebase-config.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      username: username,
      email: email,
      miningBalance: 0,
      totalMined: 0,
      createdAt: new Date()
    });

    alert("✅ تم إنشاء الحساب بنجاح");
    window.location.href = "../dashboard/dashboard.html";
  } catch (error) {
    alert("❌ خطأ: " + error.message);
  }
});