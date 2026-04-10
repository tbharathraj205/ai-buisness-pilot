function getBusinessId() {
  return localStorage.getItem("business_id");
}


async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { data } = await supabaseClient
    .from("businesses")
    .select("*")
    .eq("email", email)
    .eq("password", password)
    .single();

  if (data) {
    // 🔥 THIS LINE IS VERY IMPORTANT
    localStorage.setItem("business_id", data.id);

    window.location.href = "../index.html";
  } else {
    alert("User not found");
  }
}

function goToSetup() {
  window.location.href = "setup.html";
}