// Handles inventory page interactions

// Load inventory on page load
async function loadInventory() {
  const data = await apiRequest("/inventory");

  const container = document.getElementById("inventory");
  container.innerHTML = "";

  // Credits setzen (wenn vorhanden)
  if (data.gold !== undefined) {
    document.getElementById("credits").innerText = data.gold;
  }

  // Slots (immer 12 anzeigen)
  const maxSlots = 12;

  for (let i = 0; i < maxSlots; i++) {
    const item = data.items?.[i];

    const slot = document.createElement("div");
    slot.classList.add("inventory-slot");

    if (item) {
      slot.innerHTML = `
        <img src="/media/items/${item.icon || 'placeholder.png'}">
        <div class="item-qty">x${item.quantity}</div>
        <div class="tooltip">${item.title} (${item.quantity})</div>
      `;
    }

    container.appendChild(slot);
  }
}

loadInventory();