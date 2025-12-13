import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-[#172554] text-[#94a3b8] pt-20">
            <div className="max-w-[1240px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.5fr] gap-12 pb-16">
                {/* Brand */}
                <div className="flex flex-col">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="text-[2rem] text-white">
                            <i className="fa-solid fa-star-of-life"></i>
                        </div>
                        <div className="flex flex-col leading-[1.1] font-bold text-[1.1rem] text-white">
                            <span>Dr Gaurang</span>
                            <span>Gaikwad</span>
                        </div>
                    </div>
                    <p className="max-w-[300px] mb-6 leading-relaxed">
                        Empowering medical professionals with world-class education and
                        continuous learning opportunities.
                    </p>
                    <div className="flex gap-4">
                        <Link
                            href="#"
                            className="w-9 h-9 bg-white/10 flex items-center justify-center rounded-full text-white transition-all hover:bg-[#2563EB]"
                        >
                            <i className="fa-brands fa-facebook-f"></i>
                        </Link>
                        <Link
                            href="#"
                            className="w-9 h-9 bg-white/10 flex items-center justify-center rounded-full text-white transition-all hover:bg-[#2563EB]"
                        >
                            <i className="fa-brands fa-twitter"></i>
                        </Link>
                        <Link
                            href="#"
                            className="w-9 h-9 bg-white/10 flex items-center justify-center rounded-full text-white transition-all hover:bg-[#2563EB]"
                        >
                            <i className="fa-brands fa-linkedin-in"></i>
                        </Link>
                        <Link
                            href="#"
                            className="w-9 h-9 bg-white/10 flex items-center justify-center rounded-full text-white transition-all hover:bg-[#2563EB]"
                        >
                            <i className="fa-brands fa-instagram"></i>
                        </Link>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-white text-[1.1rem] font-bold mb-6">
                        Quick Links
                    </h3>
                    <ul className="flex flex-col gap-3">
                        <li>
                            <Link href="#" className="hover:text-white transition-colors">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="hover:text-white transition-colors">
                                Courses
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="hover:text-white transition-colors">
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="hover:text-white transition-colors">
                                Contact
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="hover:text-white transition-colors">
                                Blog
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Support */}
                <div>
                    <h3 className="text-white text-[1.1rem] font-bold mb-6">Support</h3>
                    <ul className="flex flex-col gap-3">
                        <li>
                            <Link href="#" className="hover:text-white transition-colors">
                                Help Center
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="hover:text-white transition-colors">
                                Privacy Policy
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="hover:text-white transition-colors">
                                Terms of Service
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="hover:text-white transition-colors">
                                Cookie Policy
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="hover:text-white transition-colors">
                                FAQs
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Contact Us */}
                <div>
                    <h3 className="text-white text-[1.1rem] font-bold mb-6">
                        Contact Us
                    </h3>
                    <ul className="flex flex-col gap-5">
                        <li className="flex gap-3 items-start">
                            <i className="fa-regular fa-envelope mt-1"></i>
                            <span>academy@drgauranggaikwad.com</span>
                        </li>
                        <li className="flex gap-3 items-start">
                            <i className="fa-solid fa-phone mt-1"></i>
                            <span>+91 93243 21819</span>
                        </li>
                        <li className="flex gap-3 items-start">
                            <i className="fa-solid fa-location-dot mt-1"></i>
                            <span>
                                101, Shivana Apartment, Mogul Ln, Mahim, Mumbai - 400016
                            </span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="bg-[#0B1120] py-6 text-sm">
                <div className="max-w-[1240px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
                    <p>&copy; 2025 Dr. Gaurang Gaikwad Academy. All rights reserved.</p>
                    <div className="flex gap-8 justify-center">
                        <Link href="#" className="hover:text-white transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="#" className="hover:text-white transition-colors">
                            Terms of Service
                        </Link>
                        <Link href="#" className="hover:text-white transition-colors">
                            Support
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
