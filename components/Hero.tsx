export default function Hero() {
    return (
        <header className="relative w-full min-h-screen bg-gradient-to-b from-[#EAF6FF] to-white flex items-center justify-center pt-20 pb-16 text-center overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 flex flex-col items-center pb-16">
                
                {/* Sub Heading */}
                <h5 className="text-sm font-bold text-[#5A6B8C] tracking-[0.2em] uppercase mb-5">
                    WELCOME TO THE
                </h5>
                
                {/* Main Heading */}
                <h1 className="text-5xl md:text-6xl lg:text-[4rem] leading-[1.1] mb-9 text-[#1E2A78] font-extrabold tracking-tight">
                    ACADEMY OF CLASSICAL<br />
                    HOMEOPATHY
                </h1>
                
                {/* Description */}
                <p className="max-w-[800px] text-base md:text-lg leading-relaxed text-[#4A5C85] mb-12">
                    The Academy of Classical Homeopathy, led by Dr. Gaurang Gaikwad, offers clinically focused education in homeopathy across key specialties including endocrinology, ophthalmology, pediatrics, gynecology, geriatrics, and more. The academy also provides advanced training in miasms, nosodes, sarcodes, lesser-known remedies, and complex homeopathic concepts.
                </p>
                
                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-5 items-center">
                    <a 
                        href="/courses" 
                        className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-base font-semibold bg-[#1E2A78] text-white shadow-[0_10px_20px_rgba(30,42,120,0.2)] hover:shadow-[0_15px_30px_rgba(30,42,120,0.3)] hover:bg-[#151e5e] hover:-translate-y-0.5 transition-all duration-300"
                    >
                        Explore Courses
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </a>
                    
                    <button 
                        className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-base font-semibold bg-transparent text-[#1E2A78] border border-[#1E2A78] hover:bg-[#1E2A78]/5 hover:-translate-y-0.5 transition-all duration-300"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                        Watch Demo
                    </button>
                </div>

            </div>
        </header>
    );
}
