import { Card, CardContent } from "@/components/ui/card"
import { Award, Users, Globe2, Clock } from "lucide-react"

export function TrustSection() {
    const items = [
        {
            icon: Award,
            title: "Accredited Instructors",
            description: "Learn from board-certified doctors and industry leaders with years of clinical experience."
        },
        {
            icon: Users,
            title: "Trusted by Doctors",
            description: "Join 10,000+ medical professionals who trust our courses for their career growth."
        },
        {
            icon: Globe2,
            title: "Global Access",
            description: "Access courses anywhere, anytime. Our platform is optimized for mobile and desktop."
        },
        {
            icon: Clock,
            title: "Flexible Learning",
            description: "Self-paced courses that fit your busy schedule. Learn at your own convenience."
        }
    ]

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-blue-950 mb-4">Why Trust Us?</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        We are committed to delivering the high-quality medical education that ensures you continue to excel in your practice.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {items.map((item, index) => (
                        <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow bg-blue-50/50">
                            <CardContent className="pt-8 text-center">
                                <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-xl">
                                    <item.icon className="h-6 w-6" />
                                </div>
                                <h3 className="text-lg font-bold text-blue-900 mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {item.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
