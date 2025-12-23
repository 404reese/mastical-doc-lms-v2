export default function Features() {
    return (
        <section className="py-20 bg-[#F8FAFC]">
            <div className="max-w-[1240px] mx-auto px-6">
                <div className="text-center max-w-[700px] mx-auto mb-16">
                    <h2 className="text-[2.5rem] font-bold text-[#1e3a8a] mb-4">
                        Features of Our Courses
                    </h2>
                    <p className="text-[1.05rem] text-[#64748b]">
                        Comprehensive learning experiences designed to enhance your medical
                        expertise and clinical decision-making.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Feature 1 */}
                    <div className="bg-white rounded-xl border border-[#E2E8F0] p-10 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)]">
                        <div className="w-14 h-14 bg-[#2563EB] rounded-xl flex items-center justify-center text-white text-[1.4rem] mb-6">
                            <i className="fa-solid fa-book-open"></i>
                        </div>
                        <h3 className="text-[1.25rem] font-bold text-[#1e3a8a] mb-3">
                            Hybrid Lessons
                        </h3>
                        <p className="text-sm text-[#475569] leading-relaxed">
                            Get access to live online and recorded lessons.
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="bg-white rounded-xl border border-[#E2E8F0] p-10 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)]">
                        <div className="w-14 h-14 bg-[#2563EB] rounded-xl flex items-center justify-center text-white text-[1.4rem] mb-6">
                            <i className="fa-regular fa-file-lines"></i>
                        </div>
                        <h3 className="text-[1.25rem] font-bold text-[#1e3a8a] mb-3">
                            Real Case Studies
                        </h3>
                        <p className="text-sm text-[#475569] leading-relaxed">
                            Apply knowledge to real-world clinical scenarios and learn from
                            actual patient cases.
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div className="bg-white rounded-xl border border-[#E2E8F0] p-10 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)]">
                        <div className="w-14 h-14 bg-[#2563EB] rounded-xl flex items-center justify-center text-white text-[1.4rem] mb-6">
                            <i className="fa-regular fa-circle-check"></i>
                        </div>
                        <h3 className="text-[1.25rem] font-bold text-[#1e3a8a] mb-3">
                            Comprehensive Assessments
                        </h3>
                        <p className="text-sm text-[#475569] leading-relaxed">
                            Test your knowledge with quizzes, practical exams, and
                            peer-reviewed assignments.
                        </p>
                    </div>

                    {/* Feature 4 */}
                    <div className="bg-white rounded-xl border border-[#E2E8F0] p-10 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)]">
                        <div className="w-14 h-14 bg-[#2563EB] rounded-xl flex items-center justify-center text-white text-[1.4rem] mb-6">
                            <i className="fa-solid fa-medal"></i>
                        </div>
                        <h3 className="text-[1.25rem] font-bold text-[#1e3a8a] mb-3">
                            Accredited Certificates
                        </h3>
                        <p className="text-sm text-[#475569] leading-relaxed">
                            Earn CME credits and recognized certificates to advance your
                            professional credentials.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
