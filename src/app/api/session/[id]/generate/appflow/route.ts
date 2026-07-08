import { NextResponse } from "next/server";
import { generateContent } from "@/lib/fireworks";

export const maxDuration = 60;

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    const { prd, schema } = body;

    if (!prd || !schema) {
      return NextResponse.json({ error: "Missing PRD or Schema content" }, { status: 400 });
    }

    const systemPrompt = `You are an expert UX Architect and Frontend Lead. 
Your task is to generate an App Flow and Screen Inventory document in Markdown format.
Based on the PRD and the Database Schema, define the exact screens needed, the user journey, and state interactions.
The App Flow should include:
1. User Journey Map (Primary Flows)
2. Screen Inventory (List of pages/components with their purpose)
3. State & Data Requirements per screen (referencing the Prisma schema)
Output ONLY the Markdown content. Do not include conversational filler.`;

    const userPrompt = `Here is the context:\n\n-- PRD --\n${prd}\n\n-- Prisma Schema --\n${schema}`;

    const content = await generateContent(systemPrompt, userPrompt);
    
    return NextResponse.json({ success: true, document: content });
  } catch (error) {
    console.error("Error generating App Flow:", error);
    return NextResponse.json(
      { error: "Failed to generate App Flow" },
      { status: 500 }
    );
  }
}
