import Link from "next/link"
import Image from "next/image"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import DataVisualization from "@/components/data-visualization"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, User } from "lucide-react"

// Sample data for African CO2 emissions
const co2EmissionsData = {
  id: "co2-emissions-africa",
  title: "CO2 Emissions Across African Regions",
  description: "Annual CO2 emissions by African region, measured in million tonnes",
  type: "chart" as const,
  chartType: "line" as const,
  topicId: "co2-emissions",
  data: [
    { year: 1990, NorthAfrica: 152, WestAfrica: 62, EastAfrica: 28, CentralAfrica: 14, SouthernAfrica: 330 },
    { year: 1995, NorthAfrica: 178, WestAfrica: 68, EastAfrica: 32, CentralAfrica: 16, SouthernAfrica: 368 },
    { year: 2000, NorthAfrica: 210, WestAfrica: 85, EastAfrica: 38, CentralAfrica: 18, SouthernAfrica: 390 },
    { year: 2005, NorthAfrica: 256, WestAfrica: 102, EastAfrica: 45, CentralAfrica: 21, SouthernAfrica: 425 },
    { year: 2010, NorthAfrica: 312, WestAfrica: 128, EastAfrica: 58, CentralAfrica: 25, SouthernAfrica: 468 },
    { year: 2015, NorthAfrica: 345, WestAfrica: 156, EastAfrica: 72, CentralAfrica: 28, SouthernAfrica: 452 },
    { year: 2020, NorthAfrica: 368, WestAfrica: 178, EastAfrica: 86, CentralAfrica: 32, SouthernAfrica: 438 },
  ],
}

// Sample articles related to CO2 emissions in Africa
const relatedArticles = [
  {
    id: "carbon-budget-africa",
    title: "Africa's Carbon Budget in a 1.5°C World",
    excerpt:
      "How much carbon can African nations emit while still keeping global warming below 1.5°C? This article examines the concept of carbon budgets and their implications for African development.",
    author: "Dr. Ngozi Okonjo",
    date: "2023-06-15",
    readTime: 12,
    imageUrl: "/placeholder.svg?height=300&width=500",
  },
  {
    id: "emissions-trading-africa",
    title: "Carbon Markets in African Economies",
    excerpt:
      "Several African nations are exploring carbon markets as a way to reduce emissions while generating revenue. This article explores the challenges and opportunities of implementing emissions trading in developing economies.",
    author: "Kofi Annan",
    date: "2023-04-22",
    readTime: 8,
    imageUrl: "/placeholder.svg?height=300&width=500",
  },
  {
    id: "just-transition-africa",
    title: "Just Transition Pathways for African Nations",
    excerpt:
      "As the world moves away from fossil fuels, how can African countries ensure a just transition that addresses energy poverty while reducing emissions? This article examines case studies from across the continent.",
    author: "Amina Mohammed",
    date: "2023-05-10",
    readTime: 10,
    imageUrl: "/placeholder.svg?height=300&width=500",
  },
]

export default function CO2EmissionsPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <div className="bg-[#002147] text-white py-12 relative">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/placeholder.svg?height=600&width=1200"
            alt="CO2 Emissions in Africa"
            fill
            className="object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">CO2 Emissions in Africa</h1>
          <p className="text-lg max-w-3xl">
            Comprehensive data and research on carbon dioxide emissions across African regions, including historical
            trends, sectoral breakdowns, and mitigation strategies tailored to African contexts.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Main Visualization */}
        <div className="mb-12">
          <DataVisualization data={co2EmissionsData} height={500} showControls={true} />
        </div>

        {/* Key Insights */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-[#002147]">Key Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-xl mb-2">Regional Disparities</h3>
              <p className="text-gray-700">
                Southern Africa, led by South Africa, contributes the largest share of emissions due to its
                coal-dependent energy sector, while Central Africa has the lowest emissions.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-xl mb-2">Growth Trends</h3>
              <p className="text-gray-700">
                North and West Africa have seen the fastest growth in emissions since 2000, driven by industrialization,
                urbanization, and population growth.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-xl mb-2">Global Context</h3>
              <p className="text-gray-700">
                Despite having 17% of the world's population, Africa contributes only about 4% of global CO2 emissions,
                highlighting issues of climate justice and development rights.
              </p>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-[#002147]">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((article) => (
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
      </div>

      <Footer />
    </main>
  )
}
