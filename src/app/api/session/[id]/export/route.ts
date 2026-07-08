import { NextResponse } from "next/server";
import { sessionStore } from "@/lib/sessionStore";
import JSZip from "jszip";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { prd, trd, schema, appflow } = body;
    
    if (!prd && !trd && !schema && !appflow) {
      return NextResponse.json({ error: "No documents to export" }, { status: 400 });
    }

    const zip = new JSZip();

    if (prd) zip.file("PRD.md", prd);
    if (trd) zip.file("TRD.md", trd);
    if (schema) zip.file("schema.prisma", schema);
    if (appflow) zip.file("AppFlow.md", appflow);

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
