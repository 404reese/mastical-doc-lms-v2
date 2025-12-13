export default function Testimonials() {
    return (
        <section className="py-20 bg-[#F8FAFC]">
            <div className="max-w-[1240px] mx-auto px-6">
                <div className="text-center max-w-[700px] mx-auto mb-16">
                    <h2 className="text-[2.5rem] font-bold text-[#1e3a8a] mb-4">
                        Trusted by Medical Professionals
                    </h2>
                    <p className="text-[1.05rem] text-[#64748b]">
                        Join thousands of doctors worldwide who are advancing their careers
                        and improving patient outcomes with our courses.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Review 1 */}
                    <div className="bg-white rounded-xl border border-[#E2E8F0] p-8 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)]">
                        <div className="text-[#FACC15] mb-4 text-[0.9rem] tracking-[2px]">
                            ★★★★★
                        </div>
                        <i className="fa-solid fa-quote-left text-2xl text-[#93C5FD] mb-4"></i>
                        <p className="italic text-[#334155] mb-6 text-base leading-relaxed">
                            "The cardiology courses here transformed my practice. The case
                            studies were incredibly practical and helped me implement new
                            techniques immediately."
                        </p>
                        <div className="flex items-center gap-4 mt-auto">
                            <img
                                src="https://randomuser.me/api/portraits/women/44.jpg"
                                alt="User"
                                className="w-12 h-12 rounded-full object-cover"
                            />
                            <div>
                                <h4 className="text-[1rem] font-bold text-[#0F172A] mb-0.5">
                                    Dr. Priya Sharma
                                </h4>
                                <span className="text-sm text-[#64748b]">
                                    Cardiologist
                                    <br />
                                    Mumbai, India
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Review 2 */}
                    <div className="bg-white rounded-xl border border-[#E2E8F0] p-8 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)]">
                        <div className="text-[#FACC15] mb-4 text-[0.9rem] tracking-[2px]">
                            ★★★★★
                        </div>
                        <i className="fa-solid fa-quote-left text-2xl text-[#93C5FD] mb-4"></i>
                        <p className="italic text-[#334155] mb-6 text-base leading-relaxed">
                            "Flexible learning that fits my hectic schedule. The CME credits
                            are a huge bonus, and the instructors are world-class
                            professionals."
                        </p>
                        <div className="flex items-center gap-4 mt-auto">
                            <img
                                src="https://randomuser.me/api/portraits/men/32.jpg"
                                alt="User"
                                className="w-12 h-12 rounded-full object-cover"
                            />
                            <div>
                                <h4 className="text-[1rem] font-bold text-[#0F172A] mb-0.5">
                                    Dr. James Martinez
                                </h4>
                                <span className="text-sm text-[#64748b]">
                                    Emergency Medicine
                                    <br />
                                    Miami, USA
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Review 3 */}
                    <div className="bg-white rounded-xl border border-[#E2E8F0] p-8 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)]">
                        <div className="text-[#FACC15] mb-4 text-[0.9rem] tracking-[2px]">
                            ★★★★★
                        </div>
                        <i className="fa-solid fa-quote-left text-2xl text-[#93C5FD] mb-4"></i>
                        <p className="italic text-[#334155] mb-6 text-base leading-relaxed">
                            "Outstanding quality and depth of content. The pediatric courses
                            covered everything from basics to advanced subspecialties. Highly
                            recommend!"
                        </p>
                        <div className="flex items-center gap-4 mt-auto">
                            <img
                                src="https://randomuser.me/api/portraits/women/65.jpg"
                                alt="User"
                                className="w-12 h-12 rounded-full object-cover"
                            />
                            <div>
                                <h4 className="text-[1rem] font-bold text-[#0F172A] mb-0.5">
                                    Dr. Sarah Al-Hassan
                                </h4>
                                <span className="text-sm text-[#64748b]">
                                    Pediatrician
                                    <br />
                                    Dubai, UAE
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
