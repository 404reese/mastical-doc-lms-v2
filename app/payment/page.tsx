"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, CheckCircle2, AlertCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PaymentPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const courseId = searchParams.get("courseId");

    const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    const handlePayment = async () => {
        if (!courseId) {
            setStatus("error");
            setMessage("Invalid course ID");
            return;
        }

        setStatus("processing");

        try {
            const res = await fetch("/api/purchase", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ courseId }),
            });

            if (res.ok) {
                setStatus("success");
                setTimeout(() => {
                    router.push(`/courses/${courseId}/learn`);
                }, 2000);
            } else {
                const data = await res.json();
                setStatus("error");
                setMessage(data.error || "Payment failed");
            }
        } catch (error) {
            setStatus("error");
            setMessage("Something went wrong");
        }
    };

    if (!courseId) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle className="text-red-600">Error</CardTitle>
                        <CardDescription>No course specified for purchase.</CardDescription>
                    </CardHeader>
                    <CardFooter>
                        <Button onClick={() => router.push("/courses")} className="w-full">
                            Back to Courses
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            <Navbar isLoggedIn={true} />
            <div className="flex-1 flex items-center justify-center py-20 px-4">
                <Card className="w-full max-w-md shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CreditCard className="w-6 h-6 text-blue-600" />
                            Secure Checkout
                        </CardTitle>
                        <CardDescription>
                            Complete your purchase to access the course.
                            <br />
                            <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold mt-2 block">
                                TEST MODE: No actual charge
                            </span>
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="p-4 bg-slate-100 rounded-lg flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-700">Total Amount</span>
                            <span className="text-lg font-bold text-slate-900">$49.00</span>
                        </div>

                        {status === "error" && (
                            <div className="p-3 bg-red-50 text-red-700 text-sm rounded-md flex items-center gap-2">
                                <AlertCircle className="w-4 h-4" />
                                {message}
                            </div>
                        )}

                        {status === "success" && (
                            <div className="p-3 bg-green-50 text-green-700 text-sm rounded-md flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4" />
                                Payment successful! Redirecting...
                            </div>
                        )}
                    </CardContent>
                    <CardFooter>
                        <Button
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6"
                            onClick={handlePayment}
                            disabled={status === "processing" || status === "success"}
                        >
                            {status === "processing" ? "Processing..." : "Pay Now"}
                        </Button>
                    </CardFooter>
                </Card>
            </div>
            <Footer />
        </div>
    );
}
