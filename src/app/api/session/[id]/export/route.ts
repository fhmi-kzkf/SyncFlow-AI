import { NextResponse } from "next/server";
import { sessionStore } from "@/lib/sessionStore";
import JSZip from "jszip";

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

    const zip = new JSZip();

    if (session.documents.prd.content) {
      zip.file("PRD.md", session.documents.prd.content);
    }
    if (session.documents.trd.content) {
      zip.file("TRD.md", session.documents.trd.content);
    }
    if (session.documents.schema.content) {
      zip.file("schema.prisma", session.documents.schema.content);
    }
    if (session.documents.appflow.content) {
      zip.file("AppFlow.md", session.documents.appflow.content);
    }

    const content = await zip.generateAsync({ type: "blob" });

    return new NextResponse(content, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="syncflow-docs-${id}.zip"`,
      },
    });
  } catch (error) {
    console.error("Error generating export:", error);
    return NextResponse.json(
      { error: "Failed to generate export" },
      { status: 500 }
    );
  }
}
