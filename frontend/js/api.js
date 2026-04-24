// api.js - Helper functions for making API requests

const API_URL = "http://localhost:3000/api";

// Helper function to get token from localStorage
function getToken() {
  return localStorage.getItem("token");
}

// Generic function to make API requests
async function apiRequest(endpoint, method = "GET", body = null) {
  const res = await fetch(API_URL + endpoint, {
    method,
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + getToken()
    },
    body: body ? JSON.stringify(body) : null
  });

  return res.json();
}