import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import DashboardChartCard from "@/components/dashboard-chart-card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, Share2 } from "lucide-react"
import Link from "next/link"

export default function WildlifeDashboardPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <div className="bg-[#0A5D22] text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-4">
            <Link href="/dashboards">
              <Button variant="ghost" className="text-white hover:text-white hover:bg-green-800 p-0 mr-2">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Dashboards
              </Button>
            </Link>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Wildlife Conservation Dashboard</h1>
          <p className="text-lg max-w-3xl">
            Tracking climate impacts on biodiversity, species migration patterns, and conservation effectiveness.
          </p>
          <div className="flex mt-4">
            <Button variant="outline" className="text-white border-white hover:bg-green-800 mr-2">
              <Download className="h-4 w-4 mr-2" /> Export Data
            </Button>
            <Button variant="outline" className="text-white border-white hover:bg-green-800">
              <Share2 className="h-4 w-4 mr-2" /> Share Dashboard
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <DashboardChartCard
            title="Species Vulnerability Index"
            description="Climate vulnerability assessment for key species"
            className="col-span-1"
          >
            <div className="h-64 flex items-center justify-center bg-gray-100 rounded-md">
              <p className="text-gray-500">Species vulnerability visualization</p>
            </div>
          </DashboardChartCard>

          <DashboardChartCard
            title="Habitat Loss Trends"
            description="Climate-related habitat degradation and loss"
            className="col-span-1"
          >
            <div className="h-64 flex items-center justify-center bg-gray-100 rounded-md">
              <p className="text-gray-500">Habitat loss visualization</p>
            </div>
          </DashboardChartCard>

          <DashboardChartCard
            title="Migration Pattern Shifts"
            description="Changes in wildlife migration due to climate change"
            className="col-span-1"
          >
            <div className="h-64 flex items-center justify-center bg-gray-100 rounded-md">
              <p className="text-gray-500">Migration patterns visualization</p>
            </div>
          </DashboardChartCard>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <DashboardChartCard
            title="Conservation Effectiveness"
            description="Impact assessment of conservation initiatives"
            className="col-span-1"
          >
            <div className="h-64 flex items-center justify-center bg-gray-100 rounded-md">
              <p className="text-gray-500">Conservation effectiveness visualization</p>
            </div>
          </DashboardChartCard>

          <DashboardChartCard
            title="Human-Wildlife Conflict"
            description="Climate-driven changes in human-wildlife interactions"
            className="col-span-1"
          >
            <div className="h-64 flex items-center justify-center bg-gray-100 rounded-md">
              <p className="text-gray-500">Human-wildlife conflict visualization</p>
            </div>
          </DashboardChartCard>
        </div>

        <DashboardChartCard
          title="Protected Areas Climate Resilience"
          description="Climate resilience assessment of protected areas network"
          className="mb-8"
        >
          <div className="h-96 flex items-center justify-center bg-gray-100 rounded-md">
            <p className="text-gray-500">Protected areas map visualization</p>
          </div>
        </DashboardChartCard>

        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-bold mb-4 text-[#0A5D22]">Key Insights</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Climate change is affecting 83% of mammal species and 89% of bird species across Africa</li>
            <li>Protected area effectiveness is declining in regions with severe climate impacts</li>
            <li>
              Species migration patterns have shifted by an average of 17km per decade due to changing temperatures
            </li>
            <li>Human-wildlife conflict incidents have increased by 35% in drought-affected regions</li>
            <li>Climate-resilient conservation corridors could protect up to 60% of vulnerable species</li>
          </ul>
        </div>
      </div>

      <Footer />
    </main>
  )
}
