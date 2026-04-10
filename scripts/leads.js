
function getBusinessId() {
  return localStorage.getItem("business_id");
}

async function loadLeads() {
  const businessId = localStorage.getItem("business_id");

  console.log("Business ID:", businessId);

  const { data, error } = await supabaseClient
    .from("leads")
    .select("customer_name, customer_phone, status") // ✅ only required fields
    .eq("business_id", businessId);

  if (error) {
    console.error("Error:", error);
    return;
  }

  console.log("Leads:", data);

  const tbody = document.getElementById("leads-body");

  if (!tbody) {
    console.error("❌ tbody not found");
    return;
  }

  tbody.innerHTML = "";

  data.forEach(lead => {
    tbody.innerHTML += `
      <tr>
        <td>${lead.customer_name}</td>
        <td>${lead.customer_phone}</td>
        <td>${lead.status}</td>
      </tr>
    `;
  });
}

// VERY IMPORTANT
setTimeout(loadLeads, 300);