# 🤖 AI Business Autopilot

> An AI-powered virtual assistant that automates customer communication, lead capture, appointment booking, and order handling for local businesses through a WhatsApp-style chat interface.

![License](https://img.shields.io/badge/license-MIT-blue)
![Stack](https://img.shields.io/badge/stack-Node.js%20%7C%20OpenAI%20%7C%20Supabase%20%7C%20Pinecone-green)
![Status](https://img.shields.io/badge/status-Active-brightgreen)

---

## 📌 Problem Statement

Local businesses often lose potential customers due to missed calls, delayed replies to WhatsApp messages, and no structured way to manage leads and bookings. Hiring dedicated staff to handle repetitive customer queries is expensive and unscalable. Existing chatbot tools lack contextual understanding, require complex setup, and cannot perform real business actions like booking an appointment or placing an order. AI Business Autopilot solves this by acting as a 24/7 virtual assistant that automates customer communication, captures leads, manages appointments and orders — all through a simple chat interface that any business owner can configure in minutes.

---

## 🚀 Features

| Feature | Description |
|---|---|
| 💬 Chat Interface | WhatsApp-style interface for customer interaction with the AI agent |
| 🤖 AI Chat Agent | Context-aware responses using RAG — customer queries matched against business FAQs via Pinecone and answered by OpenAI |
| 📋 Lead Capture | Automatically extracts customer name and phone from conversation and stores them in Supabase |
| 📅 Appointment Booking | Customers can book available service slots directly through the chat interface |
| 🛒 Order Management | Orders are created directly from chat based on detected customer intent |
| 📦 Inventory Sync | Inventory is automatically updated in Supabase after each confirmed order |
| 📞 Missed Call Follow-up | Auto-response simulation triggered for missed calls to re-engage the customer |
| 📊 Dashboard | Business owner views leads, conversations, orders, and appointments in one place |
| ⚙️ 3-Step Onboarding | Quick setup for business details, services/products with timings, and FAQs |

---

## 🏗️ Tech Stack

### Frontend
- 🌐 HTML, CSS, JavaScript — Chat interface (WhatsApp-style widget) and business owner dashboard

### Backend
- 🟢 Node.js — Core server handling chat events, AI orchestration, and business logic

### Database
- 🟩 Supabase (PostgreSQL) — Stores leads, orders, appointments, inventory, and business configuration

### AI & RAG
- 🤖 OpenAI — Generates context-aware responses to customer messages
- 🌲 Pinecone — Vector database for semantic FAQ search; business FAQs embedded at onboarding and retrieved at inference time

---

## 📂 Project Structure

```
Business Autopilot/
│
├── index.html                          # Application entry point
│
├── README.md                           # Project documentation
│
├── /assets
│   ├── /css
│   │   ├── conversations.css
│   │   ├── dashboard.css
│   │   ├── global.css
│   │   ├── leads.css
│   │   └── setup.css
│   │
│   ├── /js
│   │   ├── api.js                      # API communication layer
│   │   ├── main.js                     # App initialization & routing
│   │   ├── state.js                    # Global state management
│   │   └── utils.js                    # Helper functions
│   │
│   ├── /images                         # Icons, avatars, logos
│   │
│   └── /fonts                          # Custom fonts (optional)
│
├── /components                         # Reusable UI components
│   ├── chat-item.html
│   ├── faq-item.html
│   ├── lead-item.html
│   ├── message-bubble.html
│   ├── navbar.html
│   ├── sidebar.html
│   └── stat-card.html
│
├── /pages                              # Main application pages
│   ├── appointments.html
│   ├── conversations.html
│   ├── dashboard.html
│   ├── inventory.html
│   ├── leads.html
│   ├── login.html
│   ├── orders.html
│   └── setup.html
│
├── /scripts                            # Page-specific JavaScript logic
│   ├── appointments.js
│   ├── conversations.js
│   ├── dashboard.js
│   ├── inventory.js
│   ├── leads.js
│   ├── login.js
│   ├── orders.js
│   └── setup.js
│
├── /data                               # Mock/demo data
│   ├── chats.json
│   ├── faq.json
│   └── leads.json
│
└── /config                             # Configuration files
    └── config.js                       # API URLs & environment config
```

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js 18+
- A Supabase project (free tier works)
- OpenAI API key
- Pinecone API key

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/ai-business-autopilot.git
cd ai-business-autopilot
```

### 2. Configure Environment Variables

```bash
cp .env.example .env
```

Edit `.env` and set:
```
OPENAI_API_KEY=your_openai_api_key
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your_supabase_anon_key
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_INDEX=business-faqs
PORT=3000
```

### 3. Install Dependencies

```bash
cd server
npm install
```

### 4. Start the Server

```bash
node index.js
```

### 5. Open the App

- Customer chat widget: `http://localhost:3000/widget`
- Business dashboard: `http://localhost:3000/dashboard`
- API docs (if enabled): `http://localhost:3000/api`

---

## 🧠 How It Works

### Onboarding Flow

1. Business owner opens the 3-step setup wizard
2. Step 1 — enters business name and type (product / service / hybrid)
3. Step 2 — adds services or products with pricing and available time slots
4. Step 3 — adds FAQs; each FAQ is embedded via OpenAI and stored in Pinecone
5. All configuration is saved to Supabase and used to construct the AI system prompt going forward

### AI Chat Flow

1. Customer sends a message through the chat widget
2. Server receives the message and fetches full conversation history from Supabase
3. `ragSearch.js` embeds the message and queries Pinecone for the nearest matching FAQ
4. `aiAgent.js` builds a system prompt from business config, retrieved FAQ context, and conversation history
5. OpenAI generates a response, which is returned to the customer in the chat widget
6. The full exchange is saved to Supabase for continuity in future messages

### Lead Capture Flow

1. After each AI response, `leadExtractor.js` scans the conversation for name and phone number
2. If found and not already stored, a new lead record is inserted into Supabase with status `New`
3. The lead appears in the business owner's dashboard immediately

### Appointment Booking Flow

1. AI detects booking intent from the customer message
2. `slotManager.js` queries Supabase for available slots
3. AI presents available options to the customer
4. On customer confirmation, the slot is reserved in Supabase and marked as booked
5. The appointment shows on the dashboard

### Order & Inventory Flow

1. AI detects order intent and queries Supabase for product availability
2. AI confirms item, quantity, and price with the customer
3. On confirmation, an order record is created and `inventoryUpdater.js` deducts the quantity from stock
4. Dashboard reflects the new order and updated inventory levels

### Missed Call Follow-up Flow

1. A missed call event is simulated (triggered via API or UI action)
2. System automatically sends a follow-up message to the customer through the chat interface
3. The interaction is logged as a new lead if contact details are captured

---

## 📈 Scalability

- **Multi-business support:** Every record in Supabase is scoped by `business_id`, making the system natively multi-tenant. Onboarding a new business requires only a new row — no new infrastructure
- **Concurrent conversations:** Node.js handles async I/O natively, allowing multiple customer conversations to be processed simultaneously without blocking
- **Vector search:** Pinecone namespaces isolate each business's FAQ index, so all businesses share one Pinecone instance with no cross-contamination. The index scales to millions of vectors with no infrastructure changes
- **Extensibility:** The modular service structure (chat, leads, orders, appointments, inventory) means any module can be extended independently — for example, swapping the simulated missed call trigger for a real telephony webhook (e.g. Exotel, Twilio) requires changes only in one route file

---

## 💡 Feasibility

AI Business Autopilot is built on production-grade, actively maintained tools — Node.js, Supabase, OpenAI, and Pinecone — all of which offer free tiers sufficient to run a working demo. There are no experimental dependencies. Supabase provides authentication, a managed PostgreSQL database, and real-time capabilities in a single service, eliminating the need for a separate database server. Pinecone handles vector storage and semantic search without any ML infrastructure to manage. The system can be run locally with a single `node index.js` command and deployed to any Node.js-compatible platform (Railway, Render, Vercel serverless) with no configuration changes beyond environment variables.

---

## 🌟 Novelty

Most existing chatbot tools answer questions but cannot complete transactions. AI Business Autopilot goes beyond Q&A — when a customer expresses intent, the system performs the actual business action: it books the slot, places the order, deducts inventory, and logs the lead. The use of Pinecone for semantic FAQ retrieval means the AI does not need exact keyword matches — a customer asking "are you open on Sunday?" correctly retrieves a FAQ written as "What are your weekend hours?", producing an accurate, business-specific answer without any hardcoding. This combination of RAG-based contextual intelligence with live transactional automation in a zero-setup, 3-step onboarding package is the core novelty over existing no-code chatbot platforms.

---

## 🔧 Feature Depth

- **RAG pipeline:** Customer messages are embedded at query time and matched against the business's Pinecone index. Only FAQs above a similarity threshold are injected into the prompt, preventing irrelevant context from degrading response quality
- **Dynamic system prompt:** Every OpenAI call includes the business name, type, operating hours, available slots or inventory (queried fresh from Supabase), and full conversation history — the AI always has current information
- **Business type branching:** The AI system prompt and dashboard UI both adapt based on `business_type` — a service-only business's agent never references products; a product-only business's agent never offers appointment booking
- **Edge cases handled:**
  - Slot booked by another customer mid-conversation → slot re-queried at confirmation, not at intent detection
  - Customer provides only a first name → lead saved with available data; phone captured on next detection pass
  - Stock hits zero mid-conversation → inventory queried fresh at confirmation; AI informs customer if item is no longer available
  - Vague or out-of-scope query → AI instructed via system prompt to redirect to the business's available services
- **Functional coverage:** Auto-reply ✅ | FAQ handling ✅ | Lead capture ✅ | Context-aware AI ✅ | Missed call follow-up ✅ (simulated) | Appointment booking ✅ | Order handling ✅ | Inventory update ✅ | Dashboard ✅

---

## ⚠️ Ethical Use & Disclaimer

- WhatsApp-style interaction is implemented as a self-hosted chat interface — no WhatsApp API is used
- Missed call follow-up is demonstrated via simulation and is not connected to a live telephony system
- Customer name and phone number are collected only when the customer voluntarily provides them in conversation
- Businesses deploying this platform are responsible for disclosing data collection practices to their customers in accordance with applicable regulations (DPDP Act in India, GDPR in the EU)

---

## 📜 License

Licensed under the [MIT License](LICENSE).

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m "Add feature-name"`
4. Push and open a Pull Request

---

## 🧩 Author

**Bharath Raj T**

📧 mltbharathraj2005@gmail.com

🔗 [GitHub](https://github.com/tbharathraj205)
