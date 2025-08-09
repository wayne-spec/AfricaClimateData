import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import DataVisualization from "@/components/data-visualization"
import { getTopicById, getArticlesByTopic, getVisualizationsByTopic } from "@/lib/data"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, User, BarChart, Map, Table } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface TopicPageProps {
  params: {
    id: string
  }
}

export default async function TopicPage({ params }: TopicPageProps) {
  const topic = await getTopicById(params.id)

  if (!topic) {
    notFound()
  }

  const articles = await getArticlesByTopic(params.id)
  const visualizations = await getVisualizationsByTopic(params.id)

  // Group visualizations by type
  const charts = visualizations.filter((viz) => viz.type === "chart")
  const maps = visualizations.filter((viz) => viz.type === "map")
  const tables = visualizations.filter((viz) => viz.type === "table")

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <div className="bg-[#0B6623] text-white py-12 relative">
        <div className="absolute inset-0 opacity-20">
          <Image src={topic.imageUrl || "/placeholder.svg"} alt={topic.title} fill className="object-cover" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{topic.title}</h1>
          <p className="text-lg max-w-3xl">{topic.description}</p>
          <div className="flex space-x-4 mt-4 text-sm">
            <div>{topic.chartCount} charts</div>
            <div>{topic.articles} articles</div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Data Visualizations Section */}
        {visualizations.length > 0 && (
          <div className="mb-12">
            <Tabs defaultValue="all" className="mb-8">
              <TabsList>
                <TabsTrigger value="all" className="flex items-center gap-2">
                  All Data ({visualizations.length})
                </TabsTrigger>
                {charts.length > 0 && (
                  <TabsTrigger value="charts" className="flex items-center gap-2">
                    <BarChart className="h-4 w-4" />
                    Charts ({charts.length})
                  </TabsTrigger>
                )}
                {maps.length > 0 && (
                  <TabsTrigger value="maps" className="flex items-center gap-2">
                    <Map className="h-4 w-4" />
                    Maps ({maps.length})
                  </TabsTrigger>
                )}
                {tables.length > 0 && (
                  <TabsTrigger value="tables" className="flex items-center gap-2">
                    <Table className="h-4 w-4" />
                    Tables ({tables.length})
                  </TabsTrigger>
                )}
              </TabsList>

              <TabsContent value="all">
                <div className="grid grid-cols-1 gap-8">
                  {visualizations.map((viz) => (
                    <Link key={viz.id} href={`/visualizations/${viz.id}`} className="block">
                      <DataVisualization data={viz} />
                    </Link>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="charts">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {charts.map((chart) => (
                    <Link key={chart.id} href={`/visualizations/${chart.id}`} className="block">
                      <DataVisualization data={chart} />
                    </Link>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="maps">
                <div className="grid grid-cols-1 gap-8">
                  {maps.map((map) => (
                    <Link key={map.id} href={`/visualizations/${map.id}`} className="block">
                      <DataVisualization data={map} />
                    </Link>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="tables">
                <div className="grid grid-cols-1 gap-8">
                  {tables.map((table) => (
                    <Link key={table.id} href={`/visualizations/${table.id}`} className="block">
                      <DataVisualization data={table} />
                    </Link>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {/* Articles Section */}
        {articles.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-[#002147]">Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
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
      </div>

      <Footer />
    </main>
  )
}
