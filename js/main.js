// Firebase SDK 已在 HTML head 引入
const auth = firebase.auth();
const db = firebase.firestore();

// 注册
async function register(){
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  if(!email||!password){alert("Fill all fields"); return;}
  try{
    const userCredential = await auth.createUserWithEmailAndPassword(email,password);
    await userCredential.user.sendEmailVerification();
    alert("Verification email sent! Check your inbox.");
  }catch(e){alert(e.message);}
}

// 登录
async function login(){
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  try{
    await auth.signInWithEmailAndPassword(email,password);
    if(!auth.currentUser.emailVerified){
      alert("Please verify your email first");
      return;
    }
    alert("Login success");
  }catch(e){alert(e.message);}
}

// 找回密码
async function resetPassword(){
  const email = document.getElementById("resetEmail").value;
  if(!email){alert("Enter email"); return;}
  try{
    await auth.sendPasswordResetEmail(email);
    alert("Check your inbox for reset link");
  }catch(e){alert(e.message);}
}
