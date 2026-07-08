import { NextResponse } from "next/server";
import { sessionStore } from "@/lib/sessionStore";
import { answersSchema } from "@/lib/validations";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    // Validate input with Zod
    const validationResult = answersSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid input", details: validationResult.error.issues },
        { status: 400 }
      );
    }
    const { answers } = validationResult.data;
    
    const session = sessionStore.getSession(id);
    
    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    // Update the session with the answers
    const updatedQA = session.clarifyingQA.map((qa, index) => ({
      ...qa,
      answer: answers[index] || ""
    }));

    sessionStore.updateSession(id, { clarifyingQA: updatedQA });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving answers:", error);
    return NextResponse.json(
      { error: "Failed to save answers" },
      { status: 500 }
    );
  }
}
