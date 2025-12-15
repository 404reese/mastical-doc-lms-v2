"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Globe, Menu } from "lucide-react"

import { cn } from "@/lib/utils"

export function Navbar() {
    const pathname = usePathname()
    const isHome = pathname === "/"

    return (
        <nav
            className={cn(
                "sticky top-0 z-50 w-full border-b",
                isHome ? "bg-transparent border-transparent" : "bg-background"
            )}
        >
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-2">
                        <img src="/main-logo.webp" alt="Mastical Doc LMS" className="h-12" />
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-6">
                    <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
                        Home
                    </Link>
                    <Link href="/courses" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                        Courses
                    </Link>
                    <Link href="/forum" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                        Forum
                    </Link>
                    <Link href="/admin/dashboard" className="text-sm font-medium text-orange-500 transition-colors hover:text-orange-600">
                        Admin
                    </Link>
                </div>

                {/* Right Section */}
                <div className="hidden md:flex items-center gap-4">
                    <div className="flex items-center gap-1 text-sm font-medium text-muted-foreground">
                        <Globe className="h-4 w-4" />
                        <span>EN</span>
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6">
                        Get Started
                    </Button>
                </div>

                {/* Mobile Menu Toggle (Placeholder) */}
                <div className="flex md:hidden">
                    <Button variant="ghost" size="icon">
                        <Menu className="h-6 w-6" />
                    </Button>
                </div>
            </div>
        </nav>
    )
}
