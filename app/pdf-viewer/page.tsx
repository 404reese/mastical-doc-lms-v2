import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import SecurePdfClient from "@/components/learn/SecurePdfClient";
import { Lock } from "lucide-react";

interface PdfViewerPageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function PdfViewerPage({ searchParams }: PdfViewerPageProps) {
    // 1. Check Authentication
    const session = await getSession();
    if (!session?.userId) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-center p-6">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Lock className="w-8 h-8 text-gray-400" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
                <p className="text-gray-500 max-w-md">
                    You must be logged in to view this document. Please return to the course and log in.
                </p>
                <a href="/" className="mt-6 text-blue-600 hover:underline">
                    Return Home
                </a>
            </div>
        );
    }

    const { url } = await searchParams;

    if (!url || typeof url !== "string") {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-50">
                <p className="text-gray-500">Invalid Document URL</p>
            </div>
        );
    }

    return <SecurePdfClient url={url} />;
}
