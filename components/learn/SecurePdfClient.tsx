"use client";

import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { ChevronLeft, ChevronRight, Loader2, AlertCircle, ZoomIn, ZoomOut } from "lucide-react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Configure PDF worker
// Using unpkg for simplicity to avoid build config issues with standard Next.js setup
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface SecurePdfClientProps {
    url: string;
}

export default function SecurePdfClient({ url }: SecurePdfClientProps) {
    const [numPages, setNumPages] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [scale, setScale] = useState(1.2);

    // Use proxy to avoid CORS issues
    const proxyUrl = `/api/proxy/pdf?url=${encodeURIComponent(url)}`;

    // Prevent context menu (Right Click) globally on this page
    useEffect(() => {
        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault();
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            // Prevent Ctrl+S, Ctrl+P
            if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'p')) {
                e.preventDefault();
            }
        };

        document.addEventListener("contextmenu", handleContextMenu);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("contextmenu", handleContextMenu);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
        setLoading(false);
    }

    function onDocumentLoadError(err: Error) {
        console.error("PDF Load Error:", err);
        setError("Failed to load document.");
        setLoading(false);
    }

    const zoomIn = () => setScale(prev => Math.min(prev + 0.2, 3.0));
    const zoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.5));

    return (
        <div className="w-full min-h-screen bg-gray-900 flex flex-col items-center py-8 select-none relative">

            {/* Header */}
            <div className="fixed top-0 left-0 right-0 bg-gray-900/90 backdrop-blur-sm shadow-sm z-50 p-4 border-b border-gray-800 flex items-center justify-between">
                <div className="text-white font-medium text-sm px-4">
                    Dr Gaurang Gaikwad Academy
                </div>

                <div className="text-white text-sm font-mono opacity-80">
                    {numPages ? `${numPages} Pages` : "Loading..."}
                </div>

                <div className="px-4 flex items-center gap-2">
                    <button
                        onClick={zoomOut}
                        className="p-2 rounded-full hover:bg-white/10 text-white transition-colors"
                        title="Zoom Out"
                    >
                        <ZoomOut className="w-5 h-5" />
                    </button>

                    <span className="text-white text-xs font-mono w-12 text-center">
                        {Math.round(scale * 100)}%
                    </span>

                    <button
                        onClick={zoomIn}
                        className="p-2 rounded-full hover:bg-white/10 text-white transition-colors"
                        title="Zoom In"
                    >
                        <ZoomIn className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="mt-20 mb-12 flex flex-col items-center justify-center p-4 min-h-[500px] w-full max-w-5xl">
                {error ? (
                    <div className="flex flex-col items-center text-red-400 gap-2">
                        <AlertCircle className="w-8 h-8" />
                        <p>{error}</p>
                    </div>
                ) : (
                    <Document
                        file={proxyUrl}
                        onLoadSuccess={onDocumentLoadSuccess}
                        onLoadError={onDocumentLoadError}
                        loading={
                            <div className="flex flex-col items-center text-blue-400 gap-2 scale-150 mt-20">
                                <Loader2 className="w-8 h-8 animate-spin" />
                                <span className="text-sm">Loading document...</span>
                            </div>
                        }
                        className="flex flex-col items-center gap-8"
                    >
                        {numPages && Array.from(new Array(numPages), (el, index) => (
                            <div
                                key={`page_${index + 1}`}
                                className="relative group shadow-2xl"
                                onContextMenu={(e) => e.preventDefault()}
                            >
                                {/* Block interactions overlay */}
                                <div className="absolute inset-0 z-10" />

                                <Page
                                    pageNumber={index + 1}
                                    scale={scale}
                                    renderTextLayer={false}
                                    renderAnnotationLayer={false}
                                    className="bg-white"
                                    loading={
                                        <div className="w-[800px] h-[1100px] bg-white/5 animate-pulse flex items-center justify-center text-gray-500 mb-8 rounded-md">
                                            Loading Page {index + 1}...
                                        </div>
                                    }
                                />

                                {/* Page Number Indicator (Subtle) */}
                                <div className="absolute -left-12 top-0 text-white/30 text-xs font-mono hidden xl:block">
                                    {index + 1}
                                </div>
                            </div>
                        ))}
                    </Document>
                )}
            </div>

            {/* Footer Watermark */}
            <div className="fixed bottom-0 left-0 right-0 bg-black/80 text-white/40 text-[10px] py-1 text-center pointer-events-none z-50">
                Protected Content. © Dr Gaurang Gaikwad Academy. Do not distribute.
            </div>
        </div>
    );
}
