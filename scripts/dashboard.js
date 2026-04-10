function getBusinessId() {
  return localStorage.getItem("business_id");
}

// Load dashboard data
initDashboard();

setInterval(initDashboard, 5000);
setInterval(processOrders, 5000); // every 5 sec
async function initDashboard() {
  await loadStats();
  await loadRecentLeads();
  await loadRecentChats();
}

// ------------------ STATS ------------------

async function loadStats() {
  // Total Leads
  const { data: leads } = await supabaseClient
    .from("leads")
    .select("*")
    .eq("business_id", getBusinessId());

  document.getElementById("totalLeads").innerText = leads?.length || 0;

  // New Today
  const today = new Date().toISOString().split("T")[0];

  const { data: todayLeads } = await supabaseClient
    .from("leads")
    .select("*")
    .eq("business_id", getBusinessId())
    .gte("created_at", today);

  document.getElementById("newToday").innerText = todayLeads?.length || 0;

  // Appointments Today
  const { data: appointments } = await supabaseClient
    .from("appointments")
    .select("*")
    .eq("business_id", getBusinessId())
    .gte("datetime", today);

  document.getElementById("appointmentsToday").innerText = appointments?.length || 0;

  // Active Conversations
  const { data: messages } = await supabaseClient
    .from("messages")
    .select("customer_id")
    .eq("business_id", getBusinessId());

  const uniqueUsers = new Set(messages?.map(m => m.customer_phone));
  document.getElementById("activeChats").innerText = uniqueUsers.size || 0;
}

// ------------------ RECENT LEADS ------------------

async function loadRecentLeads() {
  const { data } = await supabaseClient
    .from("leads")
    .select("*")
    .eq("business_id", getBusinessId())
    .order("created_at", { ascending: false })
    .limit(5);

  const container = document.getElementById("recentLeads");
  container.innerHTML = "";

  data?.forEach(lead => {
    const div = document.createElement("div");
    div.className = "lead-row";

    div.innerHTML = `
      <div>
        <div class="lead-name">${lead.customer_name || "Unknown"}</div>
        <div class="lead-phone">${lead.customer_phone || "-"}</div>
      </div>

      <span class="badge ${getBadgeClass(lead.status)}">
        ${lead.status || "New"}
      </span>

      <div class="lead-time">${timeAgo(lead.created_at)}</div>
    `;

    container.appendChild(div);
  });
}

// ------------------ RECENT CHATS ------------------

async function loadRecentChats() {
  const { data } = await supabaseClient
    .from("messages")
    .select("*")
    .eq("business_id", getBusinessId())
    .order("created_at", { ascending: false })
    .limit(10);

  const grouped = {};

  data?.forEach(msg => {
    if (!grouped[msg.customer_id]) {
      grouped[msg.customer_id] = msg;
    }
  });

  const container = document.getElementById("recentChats");
  container.innerHTML = "";

  Object.values(grouped).slice(0, 5).forEach(msg => {
    const div = document.createElement("div");
    div.className = "conv-row";

    div.innerHTML = `
      <div class="avatar">${getInitials(msg.customer_name)}</div>

      <div>
        <div class="conv-name">${msg.customer_name || "User"}</div>
        <div class="conv-preview">${msg.content || ""}</div>
      </div>

      <div class="conv-time">${timeAgo(msg.created_at)}</div>
    `;

    container.appendChild(div);
  });
}

// ------------------ HELPERS ------------------

function getBadgeClass(status) {
  if (!status) return "badge-new";

  status = status.toLowerCase();

  if (status === "new") return "badge-new";
  if (status === "contacted") return "badge-cont";
  if (status === "converted") return "badge-conv";

  return "badge-new";
}

function getInitials(name = "") {
  return name
    .split(" ")
    .map(n => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function timeAgo(date) {
  const diff = (new Date() - new Date(date)) / 1000;

  if (diff < 60) return "Just now";
  if (diff < 3600) return Math.floor(diff / 60) + "m ago";
  if (diff < 86400) return Math.floor(diff / 3600) + "h ago";

  return Math.floor(diff / 86400) + "d ago";
}

