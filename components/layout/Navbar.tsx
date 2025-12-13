import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Globe, Menu, X } from "lucide-react"

export function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white font-bold">
                            DG
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold leading-none text-blue-700">Dr Gaurang</span>
                            <span className="text-sm font-bold leading-none text-blue-700">Gaikwad</span>
                        </div>
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
                    <Link href="/admin" className="text-sm font-medium text-orange-500 transition-colors hover:text-orange-600">
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
