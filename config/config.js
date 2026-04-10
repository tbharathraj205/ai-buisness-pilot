const SUPABASE_URL = "https://xlmqbadynhdueawicaff.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsbXFiYWR5bmhkdWVhd2ljYWZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU3MTc5NTQsImV4cCI6MjA5MTI5Mzk1NH0.T0xtHslL6Mtu7VNEjr9oyr5r-Z_oMYRHlZVP8jZ0tKs";

// Initialize Supabase
const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);


function getBusinessId() {
  return localStorage.getItem("business_id");
}