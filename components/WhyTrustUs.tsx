export default function WhyTrustUs() {
    return (
        <section className="relative py-20 bg-gradient-to-b from-transparent to-[#F8FAFC]">
            {/* Top fade from previous section */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-4 " />
            <div className="max-w-[1240px] mx-auto px-6">
                <div className="text-center max-w-[700px] mx-auto mb-16">
                    <h2 className="text-[2.5rem] font-bold text-[#1e3a8a] mb-4">
                        Why Trust Us?
                    </h2>
                    <p className="text-[1.05rem] text-[#64748b]">
                        We're committed to delivering the highest quality medical education
                        that empowers doctors to excel in their practice.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Card 1 */}
                    <div className="bg-white rounded-xl border border-[#E2E8F0] p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)]">
                        <div className="w-14 h-14 bg-[#2563EB] rounded-xl flex items-center justify-center text-white text-[1.4rem] mb-6">
                            <i className="fa-solid fa-ribbon"></i>
                        </div>
                        <h3 className="text-[1.25rem] font-bold text-[#1e3a8a] mb-3">
                            Accredited Instructors
                        </h3>
                        <p className="text-sm text-[#475569] leading-relaxed">
                            Learn from board-certified specialists and leading medical experts
                            with decades of clinical experience.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white rounded-xl border border-[#E2E8F0] p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)]">
                        <div className="w-14 h-14 bg-[#2563EB] rounded-xl flex items-center justify-center text-white text-[1.4rem] mb-6">
                            <i className="fa-solid fa-user-group"></i>
                        </div>
                        <h3 className="text-[1.25rem] font-bold text-[#1e3a8a] mb-3">
                            Trusted by Doctors
                        </h3>
                        <p className="text-sm text-[#475569] leading-relaxed">
                            Join 50,000+ medical professionals worldwide who advance their
                            careers with our platform.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white rounded-xl border border-[#E2E8F0] p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)]">
                        <div className="w-14 h-14 bg-[#2563EB] rounded-xl flex items-center justify-center text-white text-[1.4rem] mb-6">
                            <i className="fa-solid fa-globe"></i>
                        </div>
                        <h3 className="text-[1.25rem] font-bold text-[#1e3a8a] mb-3">
                            Global Access
                        </h3>
                        <p className="text-sm text-[#475569] leading-relaxed">
                            Access courses anywhere, anytime. Study from home, clinic, or
                            on-the-go with our mobile-friendly platform.
                        </p>
                    </div>

                    {/* Card 4 */}
                    <div className="bg-white rounded-xl border border-[#E2E8F0] p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)]">
                        <div className="w-14 h-14 bg-[#2563EB] rounded-xl flex items-center justify-center text-white text-[1.4rem] mb-6">
                            <i className="fa-regular fa-clock"></i>
                        </div>
                        <h3 className="text-[1.25rem] font-bold text-[#1e3a8a] mb-3">
                            Flexible Learning
                        </h3>
                        <p className="text-sm text-[#475569] leading-relaxed">
                            Self-paced courses that fit your schedule. Learn during your
                            downtime without disrupting patient care.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
