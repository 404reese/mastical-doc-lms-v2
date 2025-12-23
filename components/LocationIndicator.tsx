'use client';

import { useCurrency } from '@/contexts/CurrencyContext';

export default function LocationIndicator() {
    const { city, country, isLoading } = useCurrency();

    if (isLoading) {
        return (
            <span className="text-[#94a3b8] text-xs animate-pulse">
                Detecting location...
            </span>
        );
    }

    if (!city && !country) {
        return null;
    }

    const locationText = city && country
        ? `${city}, ${country}`
        : country || city;

    return (
        <span className="text-[#94a3b8] text-xs flex items-center gap-1.5">
            <i className="fa-solid fa-location-dot text-[10px]"></i>
            Results based on your location: <span className="text-white">{locationText}</span>
        </span>
    );
}
