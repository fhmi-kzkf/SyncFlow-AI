import { NextResponse } from "next/server";
import { generateContent } from "@/lib/fireworks";

export const maxDuration = 60;

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { prdContent } = body;
    
    if (!prdContent) {
      return NextResponse.json({ error: "Missing PRD content payload" }, { status: 400 });
    }

    const systemPrompt = `You are an expert Technical Lead. 
Your task is to generate a comprehensive Technical Requirements Document (TRD) in Markdown format based on the provided PRD.
The TRD should include:
1. Architecture Overview
2. Technology Stack & Rationale
3. Data Model Overview
4. API Design / Integration Points
5. Security & Performance Constraints
Output ONLY the Markdown content. Do not include any conversational filler.`;

    const userPrompt = `Generate a TRD based on this PRD:\n\n${prdContent}`;

    const content = await generateContent(systemPrompt, userPrompt);
    
    return NextResponse.json({ success: true, document: content });
  } catch (error) {
    console.error("Error generating TRD:", error);
    return NextResponse.json(
      { error: "Failed to generate TRD" },
      { status: 500 }
    );
  }
}
