import Image from "next/image"
import { notFound } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { getArticleById, getChartsByTopic } from "@/lib/data"
import DataChart from "@/components/data-chart"
import { Clock, User, Calendar, Share2, Bookmark, Printer } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ArticlePageProps {
  params: {
    id: string
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await getArticleById(params.id)

  if (!article) {
    notFound()
  }

  // Get related charts
  const relatedCharts = await getChartsByTopic(article.topicId)

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <article className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[#002147]">{article.title}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>
                  {new Date(article.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{article.readTime} min read</span>
              </div>
            </div>

            <div className="flex space-x-2 mb-8">
              <Button variant="outline" size="sm" className="flex items-center">
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </Button>
              <Button variant="outline" size="sm" className="flex items-center">
                <Bookmark className="h-4 w-4 mr-1" />
                Save
              </Button>
              <Button variant="outline" size="sm" className="flex items-center">
                <Printer className="h-4 w-4 mr-1" />
                Print
              </Button>
            </div>

            <div className="relative h-64 md:h-96 mb-8">
              <Image
                src={article.imageUrl || "/placeholder.svg"}
                alt={article.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </header>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl font-medium mb-6">{article.excerpt}</p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl
              nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl
              nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
            </p>

            <h2>Key findings</h2>

            <p>
              Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed
              euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
            </p>

            <ul>
              <li>Finding one about the topic with important implications</li>
              <li>Second key finding with supporting data points</li>
              <li>Third insight that helps understand the broader context</li>
              <li>Final observation that ties everything together</li>
            </ul>

            {relatedCharts.length > 0 && (
              <div className="my-8">
                <DataChart chartData={relatedCharts[0]} />
              </div>
            )}

            <h2>Analysis and implications</h2>

            <p>
              Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed
              euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
            </p>

            <blockquote>
              "Important quote from a researcher or expert that provides additional context and authority to the
              article's main points."
            </blockquote>

            <p>
              Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed
              euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
            </p>

            <h2>Conclusion</h2>

            <p>
              Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed
              euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-xl font-bold mb-4">About the author</h3>
            <div className="flex items-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full mr-4"></div>
              <div>
                <p className="font-bold">{article.author}</p>
                <p className="text-gray-600">Researcher at Global Data Insights</p>
              </div>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  )
}
