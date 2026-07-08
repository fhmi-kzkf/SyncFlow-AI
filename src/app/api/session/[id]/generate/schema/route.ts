import { NextResponse } from "next/server";
import { sessionStore } from "@/lib/sessionStore";
import { generateContent } from "@/lib/fireworks";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = sessionStore.getSession(id);
    
    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    if (session.documents.trd.status !== 'done' || !session.documents.trd.content) {
      return NextResponse.json({ error: "TRD must be generated first" }, { status: 400 });
    }

    sessionStore.updateDocumentStatus(id, 'schema', 'generating');

    const systemPrompt = `You are an expert Database Architect. 
Your task is to generate a Prisma schema file (\`schema.prisma\`) based on the provided PRD and TRD.
The schema should include all necessary models, relations, enums, and properly configured @id, @default, @updatedAt fields.
Assume PostgreSQL as the provider unless the TRD states otherwise.
Output ONLY the raw Prisma schema code. Do not wrap it in markdown code blocks like \`\`\`prisma. Do not include any explanations.`;

    const userPrompt = `Here is the context for the schema:\n\n-- PRD --\n${session.documents.prd.content}\n\n-- TRD --\n${session.documents.trd.content}`;

    let content = await generateContent(systemPrompt, userPrompt);
    
    // Clean up markdown wrapping if Gemma included it despite instructions
    content = content.replace(/```prisma/g, "").replace(/```/g, "").trim();
    
    sessionStore.updateDocumentStatus(id, 'schema', 'done', content);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error generating Schema:", error);
    const { id } = await params;
    sessionStore.updateDocumentStatus(id, 'schema', 'idle'); 
    return NextResponse.json(
      { error: "Failed to generate Schema" },
      { status: 500 }
    );
  }
}
