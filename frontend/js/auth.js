async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch("http://localhost:3000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();
  console.log(data);

  if (data.token) {
    localStorage.setItem("token", data.token);
    window.location.href = "marketplace.html";
  } else {
    alert(data.message || "Login failed");
  }
}