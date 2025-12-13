"use client";

import Link from "next/link";

interface BreadcrumbsProps {
    items: { label: string; href: string }[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
    return (
        <div className="py-8 pb-4 text-sm font-medium text-blue-600">
            {items.map((item, index) => (
                <span key={item.href}>
                    <Link href={item.href} className="hover:underline">
                        {item.label}
                    </Link>
                    {index < items.length - 1 && (
                        <span className="mx-2 text-gray-400">&gt;</span>
                    )}
                </span>
            ))}
        </div>
    );
}
