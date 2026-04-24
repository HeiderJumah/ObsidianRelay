async function loadMarket() {
  const data = await apiRequest("/market");

  const container = document.getElementById("market");

  data.forEach(item => {
    container.innerHTML += `
      <div class="card">
        ${item.title} - ${item.price} gold
        <button onclick="buy(${item.id})">Buy</button>
      </div>
    `;
  });
}

async function buy(itemId) {
  await apiRequest("/market/buy", "POST", {
    item_id: itemId,
    quantity: 1
  });

  alert("Bought!");
}

loadMarket();