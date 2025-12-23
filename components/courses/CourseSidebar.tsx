"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import Link from "next/link";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useCurrency } from "@/contexts/CurrencyContext";

interface CourseSidebarProps {
    courseId: string;
    priceINR: number;
    priceUSD: number;
    originalPriceINR?: number;
    originalPriceUSD?: number;
    previewImage: string;
    previewVideoLink?: string;
    isPurchased?: boolean;
}

export default function CourseSidebar({
    courseId,
    priceINR,
    priceUSD,
    originalPriceINR,
    originalPriceUSD,
    previewImage,
    previewVideoLink,
    isPurchased = false,
}: CourseSidebarProps) {
    const { currency, isLoading } = useCurrency();
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    const previewEmbedUrl = previewVideoLink ? toVimeoEmbedUrl(previewVideoLink) : undefined;

    // Simple calculation for display - use safe defaults
    const safeINR = priceINR || 0;
    const safeUSD = priceUSD || 0;
    const discountINR = originalPriceINR ? Math.round(((originalPriceINR - safeINR) / originalPriceINR) * 100) : 0;
    const discountUSD = originalPriceUSD ? Math.round(((originalPriceUSD - safeUSD) / originalPriceUSD) * 100) : 0;

    return (
        <div className="sticky top-8 bg-white border border-gray-200 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] rounded-[2px] overflow-hidden max-w-[500px] mx-auto lg:mx-0">
            {/* Preview Container */}
            {previewEmbedUrl ? (
                <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
                    <DialogTrigger asChild>
                        <button
                            type="button"
                            className="relative block h-[220px] w-full bg-black cursor-pointer group"
                            aria-label="Preview this course"
                        >
                            <img
                                src={previewImage || "https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
                                alt="Course Preview"
                                className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity"
                            />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-white">
                                <div className="w-[60px] h-[60px] bg-white text-slate-900 rounded-full flex items-center justify-center text-2xl shadow-lg mb-2.5 transition-transform group-hover:scale-110">
                                    <Play className="fill-slate-900 w-6 h-6 ml-1" />
                                </div>
                                <span className="font-semibold text-base drop-shadow-md">Preview this course</span>
                            </div>
                        </button>
                    </DialogTrigger>

                    <DialogContent className="w-[calc(100%-2rem)] max-w-4xl p-0 overflow-hidden">
                        <div className="relative w-full bg-black pt-[56.25%]">
                            {isPreviewOpen ? (
                                <iframe
                                    src={previewEmbedUrl}
                                    className="absolute inset-0 h-full w-full"
                                    allow="autoplay; fullscreen; picture-in-picture"
                                    allowFullScreen
                                    title="Course preview video"
                                />
                            ) : null}
                        </div>
                    </DialogContent>
                </Dialog>
            ) : (
                <div className="relative h-[220px] bg-black group">
                    <img
                        src={previewImage || "https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
                        alt="Course Preview"
                        className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-white">
                        <div className="w-[60px] h-[60px] bg-white text-slate-900 rounded-full flex items-center justify-center text-2xl shadow-lg mb-2.5">
                            <Play className="fill-slate-900 w-6 h-6 ml-1" />
                        </div>
                        <span className="font-semibold text-base drop-shadow-md">Preview unavailable</span>
                    </div>
                </div>
            )}

            <div className="p-8">
                {/* Currency-based Pricing Display */}
                {isLoading ? (
                    <div className="flex items-baseline gap-2.5 mb-6">
                        <span className="text-[2rem] font-bold text-gray-300 animate-pulse">Loading...</span>
                    </div>
                ) : currency === 'INR' ? (
                    /* INR Pricing for India, Sri Lanka, Nepal */
                    <div className="flex items-baseline gap-2.5 mb-6">
                        <span className="text-[2rem] font-bold text-gray-900">₹{safeINR.toLocaleString('en-IN')}</span>
                        {originalPriceINR && (
                            <>
                                <span className="text-[1.1rem] text-gray-500 line-through">₹{originalPriceINR.toLocaleString('en-IN')}</span>
                                <span className="text-[1rem] text-gray-500">{discountINR}% off</span>
                            </>
                        )}
                    </div>
                ) : (
                    /* USD Pricing for other countries */
                    <div className="flex items-baseline gap-2.5 mb-6">
                        <span className="text-[2rem] font-bold text-gray-900">${safeUSD}</span>
                        {originalPriceUSD && (
                            <>
                                <span className="text-[1.1rem] text-gray-500 line-through">${originalPriceUSD}</span>
                                <span className="text-[1rem] text-gray-500">{discountUSD}% off</span>
                            </>
                        )}
                    </div>
                )}

                {isPurchased ? (
                    <Link
                        href={`/courses/${courseId}/learn`}
                        className="block w-full text-center py-3 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-md transition-colors mb-4"
                    >
                        Go to Course
                    </Link>
                ) : (
                    <Link
                        href={`/payment?courseId=${courseId}`}
                        className="block w-full text-center py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-colors mb-4"
                    >
                        Enroll Now
                    </Link>
                )}


                <div className="text-center mb-4 text-sm">
                    <span className="text-gray-500">Have doubts? <Link href="#" className="underline">Talk to Our Team</Link></span>
                </div>


            </div>
        </div>
    );
}

function toVimeoEmbedUrl(input: string) {
    try {
        const url = new URL(input);

        // Already an embed URL
        if (url.hostname === "player.vimeo.com" && url.pathname.startsWith("/video/")) {
            return input;
        }

        // Common share URL patterns:
        // - https://vimeo.com/1095067122
        // - https://vimeo.com/1095067122/f8534072a8
        // - https://vimeo.com/channels/.../1095067122
        const pathParts = url.pathname.split("/").filter(Boolean);
        const idPart = pathParts.find((p) => /^\d+$/.test(p));

        if (!idPart) return input;

        const idIndex = pathParts.indexOf(idPart);
        const maybeHash = pathParts[idIndex + 1];
        const hash = maybeHash && /^[a-zA-Z0-9]+$/.test(maybeHash) ? maybeHash : undefined;

        const embed = new URL(`https://player.vimeo.com/video/${idPart}`);
        if (hash) embed.searchParams.set("h", hash);

        // Preserve a couple of safe params if present
        for (const key of ["autoplay", "muted", "loop"] as const) {
            const value = url.searchParams.get(key);
            if (value != null) embed.searchParams.set(key, value);
        }

        return embed.toString();
    } catch {
        return input;
    }
}
