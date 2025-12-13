import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="py-5 bg-transparent">
            <div className="max-w-[1240px] mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="text-[2rem] text-[#0EA5E9]">
                        <i className="fa-solid fa-star-of-life"></i>
                    </div>
                    <div className="flex flex-col leading-[1.1] font-bold text-[1.1rem] text-[#0F172A]">
                        <span>Dr Gaurang</span>
                        <span>Gaikwad</span>
                    </div>
                </Link>

                {/* Nav Links */}
                <ul className="hidden md:flex gap-10">
                    <li>
                        <Link
                            href="#"
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
                            href="#"
                            className="text-[#334155] font-medium text-[1rem] hover:text-[#2563EB] transition-colors"
                        >
                            Forums
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="#"
                            className="text-[#EF4444] font-semibold text-[1rem] hover:text-[#dc2626] transition-colors"
                        >
                            Admin
                        </Link>
                    </li>
                </ul>

                {/* Nav Actions */}
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-1.5 font-semibold text-[#334155] cursor-pointer hover:text-[#2563EB] transition-colors">
                        <i className="fa-solid fa-globe"></i> EN
                    </div>
                    <button className="bg-[#2563EB] text-white px-6 py-2.5 rounded-md font-semibold text-sm hover:bg-[#1D4ED8] transition-all">
                        Get Started
                    </button>
                </div>
            </div>
        </nav>
    );
}
