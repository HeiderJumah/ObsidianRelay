// Market page with NPC shopping and inventory management

let npcs = [];
let currentNPC = null;
let userInventory = [];

// ========== API HELPER ==========

async function apiFetch(path, options = {}) {
  const base = "http://localhost:3000";
  const token = localStorage.getItem("token");

  const response = await fetch(`${base}${path}`, {
    ...options,
    headers: {
      "Authorization": `Bearer ${token}`,
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers
    }
  });

  const data = await response.json();
  return { response, data };
}

// ========== LOAD DATA ==========

function renderNPCSelection() {
  const container = document.getElementById('npcSelection');
  container.innerHTML = '';

  if (npcs.length === 0) {
    container.innerHTML = '<p style="color:#4f7cff;font-family:monospace;">NO VENDORS AVAILABLE</p>';
    return;
  }

  npcs.forEach(npc => {
    const card = document.createElement('div');
    card.className = 'npc-card';
    card.onclick = () => openNPC(npc.id);
    card.innerHTML = `
      <div class="npc-name">${npc.name}</div>
      <div class="npc-avatar" style="background-image: url('${npc.avatar || '/media/website_icons/habitat_icon.png'}')"></div>
    `;
    container.appendChild(card);
  });
}

async function loadNPCs() {
  try {
    const { data } = await apiFetch('/api/market/npcs');
    if (!Array.isArray(data)) { console.error('NPCs: kein Array', data); return; }
    npcs = data;
    renderNPCSelection();
  } catch (err) {
    console.error('Error loading NPCs:', err);
  }
}

async function loadInventory() {
  try {
    const { data } = await apiFetch('/api/inventory');
    userInventory = data.inventory || [];
    if (data.gold !== undefined) {
      const el = document.getElementById('userCredits');
      if (el) el.textContent = `YOU: ${data.gold}C`;
    }
  } catch (err) {
    console.error('Error loading inventory:', err);
  }
}

// ========== NPC SELECTION ==========

async function openNPC(npcId) {
  await loadInventory();

  currentNPC = npcs.find(n => n.id === npcId);
  if (!currentNPC) return;

  try {
    const { data } = await apiFetch(`/api/market/npcs/${npcId}/items`);
    currentNPC.items = Array.isArray(data) ? data : [];
  } catch (err) {
    console.error('Error loading NPC items:', err);
  }

  document.getElementById('npcSelection').classList.add('hidden');
  document.getElementById('npcDetail').classList.remove('hidden');
  document.getElementById('npcDetailName').textContent = currentNPC.name;
  document.getElementById('npcDescription').textContent = currentNPC.description;
  document.getElementById('npcCredits').textContent = `CREDITS: ${currentNPC.credits ?? 1000}C`;

  renderShopItems();
  renderPlayerInventory();
}

function closeNPC() {
  document.getElementById('npcDetail').classList.add('hidden');
  document.getElementById('npcSelection').classList.remove('hidden');
  currentNPC = null;
}

// ========== RENDER ==========

function renderShopItems() {
  const container = document.getElementById('npcShopItems');
  container.innerHTML = '';

  if (!currentNPC || !Array.isArray(currentNPC.items)) {
    return;
  }

  currentNPC.items.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'shop-item';
    itemDiv.innerHTML = `
      <div class="shop-item-tooltip">
        <strong>${item.title}</strong>
        <span>${item.description}</span>
      </div>
      <div class="shop-item-icon" style="background-image: url('/media/items/${item.icon}')"></div>
      <div class="shop-item-price">${item.price}C</div>
      <div class="shop-item-controls">
        <input class="qty-input" type="number" id="qty-buy-${item.id}" value="1" min="1">
        <button class="item-btn buy-btn" onclick="buyItem(${item.id})">BUY</button>
      </div>
    `;
    container.appendChild(itemDiv);
  });
}

