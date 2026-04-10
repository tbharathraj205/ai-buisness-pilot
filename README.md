# Business Autopilot

A modern business automation dashboard that integrates AI-powered agents, WhatsApp messaging, lead management, and conversation tracking.

## Features

- 📊 **Dashboard** - Overview of key metrics and business insights
- 👥 **Lead Management** - Create, track, and manage business leads
- 💬 **Conversations** - Monitor and manage WhatsApp conversations
- 🤖 **AI Agent** - Automated responses and intelligent lead handling
- ⚙️ **Setup & Configuration** - Easy onboarding and settings management

## Project Structure

```
Business Autopilot/
├── index.html                 # Application entry point
├── /assets                    # Static assets (CSS, JS, images, fonts)
├── /components               # Reusable UI components
├── /pages                    # Main page views
├── /scripts                  # Page-specific JavaScript logic
├── /services                 # API integration layer
├── /data                     # Mock data (JSON files)
├── /config                   # Configuration files
└── README.md                 # This file
```

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Node.js (for development server)

### Installation

1. Clone or navigate to the project directory:
   ```bash
   cd Business Autopilot
   ```

2. Start a local development server:
   ```bash
   npx serve .
   # or use your preferred server (Python, Node.js, etc.)
   ```

3. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## File Organization

### `/assets`
- **css/** - Stylesheets for global and page-specific styles
- **js/** - Core JavaScript modules (API, state management, utilities)
- **images/** - Icons, logos, and avatars
- **fonts/** - Custom fonts (optional)

### `/components`
Reusable HTML components:
- navbar.html, sidebar.html
- stat-card.html, lead-item.html
- chat-item.html, message-bubble.html
- faq-item.html

### `/pages`
Main application pages:
- dashboard.html
- leads.html
- conversations.html
- setup.html

### `/scripts`
Page-specific JavaScript logic for initialization and interactions

### `/services`
Integration layer:
- **whatsappService.js** - WhatsApp API communication
- **aiService.js** - AI agent integration
- **leadService.js** - Lead management operations

### `/data`
Mock/demo data files:
- leads.json, chats.json, faq.json

### `/config`
- **config.js** - API URLs and environment configuration

## Development

Edit the following files to customize:
- `assets/css/` - Styling
- `assets/js/main.js` - App initialization and routing
- `pages/` - Page content
- `services/` - API integration

## License

This project is part of the Origin '26 SIMSATS Hackathon.
