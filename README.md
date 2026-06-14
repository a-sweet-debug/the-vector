<div align="center">
  <img src="assets/logo.png" alt="Vector Logo" width="200" style="border-radius: 20px; box-shadow: 0 0 20px rgba(16, 185, 129, 0.2);" />

  <h1>Vector AI Command Center</h1>
  <p><strong>The AI Business Orchestrator & Executive Council</strong></p>
  
  <p>
    <a href="https://vector-ai.vercel.app"><img src="https://img.shields.io/badge/Deploy_to-Vercel-black?style=flat-square&logo=vercel" alt="Deploy to Vercel"></a>
    <img src="https://img.shields.io/badge/Next.js-16.2.7-black?style=flat-square&logo=next.js" alt="Next.js">
    <a href="https://insforge.dev"><img src="https://insforge.dev/badge-made-with-insforge-dark.svg" alt="Made with InsForge" height="20"></a>
    <img src="https://img.shields.io/badge/Database-PostgreSQL-blue?style=flat-square&logo=postgresql" alt="PostgreSQL">
  </p>
</div>

---

**Vector AI** is a multi-agent SaaS platform designed to orchestrate a complete team of executive AI personas. Whether you need startup ideation, zero-trust technical architecture planning, fintech monetization modeling, or viral go-to-market strategies, Vector puts a full AI C-suite at your fingertips.

Built with a lightning-fast **Next.js 16** frontend, powered by **Gemini 2.5 Flash**, and utilizing **InsForge PostgreSQL (with pgvector)** as its native semantic memory layer.

## ✨ Core Features

- **Multi-Agent Executive Council**: Collaborate in real-time with specialized AI roles:
  - 🧠 **Prism (Lead Architect)**: Master orchestrator that delegates tasks and synthesizes outputs.
  - 💼 **Atlas (CEO)**: Business strategy, startup valuation, and enterprise sales planner.
  - 💻 **Nexus (CTO)**: Technical architecture, zero-trust security, and cloud optimization.
  - 📢 **Vanguard (Marketing)**: Cinematic brand positioning and viral launch strategy.
  - 📈 **Ledger (Finance)**: Fintech modeling, billing architecture, and cost optimization.
- **Instantaneous UI Generation**: Glassmorphism dashboard with highly reactive agent status cards, buttery-smooth Framer Motion staggered animations, and zero-latency document rendering.
- **Autonomous Project Naming**: AI automatically generates crisp, contextual titles (e.g., "Retro TV SaaS") for all generated projects and chats.
- **Enterprise-Grade Documentation**: Instantly outputs massive, production-ready markdown documents (Executive Summaries, Architecture Specs, GTM Plans) seamlessly stored in the database.
- **Agent-Native Memory (InsForge)**: Natively integrated with **InsForge PostgreSQL** to persistently store chat history, projects, and contextual vectors across sessions, ensuring you never lose a workspace.

## 🛠 Tech Stack

**Frontend & Orchestration Engine**
- **Framework**: Next.js 16 (App Router, Turbopack)
- **Styling**: Tailwind CSS, Framer Motion, Cinematic UI Tokens
- **AI Engine**: Google Gemini 2.5 Flash (`@google/generative-ai`)
- **Database & Memory**: **InsForge PostgreSQL** (pgvector for RAG)
- **Deployment**: Vercel

---

## 🚀 Quick Start (Local Setup)

### Prerequisites
- Node.js 18+
- PostgreSQL Database (via InsForge or Supabase)
- Google Gemini API Key

### 1. Setup Frontend Dashboard
Clone the repository and prepare the Next.js app:
```bash
git clone https://github.com/your-username/vector-app.git
cd vector-app
```

Create a `.env.local` file in the `vector-app` directory. **Never commit this file to version control:**
```env
# Database connection for Project & Chat Memory
POSTGRES_URL="postgresql://<user>:<password>@<host>:<port>/<db>?sslmode=require"

# Gemini AI Integration
GEMINI_API_KEY="<YOUR_GEMINI_API_KEY>"
```

### 2. Run the Application
Install packages and start the Next.js development server:
```bash
npm install
npm run dev
```

Visit `http://localhost:3000` and enter the Board Room to initialize your first project!

---

## ☁️ Deploying to Vercel

The frontend is completely serverless and fully optimized for Vercel deployment.

1. Push your code to a GitHub repository (ensure `.env.local` is listed in your `.gitignore`).
2. Go to your Vercel Dashboard and click **Add New... > Project**.
3. Import your GitHub repository.
4. Set the **Framework Preset** to Next.js.
5. Set the **Root Directory** to `vector-app`.
6. Add the Environment Variables (`POSTGRES_URL` and `GEMINI_API_KEY`).
7. Click **Deploy**!

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

