async function loadTransactions() {
  const data = await apiRequest("/market/transactions");

  const container = document.getElementById("transactions");

  data.forEach(t => {
    container.innerHTML += `
      <div class="card">
        ${t.title} | ${t.type} | ${t.quantity}
      </div>
    `;
  });
}