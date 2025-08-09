import { notFound } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import MultiVisualization from "@/components/multi-visualization"
import { getVisualizationById, getTopicById, getVisualizationsByTopic } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface VisualizationPageProps {
  params: {
    id: string
  }
}

export default async function VisualizationPage({ params }: VisualizationPageProps) {
  const visualization = await getVisualizationById(params.id)

  if (!visualization) {
    notFound()
  }

  const topic = await getTopicById(visualization.topicId)

  // Get related visualizations
  const relatedVisualizations = await getVisualizationsByTopic(visualization.topicId)
  const filteredRelatedVisualizations = relatedVisualizations.filter((viz) => viz.id !== visualization.id).slice(0, 3)

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
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                  {visualization.type.charAt(0).toUpperCase() + visualization.type.slice(1)}
                </span>
              </div>
            </div>

            <MultiVisualization data={visualization} height={500} />

            <div className="mt-8 border-t border-gray-200 pt-6">
              <h2 className="text-xl font-bold mb-4">About this data</h2>
              <p className="text-gray-600 mb-4">
                This dataset from the Africa Climate Data Platform shows {visualization.description.toLowerCase()}. The
                data is collected from various sources and processed to ensure accuracy and consistency.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="outline" className="text-africa-green border-africa-green">
                  Explore in Data Explorer
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Sources and methodology</h2>
            <p className="text-gray-600 mb-4">
              The data for this visualization comes from multiple sources, including satellite observations, ground
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

          {filteredRelatedVisualizations.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Related visualizations</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {filteredRelatedVisualizations.map((viz) => (
                  <Link
                    key={viz.id}
                    href={`/visualizations/${viz.id}`}
                    className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="font-medium text-gray-800 mb-2">{viz.title}</h3>
                    <p className="text-sm text-gray-600">{viz.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}
