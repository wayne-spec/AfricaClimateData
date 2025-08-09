import Link from "next/link"
import { ArrowRight, BarChart, Map, LineChart, Table } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

const explorers = [
  {
    id: "climate-trends",
    title: "Climate Trends",
    icon: <LineChart className="h-6 w-6 text-white" />,
    description: "Analyze long-term climate patterns and changes over time",
    color: "bg-blue-600",
  },
  {
    id: "vulnerability-mapping",
    title: "Vulnerability Mapping",
    icon: <Map className="h-6 w-6 text-white" />,
    description: "Explore geographic distribution of climate vulnerability",
    color: "bg-emerald-600",
  },
  {
    id: "energy-transition",
    title: "Energy Transition",
    icon: <BarChart className="h-6 w-6 text-white" />,
    description: "Track progress in renewable energy adoption and carbon reduction",
    color: "bg-amber-600",
  },
  {
    id: "climate-impacts",
    title: "Climate Impacts",
    icon: <Table className="h-6 w-6 text-white" />,
    description: "Examine the effects of climate change on ecosystems and communities",
    color: "bg-purple-600",
  },
]

export default function DataExplorers() {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-green-600">Data explorers</h2>
          <p className="text-gray-600">
            Interactive visualization tools to explore a wide range of related indicators.
          </p>
        </div>
        <Link href="/explorers" className="hover:underline flex items-center text-blue-900">
          See all our Data Explorers
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {explorers.map((explorer) => (
          <Link key={explorer.id} href={`/explorers/${explorer.id}`} className="block h-full">
            <Card className="h-full transition-all hover:shadow-md border border-gray-200">
              <CardContent className="p-6">
                <div className={`rounded-full p-3 inline-flex mb-4 ${explorer.color}`}>{explorer.icon}</div>
                <h3 className="font-bold text-lg mb-2 text-blue-900">{explorer.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{explorer.description}</p>
              </CardContent>
              <CardFooter className="pt-0 pb-4 px-6">
                <span className="text-sm font-medium text-blue-700">Data Explorer</span>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
