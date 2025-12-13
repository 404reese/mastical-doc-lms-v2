import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Star, Clock, Users, ChevronDown } from "lucide-react"
import Image from "next/image"

export function ExploreCoursesSection() {
    const courses = [
        {
            title: "Advanced Cardiac Surgery Techniques",
            instructor: "Dr. Sarah Jenkins",
            level: "Advanced",
            rating: 4.9,
            students: "1.2k",
            duration: "12 hours",
            image: "https://placehold.co/600x400/2563eb/ffffff?text=Cardiac+Surgery"
        },
        {
            title: "Neurosurgical Innovations",
            instructor: "Dr. James Wilson",
            level: "Advanced",
            rating: 4.8,
            students: "850",
            duration: "15 hours",
            image: "https://placehold.co/600x400/2563eb/ffffff?text=Neurosurgery"
        },
        {
            title: "Interventional Cardiology",
            instructor: "Dr. Emily Chen",
            level: "Intermediate",
            rating: 4.7,
            students: "2.1k",
            duration: "20 hours",
            image: "https://placehold.co/600x400/2563eb/ffffff?text=Cardiology"
        },
        {
            title: "Orthopedic Surgery Essentials",
            instructor: "Dr. Michael Ross",
            level: "Beginner",
            rating: 4.6,
            students: "3.5k",
            duration: "8 hours",
            image: "https://placehold.co/600x400/2563eb/ffffff?text=Orthopedics"
        }
    ]

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-blue-950 mb-4">Explore Courses</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                        Find the perfect course tailored to your specialty, level, and language preference.
                    </p>

                    {/* Filters */}
                    <div className="flex flex-wrap justify-center gap-4 mb-8">
                        <Button variant="secondary" className="bg-blue-600 text-white hover:bg-blue-700">
                            By Level
                        </Button>
                        <Button variant="outline" className="text-muted-foreground">
                            By Category
                        </Button>
                        <Button variant="outline" className="text-muted-foreground">
                            By Language
                        </Button>
                    </div>

                    <div className="flex flex-wrap justify-center gap-2 mb-12">
                        <Badge variant="secondary" className="px-4 py-1 text-blue-600 bg-blue-50 hover:bg-blue-100 cursor-pointer border border-blue-200">Artificial Intelligence</Badge>
                        <Badge variant="outline" className="px-4 py-1 text-muted-foreground hover:bg-gray-50 cursor-pointer">Digital Health</Badge>
                        <Badge variant="outline" className="px-4 py-1 text-muted-foreground hover:bg-gray-50 cursor-pointer">Telemedicine</Badge>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {courses.map((course, index) => (
                        <Card key={index} className="overflow-hidden border-none shadow-md hover:shadow-xl transition-all group">
                            <div className="relative h-48 w-full bg-gray-200">
                                {/* Image Placeholder Implementation */}
                                <div className="absolute inset-0 flex items-center justify-center bg-blue-100 text-blue-300 font-bold text-xl">
                                    Course Image
                                </div>
                                {/* 
                 <Image 
                    src={course.image} 
                    alt={course.title} 
                    fill 
                    className="object-cover transition-transform group-hover:scale-105"
                 />
                 */}
                                <div className="absolute top-3 left-3">
                                    <Badge className="bg-white/90 text-blue-700 hover:bg-white backdrop-blur-sm shadow-sm">{course.level}</Badge>
                                </div>
                                <div className="absolute top-3 right-3">
                                    <Badge variant="secondary" className="bg-yellow-400/90 text-yellow-950 hover:bg-yellow-400 backdrop-blur-sm shadow-sm flex gap-1 items-center">
                                        <Star className="h-3 w-3 fill-current" /> {course.rating}
                                    </Badge>
                                </div>
                            </div>

                            <CardContent className="p-5">
                                <h3 className="font-bold text-lg text-blue-950 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
                                    {course.title}
                                </h3>
                                <p className="text-sm text-muted-foreground mb-4">
                                    By <span className="text-blue-600 font-medium">{course.instructor}</span>
                                </p>

                                <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t">
                                    <div className="flex items-center gap-1">
                                        <Clock className="h-3 w-3" /> {course.duration}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Users className="h-3 w-3" /> {course.students} students
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Button variant="outline" size="lg" className="border-blue-200 text-blue-600 hover:bg-blue-50 rounded-full px-8">
                        See All Courses <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </div>
        </section>
    )
}