function renderPlayerInventory() {
  const container = document.getElementById('playerInventory');
  container.innerHTML = '';

  if (userInventory.length === 0) {
    container.innerHTML = '<p style="color:#ff6644;font-family:monospace;font-size:12px;">INVENTORY EMPTY</p>';
    return;
  }

  userInventory.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'inventory-item';
    const sellPrice = Math.floor(item.price * 0.5);
    itemDiv.innerHTML = `
      <div class="inventory-item-tooltip">
        <strong>${item.title}</strong>
        <span>${item.description}</span>
      </div>
      <div class="inventory-item-icon" style="background-image: url('/media/items/${item.icon || 'market_icon.png'}')"></div>
      <div class="inventory-item-qty">${item.quantity}x</div>
      <div class="inventory-item-price">${sellPrice}C</div>
      <div class="inventory-item-controls">
        <input class="qty-input qty-sell" type="number" id="qty-sell-${item.item_id}" value="1" min="1" max="${item.quantity}">
        <button class="item-btn sell-btn" onclick="sellItem(${item.item_id})">SELL</button>
      </div>
    `;
    container.appendChild(itemDiv);
  });
}

// ========== BUY / SELL ==========

async function buyItem(itemId) {
  const qtyInput = document.getElementById(`qty-buy-${itemId}`);
  const quantity = parseInt(qtyInput.value) || 1;
  if (quantity < 1) { showMessage('Menge muss mindestens 1 sein', 'error'); return; }

  try {
    const { response, data } = await apiFetch('/api/market/buy', {
      method: 'POST',
      body: JSON.stringify({ item_id: itemId, npc_id: currentNPC.id, quantity })
    });

    if (response.ok) {
      showMessage(`✓ Gekauft x${quantity}`, 'success');
      updateUserCredits(data.gold_left);
      updateNpcCredits(data.npc_gold_left);
      qtyInput.value = '1';
      await loadInventory();
      renderPlayerInventory();
    } else {
      showMessage(`✗ ${data.message || 'Kauf fehlgeschlagen'}`, 'error');
    }
  } catch (err) {
    console.error('Buy error:', err);
    showMessage('Fehler beim Kauf', 'error');
  }
}

async function sellItem(itemId) {
  const qtyInput = document.getElementById(`qty-sell-${itemId}`);
  const quantity = parseInt(qtyInput.value) || 1;
  const invItem = userInventory.find(i => i.item_id === itemId);
  if (!invItem) {
    showMessage('Item nicht im Inventar gefunden', 'error');
    return;
  }
  if (quantity < 1 || quantity > invItem.quantity) { showMessage('Ungültige Menge', 'error'); return; }

  try {
    const { response, data } = await apiFetch('/api/market/sell', {
      method: 'POST',
      body: JSON.stringify({ item_id: itemId, npc_id: currentNPC.id, quantity })
    });

    if (response.ok) {
      showMessage(`✓ Verkauft x${quantity} | +${data.earned}C`, 'success');
      updateUserCredits(data.gold_left);
      updateNpcCredits(data.npc_gold_left);
      qtyInput.value = '1';
      await loadInventory();
      renderPlayerInventory();
    } else {
      showMessage(`✗ ${data.message || 'Verkauf fehlgeschlagen'}`, 'error');
    }
  } catch (err) {
    console.error('Sell error:', err);
    showMessage('Fehler beim Verkauf', 'error');
  }
}

// ========== HELPERS ==========

    function updateNpcCredits(credits) {
      const el = document.getElementById('npcCredits');
      if (el && credits !== undefined) {
        el.textContent = `CREDITS: ${credits}C`;
        el.style.transition = 'color 0.3s';
        el.style.color = '#4fdb44';
        setTimeout(() => el.style.color = '#ffc107', 800);
      }
    }

    function updateUserCredits(credits) {
    const el = document.getElementById('userCredits');
    if (el) {
      el.textContent = `CREDITS: ${credits}C`;
    }
    }

function showMessage(text, type) {
  const msg = document.createElement('div');
  msg.className = `market-message ${type}`;
  msg.textContent = text;
  document.body.appendChild(msg);
  setTimeout(() => msg.remove(), 3000);
}

// ========== INIT ==========

window.addEventListener('load', async () => {
  await loadNPCs();
  await loadInventory();
  renderPlayerInventory();
  renderShopItems();
});