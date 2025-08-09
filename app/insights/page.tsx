import Link from "next/link"
import Image from "next/image"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { articles } from "@/lib/data"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Calendar, ArrowRight } from "lucide-react"

export default function InsightsPage() {
  // Sort articles by date (newest first)
  const sortedArticles = [...articles].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <div className="bg-[#0A5D22] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Daily Data Insights</h1>
              <p className="text-lg max-w-3xl">
                Bite-sized insights on how the world is changing, published every weekday.
              </p>
            </div>
            <Link
              href="/insights/all"
              className="hidden md:flex items-center text-white border border-white px-4 py-2 rounded hover:bg-white hover:text-[#0A5D22] transition-colors"
            >
              See all Daily Data Insights
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sortedArticles.map((article) => (
            <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image src={article.imageUrl || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
                {article.isNew && (
                  <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                    TODAY
                  </div>
                )}
              </div>
              <CardHeader>
                <CardTitle className="text-xl text-[#1d3d63]">
                  <Link href={`/articles/${article.id}`} className="hover:underline">
                    {article.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">{article.excerpt}</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>
                      {new Date(article.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Link
                  href={`/articles/${article.id}`}
                  className="text-[#1d3d63] hover:underline text-sm flex items-center"
                >
                  Continue reading
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            href="/insights/all"
            className="inline-flex items-center text-[#1d3d63] border border-[#1d3d63] px-4 py-2 rounded hover:bg-[#1d3d63] hover:text-white transition-colors"
          >
            See all Daily Data Insights
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  )
}
