function getBusinessId() {
  return localStorage.getItem("business_id");
}

// Status badge
function getStatusClass(status) {
  if (!status) return "badge";

  status = status.toLowerCase();

  if (status === "completed") return "badge confirmed";
  if (status === "pending") return "badge pending";
  if (status === "cancelled") return "badge cancelled";

  return "badge";
}

async function initOrders() {
  try {
    const businessId = getBusinessId();

    if (!businessId) {
      console.log("No business ID");
      return;
    }

    const { data, error } = await supabaseClient
      .from("orders")
      .select("*")
      .eq("business_id", businessId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Orders error:", error);
      return;
    }

    console.log("Orders:", data);

    const table = document.getElementById("ordersTable");

    if (!table) return;

    table.innerHTML = "";

    if (!data || data.length === 0) {
      table.innerHTML = `
        <tr>
          <td colspan="5" style="text-align:center; padding:20px;">
            No orders found
          </td>
        </tr>
      `;
      return;
    }

    data.forEach(order => {
      table.innerHTML += `
        <tr>
          <td>${order.customer_name || "-"}</td>
          <td>${order.customer_phone || "-"}</td>
          <td>${order.product || "-"}</td>
          <td>${order.quantity || 1}</td>
          <td>
            <span class="${getStatusClass(order.status)}">
              ${order.status || "-"}
            </span>
          </td>
        </tr>
      `;
    });

  } catch (err) {
    console.error("Unexpected error:", err);
  }
}

initOrders();

async function processOrders() {
  const businessId = localStorage.getItem("business_id");

  // 1. Get unprocessed orders
  const { data: orders, error } = await supabaseClient
    .from("orders")
    .select("*")
    .eq("business_id", businessId)
    .eq("processed", false);

  if (error) {
    console.error("Order fetch error:", error);
    return;
  }

  if (!orders || orders.length === 0) return;

  for (let order of orders) {
    await handleOrder(order);
  }
}

async function handleOrder(order) {
  const businessId = localStorage.getItem("business_id");

  // 2. Find product in inventory
  const { data: item, error } = await supabaseClient
    .from("inventory")
    .select("*")
    .ilike("product_name", `%${order.product}%`)
    .eq("business_id", businessId)
    .single();

  if (error || !item) {
    console.error("Product not found:", order.product);
    return;
  }

  // 3. Check stock
  if (item.stock < order.quantity) {
    console.warn("Not enough stock for:", order.product);
    return;
  }

  // 4. Update inventory
  await supabaseClient
    .from("inventory")
    .update({
      stock: item.stock - order.quantity
    })
    .eq("id", item.id);

  // 5. Mark order as processed
  await supabaseClient
    .from("orders")
    .update({ processed: true })
    .eq("id", order.id);

  console.log(`✅ Processed order: ${order.product}`);
}