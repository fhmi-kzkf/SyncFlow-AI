import { NextResponse } from "next/server";
import { generateContent } from "@/lib/fireworks";

export const maxDuration = 60;

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    const { prdContent, trdContent } = body;
    
    if (!prdContent || !trdContent) {
      return NextResponse.json({ error: "PRD and TRD content are required" }, { status: 400 });
    }

    const systemPrompt = `You are an expert Database Architect. 
Your task is to generate a Prisma schema file (\`schema.prisma\`) based on the provided PRD and TRD.
The schema should include all necessary models, relations, enums, and properly configured @id, @default, @updatedAt fields.
Assume PostgreSQL as the provider unless the TRD states otherwise.
Output ONLY the raw Prisma schema code. Do not wrap it in markdown code blocks like \`\`\`prisma. Do not include any explanations.`;

    const userPrompt = `Here is the context for the schema:\n\n-- PRD --\n${prdContent}\n\n-- TRD --\n${trdContent}`;

    let content = await generateContent(systemPrompt, userPrompt);
    
    // Clean up markdown wrapping if Gemma included it despite instructions
    content = content.replace(/```prisma/g, "").replace(/```/g, "").trim();
    
    return NextResponse.json({ success: true, document: content });
  } catch (error) {
    console.error("Error generating Schema:", error);
    return NextResponse.json(
      { error: "Failed to generate Schema" },
      { status: 500 }
    );
  }
}
