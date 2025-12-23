import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"


export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatDuration(seconds?: number): string {
    if (!seconds) return "0 min";

    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);

    if (h > 0) {
        return `${h} hr ${m} min`;
    }
    if (m > 0) {
        return `${m} min ${s > 0 ? `${s} sec` : ""}`;
    }
    return `${s} sec`;
}
