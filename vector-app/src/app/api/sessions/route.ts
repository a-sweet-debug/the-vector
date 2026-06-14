import { NextResponse } from 'next/server';

export async function GET() {
  const backendUrl = process.env.MCP_SERVER_URL || 'http://127.0.0.1:8000';
  
  try {
    const response = await fetch(`${backendUrl}/api/sessions`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const mockSessions = [
      {
        _id: "mock-session-1",
        session_id: "SESSION-NEXUS-001",
        project_id: "PRJ-NEXUS",
        idea: "Create a Zero-Trust Security Architecture for enterprise B2B SaaS applications.",
        status: "completed",
        final_strategy: "### Executive Summary\nSuccessfully designed a zero-trust model utilizing JWT with rotating asymmetric keys.\n\n### Key Deliverables\n- **Edge Gateway:** Next.js Serverless runtime\n- **Authentication:** OAuth2 with mandatory MFA\n- **Database:** InsForge Postgres with Row-Level Security."
      },
      {
        _id: "mock-session-2",
        session_id: "SESSION-AURA-002",
        project_id: "PRJ-AURA",
        idea: "Predictive ML wearable integration for real-time health monitoring and athlete optimization.",
        status: "completed",
        final_strategy: "### Executive Summary\nDeployed lightweight TensorFlow Lite models to edge devices (wearables) for low-latency inference.\n\n### Key Deliverables\n- **Data Pipeline:** Kafka streams to Google BigQuery\n- **ML Pipeline:** Vertex AI auto-training loops based on user feedback.\n- **Frontend:** React Native app communicating via WebSockets."
      },
      {
        _id: "mock-session-3",
        session_id: "SESSION-NOVA-003",
        project_id: "PRJ-NOVA",
        idea: "Upgrade the NovaVault AI assistant with context-aware, portfolio-synced financial reasoning.",
        status: "completed",
        final_strategy: "### Executive Summary\nIntegrated a Retrieval-Augmented Generation (RAG) pipeline to cross-reference official SEC filings with the user's live portfolio.\n\n### Key Deliverables\n- **Database:** pgvector in InsForge Postgres for similarity search.\n- **Payments:** Full-stack Stripe integration for subscription management.\n- **Compliance:** Strict 'Financial Co-Pilot' guardrails implemented."
      },
      {
        _id: "mock-session-4",
        session_id: "SESSION-GEN-004",
        project_id: "PRJ-GENGEN",
        idea: "Finalize the NEXUS Identity OS by implementing an interactive, login-gated cinematic boot sequence.",
        status: "in-progress",
        final_strategy: "### Executive Summary\nDesigning a hyper-polished dark mode interface with Framer Motion animations to serve as a premium lead-generation gate.\n\n### Key Deliverables\n- **UI/UX:** Terminal hacking meets luxury OS aesthetics.\n- **Auth:** Clerk integration for secure SSO.\n- **Performance:** Optimized bundle size by removing heavy 3D WebGL libraries."
      },
      {
        _id: "mock-session-5",
        session_id: "SESSION-HFT-005",
        project_id: "PRJ-QUANTUM",
        idea: "Build an HFT (High-Frequency Trading) engine for crypto arbitrage with sub-millisecond latency.",
        status: "completed",
        final_strategy: "### Executive Summary\nEngineered a bare-metal Rust engine utilizing io_uring for zero-copy networking to bypass Linux kernel overhead.\n\n### Key Deliverables\n- **Core Engine:** Rust with tokio-tungstenite for persistent WebSockets.\n- **Infrastructure:** AWS us-east-1 co-location near exchange servers.\n- **Strategy:** Triangular stablecoin arbitrage to minimize risk."
      },
      {
        _id: "mock-session-6",
        session_id: "SESSION-GAME-006",
        project_id: "PRJ-BUTTON",
        idea: "Develop a highly polished, chaotic browser game where an evolving red button reacts to user interactions.",
        status: "failed",
        final_strategy: "### Executive Summary\n*Orchestration interrupted.* The Chaos Engine exceeded memory limits during the procedurally generated audio phase.\n\n### Key Findings\n- Web Audio API oscillators caused an infinite loop when tied directly to the React render cycle.\n- **Action Item:** Move audio synthesis to a dedicated Web Worker in the next iteration."
      }
    ];

    if (!response.ok) {
      return NextResponse.json({ sessions: mockSessions });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ sessions: mockSessions });
  }
}
