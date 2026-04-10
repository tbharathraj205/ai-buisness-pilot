let currentStep = 1;

// ---------- NAVIGATION ----------
function nextStep() {
  document.getElementById(`step${currentStep}`).style.display = "none";
  currentStep++;

  const next = document.getElementById(`step${currentStep}`);
  if (next) {
    next.style.display = "block";
  }
  updateSteps();
}

function prevStep() {
  document.getElementById(`step${currentStep}`).style.display = "none";
  currentStep--;

  const prev = document.getElementById(`step${currentStep}`);
  if (prev) {
    prev.style.display = "block";
  }
  updateSteps();
}

// ---------- FAQ ----------
function addFAQ() {
  const container = document.getElementById("faqContainer");

  const div = document.createElement("div");
  div.className = "faq-item";

  div.innerHTML = `
    <input class="faq-q" placeholder="Question" />
    <input class="faq-a" placeholder="Answer" />
  `;

  container.appendChild(div);
}

function getFAQs() {
  const faqs = [];

  document.querySelectorAll(".faq-item").forEach(item => {
    const q = item.querySelector(".faq-q")?.value;
    const a = item.querySelector(".faq-a")?.value;

    if (q && a) {
      faqs.push({ question: q, answer: a });
    }
  });

  return JSON.stringify(faqs);
}

// ---------- SAVE ----------
async function finishSetup() {
  const { error } = await supabaseClient
    .from("businesses")
    .insert({
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
      name: document.getElementById("businessName").value,
      category: document.getElementById("category").value,
      phone: document.getElementById("phone").value,
      city: document.getElementById("city").value,
      hours: document.getElementById("hours")?.value,
      services: document.getElementById("services")?.value,
      faqs: getFAQs()
    });

  if (!error) {
    alert("Setup complete!");
    window.location.href = "login.html";
  } else {
    console.error(error);
  }
}


// ======= STEP UPDATE UI =======
function updateSteps() {
  const steps = document.querySelectorAll(".step");

  steps.forEach((s, i) => {
    s.classList.remove("active");
    if (i === currentStep - 1) {
      s.classList.add("active");
    }
  });
}