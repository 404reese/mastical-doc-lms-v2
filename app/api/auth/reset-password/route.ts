import { NextResponse } from "next/server";
import crypto from "crypto";
import bcrypt from "bcrypt";
import connectToDatabase from "@/lib/db";
import User from "@/lib/models/User";
import ResetToken from "@/lib/models/ResetToken";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { token, newPassword } = body;

        if (!token || !newPassword) {
            return NextResponse.json(
                { error: "Token and new password are required" },
                { status: 400 }
            );
        }

        if (newPassword.length < 8) {
            return NextResponse.json(
                { error: "Password must be at least 8 characters" },
                { status: 400 }
            );
        }

        await connectToDatabase();

        // Re-create hash from the raw token
        const tokenHash = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

        // Find the token document
        const resetTokenDoc = await ResetToken.findOne({ tokenHash });

        if (!resetTokenDoc) {
            return NextResponse.json(
                { error: "Invalid or expired token" },
                { status: 400 }
            );
        }

        // Check expiration explicitly (though TTL index handles cleanup, race conditions exist)
        if (resetTokenDoc.expiresAt < new Date()) {
            await ResetToken.deleteOne({ _id: resetTokenDoc._id });
            return NextResponse.json(
                { error: "Token has expired" },
                { status: 400 }
            );
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update user password
        await User.findByIdAndUpdate(resetTokenDoc.userId, { hashedPassword });

        // Delete the used token
        await ResetToken.deleteOne({ _id: resetTokenDoc._id });

        return NextResponse.json(
            { message: "Password has been reset successfully" },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Reset password error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
