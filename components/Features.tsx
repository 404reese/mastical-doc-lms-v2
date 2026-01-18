export default function Features() {
    const features = [
        {
            title: "Comprehensive Duration",
            description: "Each course runs for 4–5 months, enabling in-depth understanding and structured concept development.",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
            ),
        },
        {
            title: "Online & Hybrid Learning",
            description: "Courses are conducted online through live lectures, with a hybrid format that combines real-time learning and recorded access.",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                    <line x1="8" y1="21" x2="16" y2="21"></line>
                    <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
            ),
        },
        {
            title: "Extended Recording Access",
            description: "Recordings of all live sessions remain available beyond the course duration, allowing self-paced study and repeated revision.",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
            ),
        },
        {
            title: "Multiple Expert Faculty",
            description: "Learn from multiple experienced speakers, gaining diverse clinical perspectives and practical insights.",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
            ),
        },
        {
            title: "Flexible for Practitioners",
            description: "Designed to support students and practicing clinicians, allowing learning to be balanced alongside studies or clinical work.",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3v18"></path>
                    <path d="M8 8l4-5 4 5"></path>
                    <path d="M3 21h18"></path>
                </svg>
            ),
        },
        {
            title: "Clinical Case–Based Learning",
            description: "Structured learning through detailed clinical case presentations, emphasizing case analysis, remedy selection, and practical decision-making.",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 11l3 3L22 4"></path>
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                </svg>
            ),
        },
    ];

    return (
        <section className="w-full py-20 md:py-32 bg-gradient-to-b from-white to-[#EAF6FF]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold text-[#1E2A78] mb-4 leading-tight tracking-tight">
                        Features of Our Courses
                    </h2>
                    <p className="text-lg md:text-xl text-[#5A6B8C] leading-relaxed">
                        Experience a curriculum crafted for clinical excellence. We combine flexibility, 
                        expert knowledge, and modern technology to support your journey.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group bg-white/70 backdrop-blur-xl border border-white/80 rounded-[20px] p-8 md:p-10 flex flex-col items-start transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(30,42,120,0.12)] hover:border-[#1E2A78] hover:bg-white"
                        >
                            {/* Icon Box */}
                            <div className="w-12 h-12 bg-[#EAF6FF] rounded-[12px] flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-[#1E2A78]">
                                <div className="w-6 h-6 text-[#1E2A78] transition-all duration-300 group-hover:text-white">
                                    {feature.icon}
                                </div>
                            </div>

                            {/* Content */}
                            <h3 className="text-lg md:text-xl font-bold text-[#1E2A78] mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-sm md:text-base text-[#555555] leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
