import { NextResponse } from "next/server";
import crypto from "crypto";
import connectToDatabase from "@/lib/db";
import User from "@/lib/models/User";
import ResetToken from "@/lib/models/ResetToken";
import { sendPasswordResetEmail } from "@/lib/mail";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email } = body;

        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        await connectToDatabase();

        const user = await User.findOne({ email });

        // Always return success to prevent email enumeration
        if (!user) {
            return NextResponse.json(
                { message: "If an account exists, a reset link has been sent." },
                { status: 200 }
            );
        }

        // Generate secure random token
        const token = crypto.randomBytes(32).toString("hex");

        // Create a hash of the token to store in DB
        const tokenHash = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

        const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now

        // Upsert the reset token (replace existing if any)
        await ResetToken.findOneAndUpdate(
            { userId: user._id },
            { tokenHash, expiresAt },
            { upsert: true, new: true }
        );

        // Send email with the RAW token
        await sendPasswordResetEmail(email, token);

        return NextResponse.json(
            { message: "If an account exists, a reset link has been sent." },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Forgot password error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
