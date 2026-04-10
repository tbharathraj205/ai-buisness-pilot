

async function loadInventory() {
  const businessId = localStorage.getItem("business_id");

  const { data, error } = await supabaseClient
    .from("inventory")
    .select("*")
    .eq("business_id", businessId);

  if (error) {
    console.error(error);
    return;
  }

  const tbody = document.getElementById("inventory-body");
  tbody.innerHTML = "";

  data.forEach(item => {
    const row = `
      <tr>
        <td>${item.product_name}</td>
        <td class="${item.stock < 5 ? 'low-stock' : ''}">
    ${item.stock}
    </td>
        <td>₹${item.price}</td>
      </tr>
    `;
    tbody.innerHTML += row;
  });
}

loadInventory();

// auto refresh
setInterval(loadInventory, 5000);