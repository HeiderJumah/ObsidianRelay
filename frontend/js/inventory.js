// inventory.js - Handles inventory page interactions

// Load inventory on page load
async function loadInventory() {
  const data = await apiRequest("/inventory");

  const container = document.getElementById("inventory");
  container.innerHTML = "";

  data.forEach(item => {
    container.innerHTML += `
      <div class="card">
        ${item.title} x${item.quantity}
      </div>
    `;
  });
}

loadInventory();