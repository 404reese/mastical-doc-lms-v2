"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Loader2 } from "lucide-react";

function ResetPasswordForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError("");

        const formData = new FormData(e.currentTarget);
        const password = formData.get("password");
        const confirmPassword = formData.get("confirmPassword");

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        if (!token) {
            setError("Invalid or missing token");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, newPassword: password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to reset password");
            }

            setSuccess(true);
            setTimeout(() => {
                router.push("/login");
            }, 3000);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    if (success) {
        return (
            <div className="flex flex-col items-center justify-center p-8 space-y-4 bg-white rounded shadow-md max-w-md w-full">
                <div className="text-green-600 font-bold text-xl">Success!</div>
                <p className="text-center text-gray-600">Your password has been reset. Redirecting to login...</p>
                <Link href="/login" className="text-blue-600 hover:underline">Click here if you are not redirected</Link>
            </div>
        );
    }

    return (
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
            <div className="flex items-center justify-center">
                <Image
                    src="/main-logo.webp"
                    alt="Logo"
                    width={200}
                    height={200}
                />
            </div>
            <h1 className="text-2xl font-bold text-center">Reset Password</h1>
            {error && (
                <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded">
                    {error}
                </div>
            )}
            {!token ? (
                <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded">
                    Missing reset token. Please check your email link.
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            New Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            required
                            minLength={8}
                            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            required
                            minLength={8}
                            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 flex justify-center items-center"
                    >
                        {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Reset Password"}
                    </button>
                </form>
            )}
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <Suspense fallback={<div className="text-center">Loading...</div>}>
                <ResetPasswordForm />
            </Suspense>
        </div>
    )
}
