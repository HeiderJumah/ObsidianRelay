let allTransactions = [];

async function loadTransactions() {
  try {
    const data = await apiRequest("/market/transactions");

    allTransactions = data;

    renderTransactions(data);
  } catch (err) {
    console.error("Fehler beim Laden der Transaktionen:", err);
  }
}

function renderTransactions(list) {
  const container = document.getElementById("transactions");
  container.innerHTML = "";

  if (!list.length) {
    container.innerHTML = `<p style="color:#888;">NO TRANSACTIONS</p>`;
    return;
  }

  list.forEach(t => {
    const div = document.createElement("div");
    div.className = "inventory-item";

    div.innerHTML = `
      <div class="inventory-item-icon"
        style="background-image:url('/media/items/${t.icon || 'default.png'}')">
      </div>

      <div style="font-size:12px; text-align:center;">
        ${t.title}
      </div>

      <div style="font-size:11px; color:${t.type === 'buy' ? '#4fdb44' : '#ff6644'};">
        ${t.type.toUpperCase()}
      </div>

      <div style="font-size:11px;">
        x${t.quantity}
      </div>

      <div class="inventory-item-price">
        ${t.price}C
      </div>

      <div style="font-size:10px; color:#aaa;">
        ${new Date(t.created_at).toLocaleString()}
      </div>
    `;

    container.appendChild(div);
  });
}

function filterTransactions(type) {
  if (type === "all") {
    renderTransactions(allTransactions);
    return;
  }

  const filtered = allTransactions.filter(t => t.type === type);
  renderTransactions(filtered);
}

loadTransactions();