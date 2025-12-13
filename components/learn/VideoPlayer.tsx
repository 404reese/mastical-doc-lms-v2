"use client";

interface VideoPlayerProps {
    title: string;
    videoUrl?: string; // e.g. youtube/vimeo link. For this demo, we might use a placeholder or iframe
}

export default function VideoPlayer({ title, videoUrl }: VideoPlayerProps) {
    return (
        <div className="w-full bg-black relative pt-[56.25%]">
            {/* 
         In a real app, we'd parse the videoUrl to determine if it's Vimeo/YouTube/Native 
         and render the appropriate player. 
         For now mimicking the HTML iframe approach.
      */}
            <iframe
                src="https://player.vimeo.com/video/76979871?h=8272103f6e&title=0&byline=0&portrait=0"
                className="absolute top-0 left-0 w-full h-full border-none"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title={title}
            ></iframe>
        </div>
    );
}
