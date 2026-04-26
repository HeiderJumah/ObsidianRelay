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
    const item = data.inventory?.[i];

    const slot = document.createElement("div");
    slot.classList.add("inventory-slot");

    if (item) {
      const tooltipText = `${item.title}\n${item.description || ''}\nQuantity: ${item.quantity}`;
      slot.title = tooltipText;
      
      slot.innerHTML = `
        <div class="inventory-item-tooltip">
          <strong>${item.title}</strong>
          <span>${item.description || ''}</span>
        </div>
        <div class="inventory-item-icon" 
            style="background-image: url('/media/items/${item.icon || ''}')"></div>
        <div class="item-qty">x${item.quantity}</div>
      `;
    } else {
      slot.innerHTML = `
        <div class="inventory-item-icon" style="opacity: 0.3;"></div>
      `;
    }

    container.appendChild(slot);
  }
}

loadInventory();