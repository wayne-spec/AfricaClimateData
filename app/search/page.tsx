import Link from "next/link"
import Image from "next/image"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import SearchForm from "@/components/search-form"
import DataChart from "@/components/data-chart"
import { searchContent } from "@/lib/data"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, User, BarChart, FileText } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface SearchPageProps {
  searchParams: {
    q?: string
  }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ""
  const results = await searchContent(query)

  const totalResults = results.topics.length + results.articles.length + results.charts.length

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <div className="bg-[#002147] text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Search Results</h1>
          <p className="text-lg mb-6">
            {query ? (
              <>
                Showing {totalResults} results for <span className="font-bold">"{query}"</span>
              </>
            ) : (
              "Please enter a search term"
            )}
          </p>
          <SearchForm placeholder="Search again..." />
        </div>
      </div>

      {query && (
        <div className="container mx-auto px-4 py-12">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="all">All Results ({totalResults})</TabsTrigger>
              <TabsTrigger value="topics">Topics ({results.topics.length})</TabsTrigger>
              <TabsTrigger value="articles">Articles ({results.articles.length})</TabsTrigger>
              <TabsTrigger value="charts">Charts ({results.charts.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              {/* Topics */}
              {results.topics.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold mb-6 text-[#002147]">Topics</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {results.topics.map((topic) => (
                      <Card key={topic.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="relative h-48">
                          <Image
                            src={topic.imageUrl || "/placeholder.svg"}
                            alt={topic.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <CardHeader>
                          <CardTitle>
                            <Link href={`/topics/${topic.id}`} className="hover:text-blue-600 transition-colors">
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
                          <Link href={`/topics/${topic.id}`} className="text-blue-600 hover:underline text-sm">
                            Explore this topic →
                          </Link>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Articles */}
              {results.articles.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold mb-6 text-[#002147]">Articles</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {results.articles.map((article) => (
                      <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="relative h-48">
                          <Image
                            src={article.imageUrl || "/placeholder.svg"}
                            alt={article.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <CardHeader>
                          <CardTitle className="text-xl">
                            <Link href={`/articles/${article.id}`} className="hover:text-blue-600 transition-colors">
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
                              <Clock className="h-4 w-4 mr-1" />
                              <span>{article.readTime} min read</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Link href={`/articles/${article.id}`} className="text-blue-600 hover:underline text-sm">
                            Read article →
                          </Link>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Charts */}
              {results.charts.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-[#002147]">Charts</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {results.charts.map((chart) => (
                      <DataChart key={chart.id} chartData={chart} />
                    ))}
                  </div>
                </div>
              )}

              {totalResults === 0 && (
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold mb-4 text-[#002147]">No results found</h2>
                  <p className="text-gray-600 mb-6">
                    We couldn't find any content matching your search term. Please try a different search.
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="topics">
              {results.topics.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.topics.map((topic) => (
                    <Card key={topic.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative h-48">
                        <Image
                          src={topic.imageUrl || "/placeholder.svg"}
                          alt={topic.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardHeader>
                        <CardTitle>
                          <Link href={`/topics/${topic.id}`} className="hover:text-blue-600 transition-colors">
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
                        <Link href={`/topics/${topic.id}`} className="text-blue-600 hover:underline text-sm">
                          Explore this topic →
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600">No topics found matching your search term.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="articles">
              {results.articles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.articles.map((article) => (
                    <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative h-48">
                        <Image
                          src={article.imageUrl || "/placeholder.svg"}
                          alt={article.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardHeader>
                        <CardTitle className="text-xl">
                          <Link href={`/articles/${article.id}`} className="hover:text-blue-600 transition-colors">
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
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{article.readTime} min read</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Link href={`/articles/${article.id}`} className="text-blue-600 hover:underline text-sm">
                          Read article →
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600">No articles found matching your search term.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="charts">
              {results.charts.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {results.charts.map((chart) => (
                    <DataChart key={chart.id} chartData={chart} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600">No charts found matching your search term.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      )}

      <Footer />
    </main>
  )
}
