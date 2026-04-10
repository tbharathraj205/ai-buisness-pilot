function getBusinessId() {
  return localStorage.getItem("business_id");
}

let allMessages = [];
let conversations = {};
let activeCustomer = null;

// Load data
initConversations();
setInterval(initConversations, 3000);
async function initConversations() {
  await fetchMessages();
  renderConversationList();
}

// ------------------ FETCH ------------------

async function fetchMessages() {
  const { data, error } = await supabaseClient
    .from("messages")
    .select("*")
    .eq("business_id", getBusinessId())
    .order("created_at", { ascending: true });

  if (error) {
    console.error(error);
    return;
  }

  allMessages = data || [];

  // Group by customer
  conversations = {};

  allMessages.forEach(msg => {
    if (!conversations[msg.customer_phone]) {
  conversations[msg.customer_phone] = [];
}
conversations[msg.customer_phone].push(msg);
  });

  document.getElementById("chatCount").innerText =
    Object.keys(conversations).length + " active";
}

// ------------------ CONVERSATION LIST ------------------

function renderConversationList() {
  const container = document.getElementById("conversationList");
  container.innerHTML = "";

  Object.entries(conversations).forEach(([customerPhone, msgs]) => {
    const lastMsg = msgs[msgs.length - 1];

    const div = document.createElement("div");
    div.className = "conv-item";
    div.onclick = () => openChat(customerPhone);

    div.innerHTML = `
      <div class="avatar">${getInitials(lastMsg.customer_name)}</div>

      <div style="flex:1">
        <div class="ci-name">${lastMsg.customer_name || "User"}</div>
        <div class="ci-prev">${lastMsg.content || ""}</div>
      </div>

      <div style="font-size:10px;color:#ccc">
        ${timeAgo(lastMsg.created_at)}
      </div>
    `;

    container.appendChild(div);
  });
}

// ------------------ OPEN CHAT ------------------

function openChat(customerPhone) {
  activeCustomer = customerPhone;

  // Highlight active
  document.querySelectorAll(".conv-item").forEach(i =>
    i.classList.remove("active")
  );
  event.currentTarget.classList.add("active");

  const msgs = conversations[customerPhone];
  if (!msgs) return;

  const first = msgs[0];

  // Update header
  document.getElementById("chatName").innerText =
    first.customer_name || "User";

  document.getElementById("chatAvatar").innerText =
    getInitials(first.customer_name);

  renderMessages(msgs);
}

// ------------------ MESSAGES ------------------

function renderMessages(msgs) {
  const container = document.getElementById("messagesContainer");
  container.innerHTML = "";

  msgs.forEach(msg => {
    const div = document.createElement("div");
    div.className = "msg " + (msg.role === "user" ? "user" : "bot");

    div.innerHTML = `
      ${msg.content}
      <div class="msg-time">${formatTime(msg.created_at)}</div>
    `;

    container.appendChild(div);
  });

  // Auto scroll
  container.scrollTop = container.scrollHeight;
}

// ------------------ HELPERS ------------------

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

  if (diff < 60) return "now";
  if (diff < 3600) return Math.floor(diff / 60) + "m";
  if (diff < 86400) return Math.floor(diff / 3600) + "h";

  return Math.floor(diff / 86400) + "d";
}

function formatTime(date) {
  return new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });
}