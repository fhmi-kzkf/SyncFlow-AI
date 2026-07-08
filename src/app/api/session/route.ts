import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { sessionStore } from "@/lib/sessionStore";
import rateLimit from "@/lib/rateLimit";
import { formInputSchema } from "@/lib/validations";

const limiter = rateLimit({ interval: 60 * 1000, uniqueTokenPerInterval: 500 });

export async function POST(request: Request) {
  try {
    // Basic IP-based rate limiting
    const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";
    try {
      await limiter.check(20, ip); // Max 20 requests per minute per IP
    } catch {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const body = await request.json();
    
    // Validate input with Zod
    const validationResult = formInputSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid input", details: validationResult.error.issues },
        { status: 400 }
      );
    }
    
    const validatedData = validationResult.data;
    
    // Generate a unique session ID
    const sessionId = uuidv4();
    
    // Store in memory
    sessionStore.createSession(sessionId, validatedData);
    
    return NextResponse.json({ sessionId }, { status: 201 });
  } catch (error) {
    console.error("Error creating session:", error);
    return NextResponse.json(
      { error: "Failed to create session" },
      { status: 500 }
    );
  }
}
