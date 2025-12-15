import Image from "next/image";

export default function Hero() {
    return (
        <header
            className="relative bg-gradient-to-b from-[#E0F2FE] to-transparent pt-16 pb-24 overflow-hidden h-screen flex items-center"
            style={{
                WebkitMaskImage:
                    "linear-gradient(to bottom, rgba(0,0,0,1) calc(100% - 10px), rgba(0,0,0,0) 100%)",
                maskImage:
                    "linear-gradient(to bottom, rgba(0,0,0,1) calc(100% - 10px), rgba(0,0,0,0) 100%)",
            }}
        >
            <div className="max-w-[1240px] mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-0">

                {/* Hero Content */}
                <div className="max-w-[550px] flex flex-col items-center lg:items-start text-center lg:text-left">
                    <h1 className="text-5xl lg:text-[4rem] leading-[1.1] mb-6 text-[#172554] font-extrabold">
                        Learn. Heal. Lead.
                    </h1>
                    <p className="text-lg lg:text-[1.15rem] mb-10 text-[#475569] leading-relaxed">
                        Advance your medical expertise with world-class courses designed for
                        doctors, by doctors. Learn at your pace, earn certifications, and
                        transform patient care.
                    </p>
                    <div className="flex gap-4 mb-16">
                        <a href="/courses" className="bg-[#2563EB] text-white px-7 py-3.5 rounded-md font-semibold text-base hover:bg-[#1D4ED8] transition-all flex items-center gap-2">
                            Explore Courses <i className="fa-solid fa-arrow-right"></i>
                        </a>
                        <button className="bg-white border border-[#2563EB] text-[#2563EB] px-7 py-3.5 rounded-md font-semibold text-base hover:bg-[#DBEAFE] transition-all flex items-center gap-2">
                            <i className="fa-solid fa-play"></i> Watch Demo
                        </button>
                    </div>

                    <div className="flex gap-16">
                        <div className="flex flex-col">
                            <h3 className="text-[2rem] text-[#2563EB] font-bold mb-1">
                                500+
                            </h3>
                            <span className="text-[#64748b] font-medium text-sm">
                                Expert Courses
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <h3 className="text-[2rem] text-[#2563EB] font-bold mb-1">
                                10K+
                            </h3>
                            <span className="text-[#64748b] font-medium text-sm">
                                Active Learners
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <h3 className="text-[2rem] text-[#2563EB] font-bold mb-1">
                                98%
                            </h3>
                            <span className="text-[#64748b] font-medium text-sm">
                                Satisfaction
                            </span>
                        </div>
                    </div>
                </div>

                {/* Hero Image Wrapper */}
                <div className="relative w-[350px] lg:w-[500px] h-[350px] lg:h-[500px] flex items-center justify-center">
                    {/* Gradient Aura */}
                    <div className="absolute w-[120%] h-[120%] bg-[#DBEAFE] rounded-full -z-10 -right-[10%] -top-[5%]"></div>

                    {/* Image Mask */}
                    <div className="w-[300px] h-[300px] lg:w-[420px] lg:h-[420px] rounded-full overflow-hidden relative z-10">
                        <Image
                            src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                            alt="Doctor"
                            fill
                            className="object-cover object-top"
                            priority
                        />
                    </div>

                    {/* Floating Badge Top Right */}
                    <div className="absolute top-[60px] lg:-right-5 -right-5 bg-[#2563EB] text-white px-5 py-3 rounded-xl shadow-[0_10px_30px_rgba(37,99,235,0.15)] z-20 flex items-center gap-4">
                        <div className="text-[1.2rem]">
                            <i className="fa-solid fa-star"></i>
                        </div>
                        <div className="flex flex-col leading-[1.2]">
                            <strong className="text-[1.2rem] font-bold">98%</strong>
                            <span className="text-xs opacity-90">Satisfaction Rate</span>
                        </div>
                    </div>

                    {/* Floating Badge Bottom Left */}
                    <div className="absolute bottom-[40px] lg:left-5 -left-5 bg-white p-5 rounded-2xl shadow-[0_10px_30px_rgba(37,99,235,0.15)] z-20 flex flex-col gap-2 min-w-[180px]">
                        <div className="text-left">
                            <strong className="block text-[1.5rem] text-[#2563EB] font-bold leading-none mb-1">
                                50k+
                            </strong>
                            <span className="text-[#64748b] text-sm">Online Members</span>
                        </div>
                        <div className="flex -space-x-2 mt-1">
                            <img
                                src="https://randomuser.me/api/portraits/men/32.jpg"
                                alt=""
                                className="w-8 h-8 rounded-full border-2 border-white"
                            />
                            <img
                                src="https://randomuser.me/api/portraits/women/44.jpg"
                                alt=""
                                className="w-8 h-8 rounded-full border-2 border-white"
                            />
                            <img
                                src="https://randomuser.me/api/portraits/men/85.jpg"
                                alt=""
                                className="w-8 h-8 rounded-full border-2 border-white"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
