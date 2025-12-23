"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError("");

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email");
        const password = formData.get("password");

        try {
            const res = await fetch("/api/auth/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to sign in");
            }

            if (data.user.role === 'admin' || data.user.role === 'superadmin') {
                router.push("/admin/dashboard");
            } else {
                router.push("/dashboard");
            }
            router.refresh();
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
                <h1 className="text-2xl font-bold text-center">Sign In</h1>
                {error && (
                    <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded">
                        {error}
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
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
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
                    <div className="flex justify-end">
                        <Link
                            href="/forgot-password"
                            className="text-sm text-blue-600 hover:underline"
                        >
                            Forgot Password?
                        </Link>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 flex justify-center items-center"
                    >
                        {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Sign In"}
                    </button>
                </form>
                <p className="text-sm text-center text-gray-600">
                    Don't have an account?{" "}
                    <Link href="/register" className="text-blue-600 hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
}
