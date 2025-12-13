import Link from "next/link"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

export function Footer() {
    return (
        <footer className="bg-blue-950 text-white py-12 md:py-16">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Brand Section */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-blue-950 font-bold">
                            DG
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold leading-none">Dr Gaurang</span>
                            <span className="text-sm font-bold leading-none">Gaikwad</span>
                        </div>
                    </div>
                    <p className="text-sm text-blue-200">
                        Empowering medical professionals with world-class education and continuous learning opportunities.
                    </p>
                    <div className="flex gap-4">
                        <Link href="#" className="p-2 bg-blue-900 rounded hover:bg-blue-800 transition-colors">
                            <Facebook className="h-4 w-4" />
                        </Link>
                        <Link href="#" className="p-2 bg-blue-900 rounded hover:bg-blue-800 transition-colors">
                            <Twitter className="h-4 w-4" />
                        </Link>
                        <Link href="#" className="p-2 bg-blue-900 rounded hover:bg-blue-800 transition-colors">
                            <Linkedin className="h-4 w-4" />
                        </Link>
                        <Link href="#" className="p-2 bg-blue-900 rounded hover:bg-blue-800 transition-colors">
                            <Instagram className="h-4 w-4" />
                        </Link>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="font-bold mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-sm text-blue-200">
                        <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                        <li><Link href="/courses" className="hover:text-white transition-colors">Courses</Link></li>
                        <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                        <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                        <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                    </ul>
                </div>

                {/* Support */}
                <div>
                    <h3 className="font-bold mb-4">Support</h3>
                    <ul className="space-y-2 text-sm text-blue-200">
                        <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                        <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                        <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                        <li><Link href="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link></li>
                        <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
                    </ul>
                </div>

                {/* Contact Us */}
                <div>
                    <h3 className="font-bold mb-4">Contact Us</h3>
                    <ul className="space-y-4 text-sm text-blue-200">
                        <li className="flex items-start gap-2">
                            <span>📍</span>
                            <span>123, Medical Plaza, Mumbai, Maharashtra - 400001</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <span>📞</span>
                            <span>+91 98765 43210</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <span>✉️</span>
                            <span>contact@drgaurang.com</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-8 pt-8 border-t border-blue-900 flex flex-col md:flex-row justify-between items-center text-xs text-blue-300">
                <p>&copy; 2024 Dr. Gaurang Gaikwad. All rights reserved.</p>
                <div className="flex gap-4 mt-4 md:mt-0">
                    <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
                    <Link href="/terms" className="hover:text-white">Terms of Service</Link>
                    <Link href="/cookies" className="hover:text-white">Cookies</Link>
                </div>
            </div>
        </footer>
    )
}
