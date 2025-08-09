"use client"

import Link from "next/link"
import Image from "next/image"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Search, Filter, Download, MapPin } from "lucide-react"
import DashboardChartCard from "@/components/dashboard-chart-card"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"

// Sample data for biodiversity
const biodiversityTrendsData = [
  { year: "1990", mammals: 100, birds: 100, plants: 100, reptiles: 100, amphibians: 100 },
  { year: "1995", mammals: 97, birds: 98, plants: 99, reptiles: 96, amphibians: 94 },
  { year: "2000", mammals: 94, birds: 95, plants: 97, reptiles: 93, amphibians: 88 },
  { year: "2005", mammals: 91, birds: 93, plants: 95, reptiles: 90, amphibians: 82 },
  { year: "2010", mammals: 88, birds: 91, plants: 93, reptiles: 87, amphibians: 76 },
  { year: "2015", mammals: 85, birds: 89, plants: 91, reptiles: 84, amphibians: 70 },
  { year: "2020", mammals: 82, birds: 87, plants: 89, reptiles: 81, amphibians: 65 },
]

// Sample data for forest cover
const forestCoverData = [
  { year: "1990", rainforest: 100, savanna: 100, montane: 100, mangrove: 100 },
  { year: "1995", rainforest: 98, savanna: 97, montane: 99, mangrove: 96 },
  { year: "2000", rainforest: 95, savanna: 94, montane: 97, mangrove: 92 },
  { year: "2005", rainforest: 92, savanna: 91, montane: 96, mangrove: 88 },
  { year: "2010", rainforest: 89, savanna: 88, montane: 94, mangrove: 84 },
  { year: "2015", rainforest: 86, savanna: 85, montane: 93, mangrove: 80 },
  { year: "2020", rainforest: 83, savanna: 82, montane: 91, mangrove: 76 },
]

// Sample data for protected areas
const protectedAreasData = [
  { region: "North Africa", percentage: 12 },
  { region: "West Africa", percentage: 15 },
  { region: "East Africa", percentage: 18 },
  { region: "Central Africa", percentage: 22 },
  { region: "Southern Africa", percentage: 17 },
]

// Sample data for ecosystem services
const ecosystemServicesData = [
  { service: "Carbon Sequestration", value: 35 },
  { service: "Water Regulation", value: 25 },
  { service: "Soil Formation", value: 15 },
  { service: "Pollination", value: 10 },
  { service: "Coastal Protection", value: 15 },
]

const COLORS = ["#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107"]

// Featured ecosystems
const featuredEcosystems = [
  {
    id: "rainforest",
    title: "African Rainforests",
    description: "Tropical rainforests in Central and West Africa, home to incredible biodiversity",
    image: "/placeholder.svg?height=300&width=500",
    stats: {
      area: "2.3 million km²",
      species: "10,000+ plant species",
      carbon: "46 billion tons of carbon",
    },
  },
  {
    id: "savanna",
    title: "Savanna Ecosystems",
    description: "Grasslands with scattered trees covering much of East and Southern Africa",
    image: "/placeholder.svg?height=300&width=500",
    stats: {
      area: "13 million km²",
      species: "1,300+ bird species",
      carbon: "15 billion tons of carbon",
    },
  },
  {
    id: "mangrove",
    title: "Mangrove Forests",
    description: "Coastal ecosystems providing crucial protection and habitat along African coastlines",
    image: "/placeholder.svg?height=300&width=500",
    stats: {
      area: "1.2 million hectares",
      species: "200+ fish species",
      carbon: "5x more carbon than tropical forests",
    },
  },
]

