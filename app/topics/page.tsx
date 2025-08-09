import Link from "next/link"
import Image from "next/image"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { topics } from "@/lib/data"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, FileText } from "lucide-react"

export default function TopicsPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <div className="bg-africa-green text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Climate Topics</h1>
          <p className="text-lg max-w-3xl">
            Explore our research and data on climate change impacts, adaptation, and mitigation across Africa.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic) => (
            <Card key={topic.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                {/* 
                  AI-generated image description based on topic:
                  For temperature-trends: "Visualization of rising temperatures across Africa shown as a heat map with red and orange gradients, scientific and data-focused style"
                  For rainfall-patterns: "African landscape showing contrasting wet and dry regions with rainfall data visualization elements, blue droplet patterns overlaid on a map"
                  etc. (see the image-descriptions.ts file for all descriptions)
                */}
                <Image src={topic.imageUrl || "/placeholder.svg"} alt={topic.title} fill className="object-cover" />
              </div>
              <CardHeader>
                <CardTitle>
                  <Link href={`/topics/${topic.id}`} className="hover:text-africa-green transition-colors">
                    {topic.title}
                  </Link>
                </CardTitle>
                <CardDescription>{topic.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <BarChart className="h-4 w-4 mr-1" />
                    <span>{topic.chartCount} charts</span>
                  </div>
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-1" />
                    <span>{topic.articles} articles</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/topics/${topic.id}`} className="text-africa-green hover:underline text-sm">
                  Explore this topic →
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  )
}
