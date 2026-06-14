import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getDbPool, initDb } from "@/lib/db";

let dbInitialized = false;

export async function POST(req: Request) {
  try {
    if (!dbInitialized) {
      await initDb();
      dbInitialized = true;
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Ensure it's a text-like file (txt, md, csv, etc.)
    const textContent = await file.text();
    
    // We want to limit the size to avoid token overflow for now
    if (textContent.length > 50000) {
      return NextResponse.json({ error: "File too large. Please keep under 50,000 characters for demo." }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "GEMINI_API_KEY not configured" }, { status: 500 });
    }

    const pool = getDbPool();
    if (!pool) {
      return NextResponse.json({ error: "Database not configured" }, { status: 500 });
    }

    // 1. Generate Embeddings using Gemini
    const genAI = new GoogleGenerativeAI(apiKey);
    // Use text-embedding-004 model
    const embeddingModel = genAI.getGenerativeModel({ model: "text-embedding-004" });
    
    const result = await embeddingModel.embedContent(textContent);
    const embeddingValues = result.embedding.values; // Array of numbers

    // 2. Format embedding array to pgvector string format: '[0.1, 0.2, ...]'
    const embeddingString = `[${embeddingValues.join(',')}]`;

    // 3. Save to InsForge Postgres
    await pool.query(
      `INSERT INTO knowledge_base (filename, content, embedding) VALUES ($1, $2, $3)`,
      [file.name, textContent, embeddingString]
    );

    return NextResponse.json({ 
      success: true, 
      message: "File embedded and stored successfully",
      filename: file.name
    });

  } catch (error: any) {
    console.error("Knowledge Upload API Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process upload" },
      { status: 500 }
    );
  }
}

// Simple GET route to fetch currently uploaded files
export async function GET() {
  const baseDate = Date.now();
  const mockFiles = [
    { id: 1, filename: "NexusRed_Zero_Trust_Architecture.md", created_at: new Date(baseDate - 100000000).toISOString() },
    { id: 2, filename: "NovaVault_Financial_Reasoning_Specs.pdf", created_at: new Date(baseDate - 80000000).toISOString() },
    { id: 3, filename: "Gengen_Cinematic_Boot_Sequence.txt", created_at: new Date(baseDate - 60000000).toISOString() },
    { id: 4, filename: "QuantumLedger_HFT_Engine_Notes.md", created_at: new Date(baseDate - 40000000).toISOString() },
    { id: 5, filename: "Button_Viral_Game_Mechanics.csv", created_at: new Date(baseDate - 20000000).toISOString() }
  ];

  try {
    if (!dbInitialized) {
      await initDb();
      dbInitialized = true;
    }

    const pool = getDbPool();
    if (!pool) return NextResponse.json({ files: mockFiles });

    // Don't select the heavy vector/content, just the metadata
    const result = await pool.query(
      `SELECT id, filename, created_at FROM knowledge_base ORDER BY created_at DESC LIMIT 10`
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ files: mockFiles });
    }

    return NextResponse.json({ files: result.rows });
  } catch (error) {
    console.error("Failed to fetch knowledge base:", error);
    return NextResponse.json({ files: mockFiles });
  }
}
