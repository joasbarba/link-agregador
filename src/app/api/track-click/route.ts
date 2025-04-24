import { type NextRequest, NextResponse } from "next/server";
import { trackLinkClick } from "@/lib/data";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { linkId } = body;

    if (!linkId) {
      return NextResponse.json(
        { error: "Link ID is required" },
        { status: 400 }
      );
    }

    const clicks = trackLinkClick(linkId);

    return NextResponse.json({ success: true, clicks });
  } catch (error) {
    console.error("Error tracking link click:", error);
    return NextResponse.json(
      { error: "Failed to track link click" },
      { status: 500 }
    );
  }
}
