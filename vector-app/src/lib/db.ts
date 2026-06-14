import { Pool } from 'pg';

let pool: Pool | null = null;

export function getDbPool() {
  if (!pool) {
    // Determine the correct connection string based on where it's running
    // The user put .env.local in the parent dir, but Next.js usually looks in its root.
    // For safety, we use process.env.POSTGRES_URL directly
    const connectionString = process.env.POSTGRES_URL;
    
    if (!connectionString) {
      console.warn("⚠️ POSTGRES_URL is not set in environment variables. Database features will fail silently.");
      return null;
    }

    pool = new Pool({
      connectionString,
      ssl: {
        rejectUnauthorized: false // Required for many managed Postgres services like Supabase/InsForge
      }
    });
  }
  return pool;
}

export async function initDb() {
  const p = getDbPool();
  if (!p) return;

  try {
    // 1. Enable pgvector extension (must be done before creating vector columns)
    await p.query(`CREATE EXTENSION IF NOT EXISTS vector;`);

    // 2. Create the projects table
    await p.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        status VARCHAR(50) DEFAULT 'Active',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        summary_markdown TEXT,
        architecture_markdown TEXT,
        marketing_markdown TEXT,
        finance_markdown TEXT
      );
    `);

    // 3. Create the knowledge_base table for RAG
    await p.query(`
      CREATE TABLE IF NOT EXISTS knowledge_base (
        id SERIAL PRIMARY KEY,
        filename VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        embedding vector(768),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("✅ Database initialized successfully (including pgvector)");
  } catch (error) {
    console.error("❌ Failed to initialize database:", error);
  }
}
