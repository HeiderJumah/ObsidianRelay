// main.js - Common functions for navigation and auth

// Navigate to different pages
function goTo(page) {
  window.location.href = page;
}

// Logout function
function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}

// OPTIONAL: protect page
const token = localStorage.getItem("token");
if (!token) {
  window.location.href = "login.html";
}