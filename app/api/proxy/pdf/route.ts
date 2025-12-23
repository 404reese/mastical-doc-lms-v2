import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";

export async function GET(request: NextRequest) {
    const session = await getSession();

    // 1. Security Check
    if (!session?.userId) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    // 2. Get Target URL
    const searchParams = request.nextUrl.searchParams;
    const targetUrl = searchParams.get("url");

    if (!targetUrl) {
        return new NextResponse("Missing 'url' parameter", { status: 400 });
    }

    try {
        // 3. Fetch PDF from external source (GCP, AWS, etc.)
        const response = await fetch(targetUrl);

        if (!response.ok) {
            return new NextResponse(`Failed to fetch PDF: ${response.statusText}`, { status: response.status });
        }

        // 4. Return as stream with appropriate headers
        // We clone the headers but verify content-type
        const headers = new Headers();
        headers.set("Content-Type", "application/pdf");
        headers.set("Cache-Control", "public, max-age=3600"); // Cache for performance

        return new NextResponse(response.body, {
            status: 200,
            headers,
        });

    } catch (error) {
        console.error("PDF Proxy Error:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
