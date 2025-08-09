"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowRight,
  BarChart3,
  PieChart,
  LineChart,
  Building2,
  Building,
  LandPlot,
  Tractor,
  Home,
  Warehouse,
  Zap,
  Car,
  Truck,
  Factory,
  Ship,
  Waves,
  Flame,
  DollarSign,
  Leaf,
  CloudLightning,
  Briefcase,
  Trees,
  Mountain,
  Globe,
  Trash2,
  Search,
} from "lucide-react"

export default function DashboardsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Define dashboard categories
  const dashboardCategories = [
    {
      id: "banks",
      title: "Banking Sector",
      description: "Climate risk assessment and sustainable finance tracking for financial institutions",
      icon: <Building2 className="h-8 w-8 text-green-600" />,
      color: "bg-green-50 border-green-200",
      textColor: "text-green-700",
      image: "/placeholder.svg?height=200&width=400",
      category: "finance",
    },
    {
      id: "insurance",
      title: "Insurance Companies",
      description: "Climate-related risk exposure and claims analysis for insurance providers",
      icon: <Building className="h-8 w-8 text-green-600" />,
      color: "bg-green-50 border-green-200",
      textColor: "text-green-700",
      image: "/placeholder.svg?height=200&width=400",
      category: "finance",
    },
    {
      id: "regulatory",
      title: "Regulatory Bodies",
      description: "Compliance monitoring and policy impact assessment for government agencies",
      icon: <LandPlot className="h-8 w-8 text-green-600" />,
      color: "bg-green-50 border-green-200",
      textColor: "text-green-700",
      image: "/placeholder.svg?height=200&width=400",
      category: "governance",
    },
    {
      id: "agriculture",
      title: "Agriculture",
      description:
        "Climate impacts on crop yields, water usage, and soil health, with sustainable farming adoption metrics",
      icon: <Tractor className="h-8 w-8 text-green-600" />,
      color: "bg-green-50 border-green-200",
      textColor: "text-green-700",
      image: "/placeholder.svg?height=200&width=400",
      category: "land",
    },
    {
      id: "buildings",
      title: "Buildings",
      description: "Energy efficiency metrics, carbon footprint analysis, and impact of green building initiatives",
      icon: <Home className="h-8 w-8 text-green-600" />,
      color: "bg-green-50 border-green-200",
      textColor: "text-green-700",
      image: "/placeholder.svg?height=200&width=400",
      category: "infrastructure",
    },
    {
      id: "real-estate",
      title: "Real Estate",
      description:
        "Climate risk assessments for properties, sustainable materials adoption, and climate impact on property values",
      icon: <Warehouse className="h-8 w-8 text-green-600" />,
      color: "bg-green-50 border-green-200",
      textColor: "text-green-700",
      image: "/placeholder.svg?height=200&width=400",
      category: "infrastructure",
    },
    {
      id: "energy-use",
      title: "Energy Use",
      description: "Energy consumption patterns, renewable energy transition, and impact of energy efficiency measures",
      icon: <Zap className="h-8 w-8 text-green-600" />,
      color: "bg-green-50 border-green-200",
      textColor: "text-green-700",
      image: "/placeholder.svg?height=200&width=400",
      category: "energy",
    },
    {
      id: "transport",
      title: "Transport",
      description:
        "Emissions from different transport modes, electric vehicle adoption, and sustainable transportation infrastructure",
      icon: <Car className="h-8 w-8 text-green-600" />,
      color: "bg-green-50 border-green-200",
      textColor: "text-green-700",
      image: "/placeholder.svg?height=200&width=400",
      category: "infrastructure",
    },
    {
      id: "logistics",
      title: "Logistics",
      description:
        "Carbon footprint of supply chains, sustainable logistics practices, and climate impact on operations",
      icon: <Truck className="h-8 w-8 text-green-600" />,
      color: "bg-green-50 border-green-200",
      textColor: "text-green-700",
      image: "/placeholder.svg?height=200&width=400",
      category: "infrastructure",
    },
    {
      id: "manufacturing",
      title: "Manufacturing",
      description:
        "Industrial energy consumption, emissions tracking, and adoption of sustainable manufacturing processes",
      icon: <Factory className="h-8 w-8 text-green-600" />,
      color: "bg-green-50 border-green-200",
      textColor: "text-green-700",
      image: "/placeholder.svg?height=200&width=400",
      category: "industry",
    },
    {
      id: "blue-economy",
      title: "Blue Economy",
      description:
        "Climate impact on marine ecosystems, sustainable fisheries development, and blue economy growth metrics",
      icon: <Ship className="h-8 w-8 text-green-600" />,
      color: "bg-green-50 border-green-200",
      textColor: "text-green-700",
      image: "/placeholder.svg?height=200&width=400",
      category: "water",
    },
    {
      id: "oceans",
      title: "Oceans",
      description: "Ocean acidification, sea-level rise, and climate impact on marine biodiversity and ecosystems",
      icon: <Waves className="h-8 w-8 text-green-600" />,
      color: "bg-green-50 border-green-200",
      textColor: "text-green-700",
      image: "/placeholder.svg?height=200&width=400",
      category: "water",
    },
    {
      id: "clean-cooking",
      title: "Clean Cooking",
      description:
        "Clean cooking technology adoption, emissions reduction from traditional methods, and health impacts",
      icon: <Flame className="h-8 w-8 text-green-600" />,
      color: "bg-green-50 border-green-200",
      textColor: "text-green-700",
      image: "/placeholder.svg?height=200&width=400",
      category: "energy",
    },
    {
      id: "climate-finance",
      title: "Climate Finance Flows",
      description: "Investment tracking in climate projects, finance sources, and impact assessment of climate funding",
      icon: <DollarSign className="h-8 w-8 text-green-600" />,
      color: "bg-green-50 border-green-200",
      textColor: "text-green-700",
      image: "/placeholder.svg?height=200&width=400",
      category: "finance",
    },
    {
      id: "wildlife",
      title: "Wildlife Conservation",
      description:
        "Climate impact on wildlife populations, conservation effectiveness, and critical habitat protection",
      icon: <Leaf className="h-8 w-8 text-green-600" />,
      color: "bg-green-50 border-green-200",
      textColor: "text-green-700",
      image: "/placeholder.svg?height=200&width=400",
      category: "biodiversity",
    },
    {
      id: "weather-events",
      title: "Weather Events & Disasters",
      description:
        "Frequency and impact of extreme weather, climate disaster costs, and effectiveness of preparedness measures",
      icon: <CloudLightning className="h-8 w-8 text-green-600" />,
      color: "bg-green-50 border-green-200",
      textColor: "text-green-700",
      image: "/placeholder.svg?height=200&width=400",
      category: "climate",
    },
    {
      id: "green-jobs",
      title: "Green Jobs",
      description: "Growth of green employment across sectors, skills development needs, and economic impact analysis",
      icon: <Briefcase className="h-8 w-8 text-green-600" />,
      color: "bg-green-50 border-green-200",
      textColor: "text-green-700",
      image: "/placeholder.svg?height=200&width=400",
      category: "economy",
    },
    {
      id: "land-use",
      title: "Land Use & Change",
      description:
        "Deforestation and afforestation tracking, land use change impacts on carbon emissions and biodiversity",
      icon: <Trees className="h-8 w-8 text-green-600" />,
      color: "bg-green-50 border-green-200",
      textColor: "text-green-700",
      image: "/placeholder.svg?height=200&width=400",
      category: "land",
    },
    {
      id: "natural-capital",
      title: "Nature & Natural Capital",
      description: "Natural capital valuation, climate impact on ecosystems, and importance of ecosystem restoration",
      icon: <Mountain className="h-8 w-8 text-green-600" />,
      color: "bg-green-50 border-green-200",
      textColor: "text-green-700",
      image: "/placeholder.svg?height=200&width=400",
      category: "biodiversity",
    },
    {
      id: "climate-trade",
      title: "Climate & Trade Nexus",
      description:
        "Climate impact on international trade, trade's role in climate action, and sustainable trade practices",
      icon: <Globe className="h-8 w-8 text-green-600" />,
      color: "bg-green-50 border-green-200",
      textColor: "text-green-700",
      image: "/placeholder.svg?height=200&width=400",
      category: "economy",
    },
    {
      id: "waste-management",
      title: "Waste Management",
      description: "Waste generation tracking, emissions impact analysis, and sustainable waste management adoption",
      icon: <Trash2 className="h-8 w-8 text-green-600" />,
      color: "bg-green-50 border-green-200",
      textColor: "text-green-700",
      image: "/placeholder.svg?height=200&width=400",
      category: "industry",
    },
  ]

  // Filter dashboards based on search query
  const filteredDashboards = dashboardCategories.filter(
    (dashboard) =>
      dashboard.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dashboard.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Get unique categories for tabs
  const categories = [...new Set(dashboardCategories.map((dashboard) => dashboard.category))]

  return (
    <main className="min-h-screen flex flex-col dashboard-page">
      <Navbar />

      <div className="bg-[#0A5D22] text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Specialized Climate Dashboards</h1>
          <p className="text-lg max-w-3xl mb-6">
            Tailored climate data visualizations and key performance indicators for different sectors and stakeholders.
          </p>
          <div className="relative max-w-md">
            <Input
              type="text"
              placeholder="Search dashboards..."
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Dashboards</TabsTrigger>
            {categories.map((category) => (
              <TabsTrigger key={category} value={category} className="capitalize">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDashboards.map((category) => (
                <DashboardCard key={category.id} category={category} />
              ))}
            </div>
          </TabsContent>

          {categories.map((category) => (
            <TabsContent key={category} value={category} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDashboards
                  .filter((dashboard) => dashboard.category === category)
                  .map((category) => (
                    <DashboardCard key={category.id} category={category} />
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="bg-gray-50 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-4 text-[#0A5D22]">Why Use Our Specialized Dashboards?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
            <div className="flex flex-col items-center text-center">
              <div className="bg-green-100 rounded-full p-4 mb-4">
                <BarChart3 className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Sector-Specific Insights</h3>
              <p className="text-gray-600">
                Data visualizations and metrics tailored to your industry's specific climate-related challenges and
                opportunities.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-green-100 rounded-full p-4 mb-4">
                <PieChart className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Decision Support</h3>
              <p className="text-gray-600">
                Actionable insights to inform strategic planning, risk management, and sustainability initiatives.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-green-100 rounded-full p-4 mb-4">
                <LineChart className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Interactive Exploration</h3>
              <p className="text-gray-600">
                Dynamic visualizations that allow you to explore data, test scenarios, and customize views to your
                needs.
              </p>
            </div>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4 text-[#0A5D22]">Request a Custom Dashboard</h2>
          <p className="text-gray-600 mb-6">
            Don't see a dashboard that fits your specific needs? Our team can create custom climate data visualizations
            tailored to your organization's unique requirements.
          </p>
          <Button className="bg-[#0A5D22] hover:bg-[#084d1c]">Contact Our Team</Button>
        </div>
      </div>

      <Footer />
    </main>
  )
}

function DashboardCard({ category }: { category: any }) {
  return (
    <Card
      className={`overflow-hidden hover:shadow-lg transition-all duration-300 border ${category.color} h-full flex flex-col`}
    >
      <div className="relative h-48 overflow-hidden group">
        <Image
          src={category.image || "/placeholder.svg?height=200&width=400"}
          alt={category.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity duration-300 group-hover:bg-opacity-30">
          <div className="bg-white rounded-full p-4 shadow-lg transform transition-transform duration-300 group-hover:scale-110">
            {category.icon}
          </div>
        </div>
      </div>
      <CardHeader className="flex-grow">
        <CardTitle className={`${category.textColor} text-xl`}>{category.title}</CardTitle>
        <CardDescription className="text-sm mt-2">{category.description}</CardDescription>
      </CardHeader>
      <CardFooter className="pt-0">
        <Link href={`/dashboards/${category.id}`} className="w-full">
          <Button className="w-full bg-[#0A5D22] hover:bg-[#084d1c] transition-all duration-300">
            View Dashboard <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
