import { Button } from "@/components/ui/button"
import { PlayCircle, ArrowRight } from "lucide-react"
import Image from "next/image"

export function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-white pt-16 pb-20 lg:pt-24 lg:pb-32">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* Text Content */}
                    <div className="flex-1 space-y-8 text-center lg:text-left">
                        <h1 className="text-4xl font-extrabold tracking-tight text-blue-950 sm:text-5xl lg:text-6xl">
                            Learn. Heal. Lead.
                        </h1>
                        <p className="text-lg text-muted-foreground bg-clip-text text-transparent bg-gradient-to-r from-gray-600 to-gray-900 max-w-2xl mx-auto lg:mx-0">
                            Advance your medical expertise with world-class courses designed for doctors, by doctors. Control your pace, earn certifications, and transform patient care.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 rounded-full px-8 h-12">
                                Explore Courses <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="lg" className="rounded-full px-8 h-12 border-blue-200 text-blue-700 hover:bg-blue-50">
                                <PlayCircle className="mr-2 h-4 w-4" /> Watch Demo
                            </Button>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-8 pt-8 border-t border-blue-100 mt-8">
                            <div>
                                <div className="text-3xl font-bold text-blue-600">500+</div>
                                <div className="text-sm text-muted-foreground">Expert Courses</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-blue-600">10K+</div>
                                <div className="text-sm text-muted-foreground">Medical Doctors</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-blue-600">98%</div>
                                <div className="text-sm text-muted-foreground">Satisfaction</div>
                            </div>
                        </div>
                    </div>

                    {/* Image Content */}
                    <div className="flex-1 relative">
                        <div className="relative z-10 mx-auto w-full max-w-[500px] aspect-square rounded-full bg-blue-100 overflow-hidden border-[12px] border-white shadow-xl">
                            {/* Placeholder for Doctor Image */}
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                                <span className="text-lg">Doctor Image Placeholder</span>
                                {/* Real implementation would be: <Image src="/hero-doctor.jpg" alt="Doctor" fill className="object-cover" /> */}
                            </div>
                        </div>

                        {/* Floating Badges */}
                        <div className="absolute top-10 right-0 z-20 animate-bounce duration-[3000ms]">
                            <div className="bg-blue-600 text-white p-3 rounded-lg shadow-lg flex items-center gap-3">
                                <div className="bg-white/20 p-2 rounded">
                                    <span className="font-bold text-lg">90%</span>
                                </div>
                                <div className="text-xs">
                                    <div className="font-semibold">Of Students Recommend</div>
                                </div>
                            </div>
                        </div>

                        <div className="absolute bottom-10 left-0 z-20">
                            <div className="bg-white p-4 rounded-xl shadow-lg border border-blue-50">
                                <div className="flex -space-x-2 mb-2">
                                    <div className="h-8 w-8 rounded-full bg-gray-300 border-2 border-white" />
                                    <div className="h-8 w-8 rounded-full bg-gray-400 border-2 border-white" />
                                    <div className="h-8 w-8 rounded-full bg-gray-500 border-2 border-white" />
                                </div>
                                <div className="text-center">
                                    <span className="block text-primary font-bold text-xl">50+</span>
                                    <span className="text-xs text-muted-foreground">Daily Live Classes</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
