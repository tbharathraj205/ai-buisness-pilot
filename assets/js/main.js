const pageContainer = document.getElementById("page-container");

// ---------- CHECK SETUP ----------
async function checkSetup() {
  const businessId = localStorage.getItem("business_id");

  if (!businessId) {
    window.location.href = "pages/login.html";
    return;
  }

  navigate("dashboard");
}

// ---------- NAVIGATION ----------
function navigate(page) {
  setActiveNav(page);

  switch (page) {
    case "dashboard":
      loadPage("pages/dashboard.html", "scripts/dashboard.js");
      break;


    case "conversations":
      loadPage("pages/conversations.html", "scripts/conversations.js");
      break;

    case "appointments":
        loadPage("pages/appointments.html", "scripts/appointments.js");
        break;
    case "orders":
        loadPage("pages/orders.html", "scripts/orders.js");
        break;
    case "inventory":
        loadPage("pages/inventory.html", "scripts/inventory.js");
        break;
  }
}

// ---------- LOAD PAGE ----------
function loadPage(htmlPath, scriptPath) {
  fetch(htmlPath)
    .then(res => res.text())
    .then(html => {
      pageContainer.innerHTML = html;

      // Remove old scripts
      document.querySelectorAll(".page-script").forEach(s => s.remove());

      // Add new script
      const script = document.createElement("script");
      script.src = scriptPath;
      script.classList.add("page-script");
      document.body.appendChild(script);
    });
}

// ---------- NAV UI ----------
function setActiveNav(page) {
  document.querySelectorAll(".nav-link").forEach(link => {
    link.classList.remove("active");
  });

  const map = {
  dashboard: 0,
  leads: 1,
  conversations: 2,
  appointments: 3,
  inventory: 4
};

  document.querySelectorAll(".nav-link")[map[page]]?.classList.add("active");
}

// ---------- RUN APP ----------
window.onload = () => {
  checkSetup();
};

// ---------- LOGOUT ----------
function logout() {
  localStorage.removeItem("business_id");
  window.location.href = "pages/login.html";
}