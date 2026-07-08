import { NextResponse } from "next/server";
import { answersSchema } from "@/lib/validations";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    
    // Validate input with Zod
    const validationResult = answersSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid input", details: validationResult.error.issues },
        { status: 400 }
      );
    }
    
    // State is now maintained on the client side (localStorage).
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving answers:", error);
    return NextResponse.json(
      { error: "Failed to validate answers" },
      { status: 500 }
    );
  }
}
