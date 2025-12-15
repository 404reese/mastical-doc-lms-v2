"use client";

interface VideoPlayerProps {
    title: string;
    videoUrl?: string; // e.g. youtube/vimeo link. For this demo, we might use a placeholder or iframe
}

function toVimeoEmbedUrl(input?: string): string | undefined {
    if (!input) return undefined;

    // Already an embed URL
    if (input.includes("player.vimeo.com/video/")) return input;

    // Try to extract a Vimeo video id from common URL forms.
    // Examples:
    // - https://vimeo.com/76979871
    // - https://vimeo.com/76979871?h=8272103f6e
    // - https://vimeo.com/1095067122/f8534072a8   (unlisted hash in path)
    // - https://vimeo.com/channels/staffpicks/76979871
    // - https://vimeo.com/album/123/video/76979871
    //
    // Important: Vimeo sometimes uses an unlisted privacy hash either as `?h=...`
    // or as a second path segment (`/{id}/{hash}`); embeds require `?h=...`.
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
        // Default player chrome settings
        embed.searchParams.set("title", "0");
        embed.searchParams.set("byline", "0");
        embed.searchParams.set("portrait", "0");
        return embed.toString();
    } catch {
        // Fallback for non-URL strings: best-effort regex extraction.
        const match = input.match(/vimeo\.com\/(?:.*\/)?(\d+)(?:\/([0-9a-f]+))?(?:\b|\/|\?|#)/i);
        if (!match) return input;
        const videoId = match[1];
        const h = match[2];
        const base = `https://player.vimeo.com/video/${videoId}`;
        const params = new URLSearchParams({ title: "0", byline: "0", portrait: "0" });
        if (h) params.set("h", h);
        return `${base}?${params.toString()}`;
    }
}

export default function VideoPlayer({ title, videoUrl }: VideoPlayerProps) {
    const embedUrl = toVimeoEmbedUrl(videoUrl);

    return (
        <div className="w-full bg-black relative pt-[56.25%]">
            {embedUrl ? (
                <iframe
                    src={embedUrl}
                    className="absolute top-0 left-0 w-full h-full border-none"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    title={title}
                />
            ) : (
                <div className="absolute inset-0 flex items-center justify-center text-sm text-white/80">
                    No video selected
                </div>
            )}
        </div>
    );
}
