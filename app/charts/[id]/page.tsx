import { notFound } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import DataChart from "@/components/data-chart"
import { getChartById, getTopicById } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface ChartPageProps {
  params: {
    id: string
  }
}

export default async function ChartPage({ params }: ChartPageProps) {
  const chart = await getChartById(params.id)

  if (!chart) {
    notFound()
  }

  const topic = await getTopicById(chart.topicId)

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <div className="bg-[#f5f7ff] py-12">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Link href="/data" className="inline-flex items-center text-africa-green hover:underline">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Data Catalog
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="mb-6">
              <div className="flex flex-wrap gap-2 mb-2">
                <Link
                  href={`/topics/${topic?.id}`}
                  className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded hover:bg-gray-200"
                >
                  {topic?.title}
                </Link>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#002147]">{chart.title}</h1>
              <p className="text-gray-600 mt-2">{chart.description}</p>
            </div>

            <DataChart chartData={chart} height={500} showControls={true} />

            <div className="mt-8 border-t border-gray-200 pt-6">
              <h2 className="text-xl font-bold mb-4">About this data</h2>
              <p className="text-gray-600 mb-4">
                This chart shows data from the Africa Climate Data Platform. The data is collected from various sources
                and processed to ensure accuracy and consistency.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="outline" className="text-africa-green border-africa-green">
                  Download data
                </Button>
                <Button variant="outline" className="text-africa-green border-africa-green">
                  Explore in Data Explorer
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">Sources and methodology</h2>
            <p className="text-gray-600 mb-4">
              The data for this chart comes from multiple sources, including satellite observations, ground
              measurements, and climate models. The methodology involves data cleaning, validation, and standardization
              to ensure comparability across regions and time periods.
            </p>
            <p className="text-gray-600">
              For more information about the data sources and methodology, please visit our{" "}
              <Link href="/methodology" className="text-africa-green hover:underline">
                methodology page
              </Link>
              .
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
