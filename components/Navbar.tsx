"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

interface NavbarProps {
    isLoggedIn?: boolean;
}

export default function Navbar({ isLoggedIn = false }: NavbarProps) {
    const pathname = usePathname();
    const isHome = pathname === "/";

    return (
        <nav
            className={cn(
                "py-5 bg-transparent",
                isHome && "absolute top-0 left-0 right-0 z-50 w-full"
            )}
        >
            <div className="max-w-[1240px] mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <img src="/main-logo.webp" alt="Mastical Doc LMS" className="h-12" />
                </Link>

                {/* Nav Links */}
                <ul className="hidden md:flex gap-10">
                    <li>
                        <Link
                            href="/"
                            className="text-[#334155] font-medium text-[1rem] hover:text-[#2563EB] transition-colors"
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/courses"
                            className="text-[#334155] font-medium text-[1rem] hover:text-[#2563EB] transition-colors"
                        >
                            Courses
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/forums"
                            className="text-[#334155] font-medium text-[1rem] hover:text-[#2563EB] transition-colors"
                        >
                            Forums
                        </Link>
                    </li>
                    {isLoggedIn && (
                        <li>
                            <Link
                                href="/admin/dashboard"
                                className="text-[#EF4444] font-semibold text-[1rem] hover:text-[#dc2626] transition-colors"
                            >
                                Admin
                            </Link>
                        </li>
                    )}
                </ul>

                {/* Nav Actions */}
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-1.5 font-semibold text-[#334155] cursor-pointer hover:text-[#2563EB] transition-colors">
                        <i className="fa-solid fa-globe"></i> EN
                    </div>
                    {isLoggedIn ? (
                        <Link href="/dashboard">
                            <button className="bg-[#2563EB] text-white px-6 py-2.5 rounded-md font-semibold text-sm hover:bg-[#1D4ED8] transition-all">
                                Dashboard
                            </button>
                        </Link>
                    ) : (
                        <Link href="/login">
                            <button className="bg-[#2563EB] text-white px-6 py-2.5 rounded-md font-semibold text-sm hover:bg-[#1D4ED8] transition-all">
                                Get Started
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}
