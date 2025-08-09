import Link from "next/link"
import Image from "next/image"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import DataVisualization from "@/components/data-visualization"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, User } from "lucide-react"

// Sample data for carbon credits
const carbonCreditsData = {
  id: "carbon-credits-volume",
  title: "Voluntary Carbon Market Volume by Project Type",
  description: "Annual volume of carbon credits traded in voluntary markets by project type (million tonnes CO2e)",
  type: "chart" as const,
  chartType: "bar" as const,
  topicId: "carbon-credits",
  data: [
    { year: 2016, Forestry: 16.1, RenewableEnergy: 8.3, EnergyEfficiency: 4.2, Agriculture: 2.1, Other: 3.5 },
    { year: 2017, Forestry: 18.3, RenewableEnergy: 10.5, EnergyEfficiency: 5.1, Agriculture: 2.8, Other: 4.2 },
    { year: 2018, Forestry: 22.7, RenewableEnergy: 13.8, EnergyEfficiency: 6.3, Agriculture: 3.5, Other: 5.1 },
    { year: 2019, Forestry: 36.7, RenewableEnergy: 19.2, EnergyEfficiency: 7.8, Agriculture: 5.3, Other: 6.4 },
    { year: 2020, Forestry: 48.1, RenewableEnergy: 24.5, EnergyEfficiency: 9.2, Agriculture: 7.6, Other: 8.3 },
    { year: 2021, Forestry: 80.3, RenewableEnergy: 35.7, EnergyEfficiency: 12.4, Agriculture: 15.2, Other: 11.8 },
    { year: 2022, Forestry: 115.6, RenewableEnergy: 42.3, EnergyEfficiency: 15.8, Agriculture: 23.7, Other: 16.5 },
  ],
}

// Sample articles related to carbon credits
const relatedArticles = [
  {
    id: "african-carbon-markets",
    title: "The Rise of African Carbon Markets",
    excerpt:
      "African nations are increasingly participating in global carbon markets. This article examines the growth of carbon credit projects across the continent and their potential for sustainable development.",
    author: "Wangari Maathai",
    date: "2023-05-18",
    readTime: 9,
    imageUrl: "/placeholder.svg?height=300&width=500",
  },
  {
    id: "redd-plus-congo",
    title: "REDD+ Projects in the Congo Basin: Successes and Challenges",
    excerpt:
      "The Congo Basin hosts some of the world's largest REDD+ projects. This article evaluates their effectiveness in reducing deforestation while supporting local communities.",
    author: "Jean-Paul Mabaya",
    date: "2023-04-05",
    readTime: 11,
    imageUrl: "/placeholder.svg?height=300&width=500",
  },
  {
    id: "carbon-credit-quality",
    title: "Ensuring Quality in African Carbon Credits",
    excerpt:
      "As the market for carbon credits grows, ensuring their quality and integrity becomes crucial. This article explores standards and verification processes for African carbon projects.",
    author: "Fatou Ndiaye",
    date: "2023-06-12",
    readTime: 8,
    imageUrl: "/placeholder.svg?height=300&width=500",
  },
]

export default function CarbonCreditsPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <div className="bg-[#002147] text-white py-12 relative">
        <div className="absolute inset-0 opacity-20">
          <Image src="/placeholder.svg?height=600&width=1200" alt="Carbon Credits" fill className="object-cover" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Carbon Credits</h1>
          <p className="text-lg max-w-3xl">
            Explore data and research on carbon credit mechanisms, markets, and projects across Africa, including
            voluntary carbon markets, compliance schemes, and REDD+ initiatives.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Main Visualization */}
        <div className="mb-12">
          <DataVisualization data={carbonCreditsData} height={500} showControls={true} />
        </div>

        {/* Key Insights */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-[#002147]">Key Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-xl mb-2">Market Growth</h3>
              <p className="text-gray-700">
                The voluntary carbon market has grown dramatically since 2019, with total volume increasing by over 300%
                by 2022, driven by corporate net-zero commitments.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-xl mb-2">Forestry Dominance</h3>
              <p className="text-gray-700">
                Forestry and land use projects dominate the market, accounting for over 50% of credits issued, with
                particular growth in REDD+ projects in tropical forest regions.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-xl mb-2">African Opportunity</h3>
              <p className="text-gray-700">
                Africa's share of the global carbon credit market has grown from 11% in 2016 to 29% in 2022, with
                significant potential for further expansion in forestry and renewable energy.
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
