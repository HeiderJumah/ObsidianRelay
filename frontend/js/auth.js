// Handles login and registration interactions

// switch between login and register forms
function showLogin() {
  document.getElementById("loginForm").style.display = "flex";
  document.getElementById("registerForm").style.display = "none";
}

function showRegister() {
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("registerForm").style.display = "flex";
}

// handle login and registration
async function login() {
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  const res = await fetch("http://localhost:3000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();
    console.log("LOGIN RESPONSE:", data);

    if (data.token) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("username", username);
    document.getElementById("statusText").innerText = "Login success";
  
     setTimeout(() => {
        window.location.href = "index.html";
    }, 800);
        } else {
        document.getElementById("statusText").innerText = "Login failed";
        }
}

// handle registration
async function register() {
  const email = document.getElementById("registerEmail").value;
  const username = document.getElementById("registerUsername").value;
  const password = document.getElementById("registerPassword").value;

  const res = await fetch("http://localhost:3000/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, username, password })
  });

  const data = await res.json();

  // REGISTER

document.getElementById("statusText").innerText =
  "Register complete. Please login.";
showLogin();

}