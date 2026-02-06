// Firebase 初始化（可选）
/*
const firebaseConfig = {
  apiKey:"你的APIKEY",
  authDomain:"你的项目.firebaseapp.com",
  projectId:"你的项目ID"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
*/

// 注册函数（前端演示，可集成 Firebase 或其他第三方）
function register(){
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  if(!email || !password){alert("Fill all fields"); return;}
  alert("Registration submitted! (Integrate Firebase for real email verification)");
}

// 找回密码
function resetPassword(){
  const email = document.getElementById("resetEmail").value;
  if(!email){alert("Enter email"); return;}
  alert("Password reset requested! (Integrate Firebase for real email link)");
}
