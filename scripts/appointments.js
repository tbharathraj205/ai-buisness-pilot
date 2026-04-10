// Get current business ID
function getBusinessId() {
  return localStorage.getItem("business_id");
}

// Convert status to badge class
function getStatusClass(status) {
  if (!status) return "badge";

  status = status.toLowerCase();

  if (status === "confirmed") return "badge confirmed";
  if (status === "pending") return "badge pending";
  if (status === "cancelled") return "badge cancelled";

  return "badge";
}

// Optional: format date nicely
function formatDate(datetime) {
  if (!datetime) return "-";

  const date = new Date(datetime);

  if (isNaN(date)) return datetime; // fallback if text

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit"
  });
}

// Main function
async function initAppointments() {
  try {
    const businessId = getBusinessId();

    if (!businessId) {
      console.log("No business ID found");
      return;
    }

    const { data, error } = await supabaseClient
      .from("appointments")
      .select("*")
      .eq("business_id", businessId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching appointments:", error);
      return;
    }

    console.log("Appointments:", data);

    const table = document.getElementById("appointmentsTable");

    if (!table) {
      console.log("Table element not found");
      return;
    }

    table.innerHTML = "";

    // If no data
    if (!data || data.length === 0) {
      table.innerHTML = `
        <tr>
          <td colspan="5" style="text-align:center; padding:20px;">
            No appointments found
          </td>
        </tr>
      `;
      return;
    }

    // Render data
    data.forEach(app => {
      table.innerHTML += `
        <tr>
          <td>${app.customer_name || "-"}</td>
          <td>${app.customer_phone || "-"}</td>
          <td>${app.service || "-"}</td>
          <td>${formatDate(app.datetime)}</td>
          <td>
            <span class="${getStatusClass(app.status)}">
              ${app.status || "-"}
            </span>
          </td>
        </tr>
      `;
    });

  } catch (err) {
    console.error("Unexpected error:", err);
  }
}

// Run
initAppointments();