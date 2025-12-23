import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "@/lib/session";

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // Define protected routes
    const isProtected =
        path.startsWith("/dashboard") ||
        path.startsWith("/learn") ||
        path.startsWith("/payment") ||
        (path.startsWith("/courses") && path.endsWith("/learn"));

    const isAdmin = path.startsWith("/admin");
    const isSuperAdmin = path.startsWith("/admin/manage");

    // Get session from cookie
    const cookie = request.cookies.get("session")?.value;
    const session = await decrypt(cookie);

    // 1. Check basic authentication for protected routes
    if (isProtected && !session) {
        return NextResponse.redirect(new URL("/login", request.nextUrl));
    }

    // 2. Check Admin Access
    if (isAdmin) {
        if (!session) {

            // Redirect to login if trying to access admin without session
            return NextResponse.redirect(new URL("/login", request.nextUrl));
        }

        // Check role
        const role = (session as any).role;
        const hasAdminAccess = role === "admin" || role === "superadmin";

        // If trying to access /admin/manage, must be superadmin
        if (path.startsWith("/admin/manage") && role !== "superadmin") {
            // Redirect to admin dashboard or user dashboard if not allowed
            return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
        }

        // If just trying to access /admin generic and not an admin
        if (!hasAdminAccess) {
            return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
        }
    }

    return NextResponse.next();
}

// Configure which paths the middleware runs on
export const config = {
    matcher: [
        "/dashboard/:path*",
        "/admin/:path*",
        "/learn/:path*",
        "/payment",
        "/courses/:path*/learn"
    ],
};
