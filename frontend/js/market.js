// Handles market page interactions, including NPC list, item display, and buying items

// NPC Liste mit Details
const npcs = [
  { 
    id: 0, 
    name: "TECH DEALER", 
    credits: "15.000C",
    description: "Spezialist für Technologie und Elektronik. Verkauft High-Tech Ausrüstung.",
    items: [
      { id: 1, name: "MICROCHIP", price: 500 },
      { id: 2, name: "CIRCUIT BOARD", price: 1200 },
      { id: 3, name: "NEURAL LINK", price: 5000 }
    ]
  },
  { 
    id: 1, 
    name: "BLACK MARKET", 
    credits: "22.500C",
    description: "Illegale Waren und seltene Gegenstände. Keine Fragen gestellt.",
    items: [
      { id: 4, name: "ENCRYPTED DATA", price: 800 },
      { id: 5, name: "STOLEN ARTIFACT", price: 3000 },
      { id: 6, name: "FORBIDDEN TECH", price: 7500 }
    ]
  },
  { 
    id: 2, 
    name: "ARCHIVE BOT", 
    credits: "8.500C",
    description: "Digitale Archive und historische Daten. Informationen sind kostbar.",
    items: [
      { id: 7, name: "HISTORY DATA PACK", price: 400 },
      { id: 8, name: "LEGACY CODE", price: 1500 },
      { id: 9, name: "ANCIENT BLUEPRINT", price: 4200 }
    ]
  },
  { 
    id: 3, 
    name: "HABITAT AI", 
    credits: "18.750C",
    description: "Umwelt- und Biodaten Spezialist. Bietet Habitat-Upgrades an.",
    items: [
      { id: 10, name: "SEED STOCK", price: 350 },
      { id: 11, name: "BIOTECH MODULE", price: 2800 },
      { id: 12, name: "ECOSYSTEM CORE", price: 6000 }
    ]
  }
];

let currentNPC = null;

// OPEN NPC VIEW
function openNPC(npcIndex) {
  currentNPC = npcs[npcIndex];
  
  // Hide NPC selection, show detail
  document.getElementById("npcSelection").classList.add("hidden");
  document.getElementById("npcDetail").classList.remove("hidden");
  
  // Fill NPC details
  document.getElementById("npcDetailName").textContent = currentNPC.name;
  document.getElementById("npcCredits").textContent = `CREDITS: ${currentNPC.credits}`;
  document.getElementById("npcDescription").textContent = currentNPC.description;
  
  // Render items
  renderItems();
}

// RENDER ITEMS
function renderItems() {
  const container = document.getElementById("npcItems");
  container.innerHTML = "";
  
  currentNPC.items.forEach(item => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "npc-item";
    itemDiv.innerHTML = `
      <div class="item-name">${item.name}</div>
      <div class="item-price">${item.price}C</div>
      <div class="item-actions">
        <button class="item-btn buy-btn" onclick="buyItem(${item.id})">BUY</button>
        <button class="item-btn sell-btn" onclick="sellItem(${item.id})">SELL</button>
      </div>
    `;
    container.appendChild(itemDiv);
  });
}

// BACK BUTTON
function closeNPC() {
  document.getElementById("npcDetail").classList.add("hidden");
  document.getElementById("npcSelection").classList.remove("hidden");
  currentNPC = null;
}

// BUY ITEM
async function buyItem(itemId) {
  try {
    const response = await fetch("http://localhost:3000/api/market/buy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        item_id: itemId,
        npc_id: currentNPC.id,
        quantity: 1
      })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      showMessage(`Gekauft: ${data.item_name}`, "success");
    } else {
      showMessage(data.message || "Kauf fehlgeschlagen", "error");
    }
  } catch (err) {
    console.error(err);
    showMessage("Fehler beim Kauf", "error");
  }
}

// SELL ITEM
async function sellItem(itemId) {
  try {
    const response = await fetch("http://localhost:3000/api/market/sell", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        item_id: itemId,
        npc_id: currentNPC.id,
        quantity: 1
      })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      showMessage(`Verkauft: ${data.item_name}`, "success");
    } else {
      showMessage(data.message || "Verkauf fehlgeschlagen", "error");
    }
  } catch (err) {
    console.error(err);
    showMessage("Fehler beim Verkauf", "error");
  }
}

// FEEDBACK MESSAGE
function showMessage(text, type) {
  const msg = document.createElement("div");
  msg.className = "market-message " + type;
  msg.innerText = text;
  
  document.body.appendChild(msg);
  
  setTimeout(() => {
    msg.remove();
  }, 3000);
}

loadMarket();
renderNPCs();