export default function NatureDataPage() {
  return (
    <main className="min-h-screen flex flex-col nature-data-page">
      <Navbar />

      <div className="bg-[#0A5D22] text-white py-12 relative">
        <div className="absolute inset-0 opacity-20">
          <Image src="/placeholder.svg?height=600&width=1200" alt="African Nature" fill className="object-cover" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">African Nature Data</h1>
          <p className="text-lg max-w-3xl">
            Comprehensive data on biodiversity, ecosystems, and natural resources across the African continent.
          </p>
          <div className="mt-6 flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search for ecosystems, species, or regions..."
                className="w-full py-3 px-4 pr-10 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1d3d63]"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            <Button className="bg-africa-green hover:bg-africa-dark-green">
              <Filter className="h-4 w-4 mr-2" />
              Filter Data
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="biodiversity">Biodiversity</TabsTrigger>
            <TabsTrigger value="ecosystems">Ecosystems</TabsTrigger>
            <TabsTrigger value="conservation">Conservation</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <DashboardChartCard
                title="Biodiversity Index Trends"
                description="Species population indices (1990=100)"
                infoText="Shows the relative change in population indices for different taxonomic groups since 1990."
              >
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={biodiversityTrendsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="mammals" name="Mammals" stroke="#8884d8" strokeWidth={2} />
                      <Line type="monotone" dataKey="birds" name="Birds" stroke="#82ca9d" strokeWidth={2} />
                      <Line type="monotone" dataKey="plants" name="Plants" stroke="#ffc658" strokeWidth={2} />
                      <Line type="monotone" dataKey="reptiles" name="Reptiles" stroke="#ff8042" strokeWidth={2} />
                      <Line type="monotone" dataKey="amphibians" name="Amphibians" stroke="#0088fe" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </DashboardChartCard>

              <DashboardChartCard
                title="Forest Cover Change"
                description="Forest type indices (1990=100)"
                infoText="Shows the relative change in forest cover for different forest types since 1990."
              >
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={forestCoverData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="rainforest"
                        name="Rainforest"
                        fill="#4caf50"
                        stroke="#4caf50"
                        fillOpacity={0.6}
                      />
                      <Area
                        type="monotone"
                        dataKey="savanna"
                        name="Savanna Woodland"
                        fill="#8bc34a"
                        stroke="#8bc34a"
                        fillOpacity={0.6}
                      />
                      <Area
                        type="monotone"
                        dataKey="montane"
                        name="Montane Forest"
                        fill="#cddc39"
                        stroke="#cddc39"
                        fillOpacity={0.6}
                      />
                      <Area
                        type="monotone"
                        dataKey="mangrove"
                        name="Mangrove Forest"
                        fill="#ffeb3b"
                        stroke="#ffeb3b"
                        fillOpacity={0.6}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </DashboardChartCard>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <DashboardChartCard
                title="Protected Areas by Region"
                description="Percentage of land area under protection"
                infoText="Shows the percentage of land area designated as protected in each African region."
              >
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={protectedAreasData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0, 25]} />
                      <YAxis dataKey="region" type="category" />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="percentage" name="Protected Area (%)" fill="#4caf50" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </DashboardChartCard>

              <DashboardChartCard
                title="Ecosystem Services Value"
                description="Relative contribution to total ecosystem services value"
                infoText="Shows the relative contribution of different ecosystem services to the total economic value of natural systems."
              >
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={ecosystemServicesData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {ecosystemServicesData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </DashboardChartCard>

              <Card>
                <CardHeader>
                  <CardTitle>Key Nature Statistics</CardTitle>
                  <CardDescription>Critical metrics for African natural systems</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex justify-between">
                      <span className="text-gray-600">Total Forest Area:</span>
                      <span className="font-semibold">624 million hectares</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Endemic Species:</span>
                      <span className="font-semibold">40,000+</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Protected Areas:</span>
                      <span className="font-semibold">17% of land area</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Carbon Storage:</span>
                      <span className="font-semibold">180 billion tons</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Threatened Species:</span>
                      <span className="font-semibold">8,400+</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <h2 className="text-2xl font-bold mb-6 text-[#002147]">Featured Ecosystems</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {featuredEcosystems.map((eco) => (
                <Card key={eco.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <Image src={eco.image || "/placeholder.svg"} alt={eco.title} fill className="object-cover" />
                  </div>
                  <CardHeader>
                    <CardTitle>{eco.title}</CardTitle>
                    <CardDescription>{eco.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {Object.entries(eco.stats).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-gray-600 capitalize">{key}:</span>
                          <span className="font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link href={`/nature-data/ecosystems/${eco.id}`}>
                      <Button variant="outline" className="w-full">
                        Explore Data <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="bg-gray-50 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4 text-[#002147]">Nature Data Applications</h2>
              <p className="text-gray-600 mb-6">
                Our nature data is used by conservation organizations, researchers, policymakers, and businesses to
                inform decision-making and drive sustainable outcomes.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="bg-green-100 rounded-full p-3 inline-flex mb-4">
                    <MapPin className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Conservation Planning</h3>
                  <p className="text-gray-600">
                    Identify priority areas for conservation based on biodiversity value, threat levels, and ecosystem
                    services.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="bg-green-100 rounded-full p-3 inline-flex mb-4">
                    <Download className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Natural Capital Assessment</h3>
                  <p className="text-gray-600">
                    Quantify the economic value of ecosystem services to inform sustainable development planning.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="bg-green-100 rounded-full p-3 inline-flex mb-4">
                    <Filter className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Impact Monitoring</h3>
                  <p className="text-gray-600">
                    Track the effectiveness of conservation interventions and policy implementation over time.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="biodiversity">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-bold mb-4">Biodiversity Data</h2>
              <p className="text-gray-600 mb-6">
                This tab would contain detailed biodiversity data, including species richness, endemism, threatened
                species, and biodiversity hotspots across Africa.
              </p>
              <div className="p-12 border border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Detailed biodiversity data dashboard would appear here</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="ecosystems">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-bold mb-4">Ecosystem Data</h2>
              <p className="text-gray-600 mb-6">
                This tab would contain detailed ecosystem data, including forest cover, grasslands, wetlands, and marine
                ecosystems across Africa.
              </p>
              <div className="p-12 border border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Detailed ecosystem data dashboard would appear here</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="conservation">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-bold mb-4">Conservation Data</h2>
              <p className="text-gray-600 mb-6">
                This tab would contain detailed conservation data, including protected areas, conservation initiatives,
                and restoration projects across Africa.
              </p>
              <div className="p-12 border border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Detailed conservation data dashboard would appear here</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </main>
  )
}
