import Image from "next/image";

export default function CourseFilters() {
    return (
        <section className="py-20 bg-[#F8FAFC]">
            <div className="max-w-[1240px] mx-auto px-6">
                <div className="text-center max-w-[700px] mx-auto mb-16">
                    <h2 className="text-[2.5rem] font-bold text-[#1e3a8a] mb-4">
                        Explore Courses
                    </h2>
                    <p className="text-[1.05rem] text-[#64748b]">
                        Find the perfect course tailored to your specialty, level, and
                        language preference.
                    </p>
                </div>

                {/* Filters */}
                <div className="flex justify-center gap-4 mb-6">
                    <button className="bg-[#2563EB] text-white px-6 py-3 rounded-md font-semibold text-sm flex items-center gap-2 transition-colors">
                        <i className="fa-regular fa-clock"></i> By Level
                    </button>
                    <button className="bg-[#E2E8F0] text-[#475569] px-6 py-3 rounded-md font-semibold text-sm flex items-center gap-2 transition-colors hover:bg-[#CBD5E1]">
                        <i className="fa-solid fa-book-open"></i> By Category
                    </button>
                    <button className="bg-[#E2E8F0] text-[#475569] px-6 py-3 rounded-md font-semibold text-sm flex items-center gap-2 transition-colors hover:bg-[#CBD5E1]">
                        <i className="fa-solid fa-globe"></i> By Language
                    </button>
                </div>

                {/* Sub Filters */}
                <div className="flex justify-center gap-4 mb-14">
                    <button className="bg-[#EFF6FF] text-[#2563EB] border border-[#2563EB] px-5 py-2 rounded-full font-medium text-sm transition-colors">
                        Advanced (5)
                    </button>
                    <button className="bg-white text-[#64748b] border border-[#E2E8F0] px-5 py-2 rounded-full font-medium text-sm transition-colors hover:bg-gray-50">
                        Beginner (3)
                    </button>
                    <button className="bg-white text-[#64748b] border border-[#E2E8F0] px-5 py-2 rounded-full font-medium text-sm transition-colors hover:bg-gray-50">
                        Intermediate (4)
                    </button>
                </div>

                {/* Course Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Course 1 */}
                    <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] group">
                        <div className="relative h-[200px]">
                            <Image
                                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
                                alt="Surgery"
                                fill
                                className="object-cover"
                            />
                            <span className="absolute top-3 left-3 bg-white text-[#2563EB] px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                                Advanced
                            </span>
                            <span className="absolute top-3 right-3 bg-white px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm text-[#0f172a]">
                                <i className="fa-solid fa-star text-[#FACC15] text-[0.8rem]"></i>{" "}
                                4.9
                            </span>
                        </div>
                        <div className="p-6">
                            <h3 className="text-[1.1rem] font-bold text-[#1e3a8a] mb-2 leading-relaxed group-hover:text-[#2563EB] transition-colors">
                                Advanced Cardiac Surgery Techniques
                            </h3>
                            <p className="text-[0.85rem] text-[#64748b] mb-6">
                                Dr. Sarah Johnson
                            </p>
                            <div className="flex justify-between items-center text-[0.8rem] text-[#64748b] font-medium">
                                <span className="flex items-center gap-1.5">
                                    <i className="fa-regular fa-clock"></i> 12 weeks
                                </span>
                                <span>1,240 students</span>
                            </div>
                        </div>
                    </div>

                    {/* Course 2 */}
                    <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] group">
                        <div className="relative h-[200px]">
                            <Image
                                src="https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
                                alt="Neuro"
                                fill
                                className="object-cover"
                            />
                            <span className="absolute top-3 left-3 bg-white text-[#2563EB] px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                                Advanced
                            </span>
                            <span className="absolute top-3 right-3 bg-white px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm text-[#0f172a]">
                                <i className="fa-solid fa-star text-[#FACC15] text-[0.8rem]"></i>{" "}
                                4.9
                            </span>
                        </div>
                        <div className="p-6">
                            <h3 className="text-[1.1rem] font-bold text-[#1e3a8a] mb-2 leading-relaxed group-hover:text-[#2563EB] transition-colors">
                                Neurosurgical Innovations
                            </h3>
                            <p className="text-[0.85rem] text-[#64748b] mb-6">
                                Dr. James Williams
                            </p>
                            <div className="flex justify-between items-center text-[0.8rem] text-[#64748b] font-medium">
                                <span className="flex items-center gap-1.5">
                                    <i className="fa-regular fa-clock"></i> 14 weeks
                                </span>
                                <span>756 students</span>
                            </div>
                        </div>
                    </div>

                    {/* Course 3 */}
                    <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] group">
                        <div className="relative h-[200px]">
                            <Image
                                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
                                alt="Cardio"
                                fill
                                className="object-cover"
                            />
                            <span className="absolute top-3 left-3 bg-white text-[#2563EB] px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                                Advanced
                            </span>
                            <span className="absolute top-3 right-3 bg-white px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm text-[#0f172a]">
                                <i className="fa-solid fa-star text-[#FACC15] text-[0.8rem]"></i>{" "}
                                4.9
                            </span>
                        </div>
                        <div className="p-6">
                            <h3 className="text-[1.1rem] font-bold text-[#1e3a8a] mb-2 leading-relaxed group-hover:text-[#2563EB] transition-colors">
                                Interventional Cardiology
                            </h3>
                            <p className="text-[0.85rem] text-[#64748b] mb-6">
                                Dr. David Lee
                            </p>
                            <div className="flex justify-between items-center text-[0.8rem] text-[#64748b] font-medium">
                                <span className="flex items-center gap-1.5">
                                    <i className="fa-regular fa-clock"></i> 12 weeks
                                </span>
                                <span>1,580 students</span>
                            </div>
                        </div>
                    </div>

                    {/* Course 4 */}
                    <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] group">
                        <div className="relative h-[200px]">
                            <Image
                                src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
                                alt="Ortho"
                                fill
                                className="object-cover"
                            />
                            <span className="absolute top-3 left-3 bg-white text-[#2563EB] px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                                Advanced
                            </span>
                            <span className="absolute top-3 right-3 bg-white px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm text-[#0f172a]">
                                <i className="fa-solid fa-star text-[#FACC15] text-[0.8rem]"></i>{" "}
                                4.8
                            </span>
                        </div>
                        <div className="p-6">
                            <h3 className="text-[1.1rem] font-bold text-[#1e3a8a] mb-2 leading-relaxed group-hover:text-[#2563EB] transition-colors">
                                Orthopedic Surgery Essentials
                            </h3>
                            <p className="text-[0.85rem] text-[#64748b] mb-6">
                                Dr. Robert Martinez
                            </p>
                            <div className="flex justify-between items-center text-[0.8rem] text-[#64748b] font-medium">
                                <span className="flex items-center gap-1.5">
                                    <i className="fa-regular fa-clock"></i> 11 weeks
                                </span>
                                <span>1,340 students</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-14">
                    <button className="bg-white text-[#2563EB] border border-[#2563EB] px-10 py-3 rounded-md font-semibold text-base hover:bg-[#DBEAFE] transition-all flex items-center gap-2 mx-auto">
                        See All Courses <i className="fa-solid fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        </section>
    );
}
