'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Currency = 'INR' | 'USD';

interface CurrencyContextType {
    currency: Currency;
    isLoading: boolean;
    countryCode: string;
    country: string;
    city: string;
}

const CurrencyContext = createContext<CurrencyContextType>({
    currency: 'USD',
    isLoading: true,
    countryCode: '',
    country: '',
    city: '',
});

export function useCurrency() {
    return useContext(CurrencyContext);
}

export function CurrencyProvider({ children }: { children: ReactNode }) {
    const [currency, setCurrency] = useState<Currency>('USD');
    const [isLoading, setIsLoading] = useState(true);
    const [countryCode, setCountryCode] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');

    useEffect(() => {
        async function detectCurrency() {
            try {
                const response = await fetch('/api/geo');
                if (response.ok) {
                    const data = await response.json();
                    setCurrency(data.currency);
                    setCountryCode(data.countryCode);
                    setCountry(data.country || '');
                    setCity(data.city || '');
                }
            } catch (error) {
                console.error('Failed to detect currency:', error);
                // Keep default USD
            } finally {
                setIsLoading(false);
            }
        }

        detectCurrency();
    }, []);

    return (
        <CurrencyContext.Provider value={{ currency, isLoading, countryCode, country, city }}>
            {children}
        </CurrencyContext.Provider>
    );
}
