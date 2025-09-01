import { auth, db } from "../config/firebase-config.js";
import { signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { doc, getDoc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const balanceEl = document.getElementById("balance");
const totalEl = document.getElementById("total");
const mineBtn = document.getElementById("mineBtn");
const logoutBtn = document.getElementById("logoutBtn");

// تحميل بيانات المستخدم
async function loadData() {
  const user = auth.currentUser;
  if (!user) {
    window.location.href = "../auth/login.html";
    return;
  }

  const userDoc = await getDoc(doc(db, "users", user.uid));
  if (userDoc.exists()) {
    const data = userDoc.data();
    balanceEl.textContent = data.miningBalance.toFixed(2);
    totalEl.textContent = data.totalMined.toFixed(2);
  }
}

// إضافة رصيد التعدين
async function addMiningReward(amount) {
  const user = auth.currentUser;
  if (!user) {
    alert("⚠️ سجل الدخول أولاً");
    return;
  }

  const userRef = doc(db, "users", user.uid);
  await updateDoc(userRef, {
    miningBalance: increment(amount),
    totalMined: increment(amount)
  });

  loadData(); // تحديث البيانات بعد التعدين
}

// زر التعدين
mineBtn.addEventListener("click", () => addMiningReward(0.01));

// زر تسجيل الخروج
logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "../auth/login.html";
});

// تحميل البيانات عند فتح الصفحة
loadData();