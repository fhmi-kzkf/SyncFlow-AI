import { NextResponse } from "next/server";
import { sessionStore } from "@/lib/sessionStore";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = sessionStore.getSession(id);
    
    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    // Only return the documents part to the client to avoid sending large prompt contexts
    return NextResponse.json({
      documents: session.documents
    });
  } catch (error) {
    console.error("Error fetching session:", error);
    return NextResponse.json(
      { error: "Failed to fetch session" },
      { status: 500 }
    );
  }
}
