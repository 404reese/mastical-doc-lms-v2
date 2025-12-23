"use client";

import { useRef, useEffect, useCallback, useState } from "react";

interface VideoPlayerProps {
    title: string;
    videoUrl?: string;
    onVideoEnd?: () => void;
}

function toVimeoEmbedUrl(input?: string): string | undefined {
    if (!input) return undefined;

    // Already an embed URL
    if (input.includes("player.vimeo.com/video/")) {
        const url = new URL(input);
        url.searchParams.set("autoplay", "0");
        return url.toString();
    }

    // Try to extract a Vimeo video id from common URL forms.
    try {
        const url = new URL(input);

        const segments = url.pathname.split("/").filter(Boolean);
        const idIndex = segments.findIndex((s) => /^\d+$/.test(s));
        const videoId = idIndex >= 0 ? segments[idIndex] : undefined;
        if (!videoId) return input;

        const hFromQuery = url.searchParams.get("h");
        const maybeHashFromPath = segments[idIndex + 1];
        const hFromPath = maybeHashFromPath && /^[0-9a-f]+$/i.test(maybeHashFromPath) ? maybeHashFromPath : null;
        const h = hFromQuery || hFromPath;

        const embed = new URL(`https://player.vimeo.com/video/${videoId}`);
        if (h) embed.searchParams.set("h", h);
        embed.searchParams.set("autoplay", "0");
        embed.searchParams.set("title", "0");
        embed.searchParams.set("byline", "0");
        embed.searchParams.set("portrait", "0");
        return embed.toString();
    } catch {
        // Fallback for non-URL strings
        const match = input.match(/vimeo\.com\/(?:.*\/)?(\d+)(?:\/([0-9a-f]+))?(?:\b|\/|\?|#)/i);
        if (!match) return input;
        const videoId = match[1];
        const h = match[2];
        const params = new URLSearchParams({ autoplay: "0", title: "0", byline: "0", portrait: "0" });
        if (h) params.set("h", h);
        return `https://player.vimeo.com/video/${videoId}?${params.toString()}`;
    }
}

export default function VideoPlayer({ title, videoUrl, onVideoEnd }: VideoPlayerProps) {
    const embedUrl = toVimeoEmbedUrl(videoUrl);
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const playerRef = useRef<any>(null);
    const onVideoEndRef = useRef(onVideoEnd);

    // Keep the ref updated
    useEffect(() => {
        onVideoEndRef.current = onVideoEnd;
    }, [onVideoEnd]);

    // Initialize Vimeo Player SDK after iframe loads
    const handleIframeLoad = useCallback(async () => {
        if (!iframeRef.current) return;

        // Cleanup previous player
        if (playerRef.current) {
            try {
                playerRef.current.destroy();
            } catch (e) {
                // Ignore cleanup errors
            }
            playerRef.current = null;
        }

        try {
            // Dynamically import to avoid SSR issues
            const { default: Player } = await import("@vimeo/player");

            const player = new Player(iframeRef.current);
            playerRef.current = player;

            // Listen for video end event
            player.on("ended", () => {
                console.log("Video ended - triggering callback");
                if (onVideoEndRef.current) {
                    onVideoEndRef.current();
                }
            });

            await player.ready();
            console.log("Vimeo player ready");
        } catch (err) {
            console.error("Vimeo player initialization error:", err);
        }
    }, []);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (playerRef.current) {
                try {
                    playerRef.current.destroy();
                } catch (e) {
                    // Ignore cleanup errors
                }
                playerRef.current = null;
            }
        };
    }, []);

    // Re-initialize when video URL changes
    useEffect(() => {
        if (embedUrl && iframeRef.current) {
            // The iframe onLoad will handle initialization
        }
    }, [embedUrl]);

    return (
        <div className="w-full bg-black relative pt-[56.25%]">
            {embedUrl ? (
                <iframe
                    ref={iframeRef}
                    src={embedUrl}
                    className="absolute top-0 left-0 w-full h-full border-none"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    title={title}
                    onLoad={handleIframeLoad}
                />
            ) : (
                <div className="absolute inset-0 flex items-center justify-center text-sm text-white/80">
                    No video selected
                </div>
            )}
        </div>
    );
}
