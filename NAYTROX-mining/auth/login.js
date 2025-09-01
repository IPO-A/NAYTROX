import { auth } from "../config/firebase-config.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("✅ تم تسجيل الدخول");
    window.location.href = "../dashboard/dashboard.html";
  } catch (error) {
    alert("❌ خطأ: " + error.message);
  }
});