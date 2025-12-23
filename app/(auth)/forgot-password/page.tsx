"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Loader2 } from "lucide-react";

export default function ForgotPasswordPage() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError("");
        setMessage("");

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email");

        try {
            const res = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Something went wrong");
            }

            setMessage(data.message);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
                <div className="flex items-center justify-center">
                    <Image
                        src="/main-logo.webp"
                        alt="Logo"
                        width={200}
                        height={200}
                    />
                </div>
                <h1 className="text-2xl font-bold text-center">Forgot Password</h1>
                <p className="text-sm text-center text-gray-600">
                    Enter your email address and we'll send you a link to reset your password.
                </p>

                {error && (
                    <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded">
                        {error}
                    </div>
                )}

                {message && (
                    <div className="p-3 text-sm text-green-700 bg-green-50 border border-green-200 rounded">
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 flex justify-center items-center"
                    >
                        {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Send Reset Link"}
                    </button>
                </form>
                <div className="text-center text-sm">
                    <Link href="/login" className="text-blue-600 hover:underline">Back to Login</Link>
                </div>
            </div>
        </div>
    );
}
