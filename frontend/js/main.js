// Common functions for navigation and auth

// Navigate to different pages
function goTo(page) {
  window.location.href = page;
}

// Logout function
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  window.location.href = "login.html";
}

// Typing animation function
function typeWriter(element, text, speed = 50) {
  element.innerHTML = '';
  let i = 0;
  
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      // Add blinking cursor
      element.innerHTML += '<span class="typing-cursor">|</span>';
    }
  }
  
  type();
}

// Animate navbar text on load
window.addEventListener('load', () => {
  const text = document.getElementById('navbar-text');
  
  // Auf index.html: Typing-Animation mit Username
  if (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/')) {
    const username = localStorage.getItem('username') || 'USER';
    const fullText = `> HELLO ${username.toUpperCase()} - WELCOME TO OBSIDIAN RELAY.`;
    typeWriter(text, fullText, 50);
  } else {
    // Auf anderen Seiten: Typing-Animation mit vorhandenem Text
    const fullText = text.textContent;
    typeWriter(text, fullText, 80);
  }
});



// OPTIONAL: protect page
const token = localStorage.getItem("token");
if (!token) {
  window.location.href = "login.html";
}