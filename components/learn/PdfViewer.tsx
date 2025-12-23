import React from "react";
import { FileText, Download, Lock } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface PdfViewerProps {
    url?: string;
    isAuthenticated: boolean;
    title?: string;
}

export default function PdfViewer({ url, isAuthenticated, title = "Course Notes" }: PdfViewerProps) {
    const isEnabled = !!url;

    // Trigger Card Component
    const TriggerCard = (
        <div
            className={`flex items-center gap-4 p-4 border border-gray-200 rounded-md bg-gray-50 transition-all group w-full text-left ${isEnabled
                ? "hover:bg-white hover:border-blue-600 hover:shadow-sm cursor-pointer"
                : "opacity-60 cursor-not-allowed"
                }`}
        >
            <FileText className="w-6 h-6 text-red-500" />
            <div className="flex flex-col">
                <span className="font-semibold text-gray-900 text-sm">
                    {title}
                </span>
                <span className="text-xs text-gray-500">
                    {isEnabled ? "Click to view notes" : "No notes available"}
                </span>
            </div>
            {isEnabled && (
                <Download className="w-5 h-5 text-gray-400 ml-auto group-hover:text-gray-600" />
            )}
        </div>
    );

    if (!isEnabled) {
        return <div>{TriggerCard}</div>;
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                {TriggerCard}
            </DialogTrigger>
            <DialogContent className="max-w-4xl h-[85vh] flex flex-col p-0">
                <DialogHeader className="px-6 py-4 border-b border-gray-100">
                    <DialogTitle className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-red-500" />
                        {title}
                    </DialogTitle>
                </DialogHeader>

                <div className="flex-1 w-full bg-gray-100 overflow-hidden relative">
                    {!isAuthenticated ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 text-center p-6">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                <Lock className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Login Required</h3>
                            <p className="text-gray-500 max-w-md mb-6">
                                Please log in to access the course notes.
                            </p>
                            {/* You could add a login button here if you had a login function */}
                        </div>
                    ) : (
                        <iframe
                            src={`${url}#toolbar=0`}
                            className="w-full h-full border-none"
                            title={title}
                        />
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
