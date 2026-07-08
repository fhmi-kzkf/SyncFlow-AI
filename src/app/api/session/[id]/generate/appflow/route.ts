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

    if (session.documents.schema.status !== 'done' || !session.documents.schema.content) {
      return NextResponse.json({ error: "Schema must be generated first" }, { status: 400 });
    }

    sessionStore.updateDocumentStatus(id, 'appflow', 'generating');

    const systemPrompt = `You are an expert UX Architect and Frontend Lead. 
Your task is to generate an App Flow and Screen Inventory document in Markdown format.
Based on the PRD and the Database Schema, define the exact screens needed, the user journey, and state interactions.
The App Flow should include:
1. User Journey Map (Primary Flows)
2. Screen Inventory (List of pages/components with their purpose)
3. State & Data Requirements per screen (referencing the Prisma schema)
Output ONLY the Markdown content. Do not include conversational filler.`;

    const userPrompt = `Here is the context:\n\n-- PRD --\n${session.documents.prd.content}\n\n-- Prisma Schema --\n${session.documents.schema.content}`;

    const content = await generateContent(systemPrompt, userPrompt);
    
    sessionStore.updateDocumentStatus(id, 'appflow', 'done', content);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error generating App Flow:", error);
    const { id } = await params;
    sessionStore.updateDocumentStatus(id, 'appflow', 'idle'); 
    return NextResponse.json(
      { error: "Failed to generate App Flow" },
      { status: 500 }
    );
  }
}
