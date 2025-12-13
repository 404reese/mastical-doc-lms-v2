import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Stethoscope, FileText, BadgeCheck } from "lucide-react"

export function FeaturesSection() {
    const features = [
        {
            icon: BookOpen,
            title: "Interactive Lessons",
            description: "Engage with multimedia content, quizzes, and clinical scenarios to deepen your understanding."
        },
        {
            icon: Stethoscope,
            title: "Real Case Studies",
            description: "Apply theoretical knowledge to real-world patient cases studied by expert practitioners."
        },
        {
            icon: FileText,
            title: "Comprehensive Assessments",
            description: "Test your skills with rigorous exams designed to ensure mastery of medical concepts."
        },
        {
            icon: BadgeCheck,
            title: "Accredited Certificates",
            description: "Earn CMEs and widely recognized certificates upon successful course completion."
        }
    ]

    return (
        <section className="py-20 bg-blue-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-blue-950 mb-4">Features of Our Courses</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Our comprehensive learning approach is designed to enhance your medical expertise and clinical decision-making.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <Card key={index} className="border bg-white hover:border-blue-200 transition-colors">
                            <CardContent className="pt-8 text-center">
                                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-6 text-blue-600">
                                    <feature.icon className="h-6 w-6" />
                                </div>
                                <h3 className="text-lg font-bold text-blue-900 mb-2">{feature.title}</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
