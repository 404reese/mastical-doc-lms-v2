import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function TestimonialsSection() {
    const testimonials = [
        {
            quote: "The practical approach in these courses transformed my practice. The focus on real-world scenarios makes it incredibly easier to understand complex topics.",
            author: "Dr. Priya Sharma",
            role: "Cardiologist",
            initials: "PS",
            image: "https://placehold.co/100x100?text=PS"
        },
        {
            quote: "This platform is a gold standard for medical education. The detailed explanations and up-to-date content have helped me stay ahead in my field.",
            author: "Dr. James Mitchell",
            role: "Neurosurgeon",
            initials: "JM",
            image: "https://placehold.co/100x100?text=JM"
        },
        {
            quote: "Truly exceptional courses! The certificates are recognized widely and have boosted my professional profile significantly.",
            author: "Dr. Sarah Al-Hassan",
            role: "General Practitioner",
            initials: "SA",
            image: "https://placehold.co/100x100?text=SA"
        },
        {
            quote: "The interactive modules make learning engaging and effective. I appreciate the flexibility to learn at my own pace amidst a busy schedule.",
            author: "Dr. Michael Chen",
            role: "Dermatologist",
            initials: "MC",
            image: "https://placehold.co/100x100?text=MC"
        },
        {
            quote: "Courses are tailored perfectly for practicing professionals. The diagnostic imaging module was comprehensive and very well structured.",
            author: "Dr. Elena Rodriguez",
            role: "Radiologist",
            initials: "ER",
            image: "https://placehold.co/100x100?text=ER"
        },
        {
            quote: "Top-notch instructors and high-quality video lectures. This is exactly what I needed to enhance my skills in orthopedic surgery.",
            author: "Dr. Raj Patel",
            role: "Orthopedic Surgeon",
            initials: "RP",
            image: "https://placehold.co/100x100?text=RP"
        }
    ]

    return (
        <section className="py-20 bg-blue-50/50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-blue-950 mb-4">Trusted by Medical Professionals</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Join thousands of doctors and students who are advancing their careers with our courses.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <Card key={index} className="border-none shadow-sm hover:shadow-md transition-shadow bg-white">
                            <CardContent className="p-6">
                                <div className="flex gap-1 mb-4">
                                    {[1, 2, 3, 4, 5].map((_, i) => (
                                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                                <div className="mb-6 relative">
                                    <Quote className="h-8 w-8 text-blue-100 absolute -top-2 -left-2 z-0" />
                                    <p className="text-sm text-gray-700 relative z-10 italic">
                                        "{testimonial.quote}"
                                    </p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Avatar>
                                        <AvatarImage src={testimonial.image} alt={testimonial.author} />
                                        <AvatarFallback>{testimonial.initials}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="font-bold text-sm text-blue-950">{testimonial.author}</div>
                                        <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
