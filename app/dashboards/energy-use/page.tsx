"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import DashboardChartCard from "@/components/dashboard-chart-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Download, Share2, Info, Calendar, Filter } from "lucide-react"
import Link from "next/link"

export default function EnergyUseDashboardPage() {
  const [timeRange, setTimeRange] = useState("5y")
  const [region, setRegion] = useState("all")

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
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Energy Use Dashboard</h1>
          <p className="text-lg max-w-3xl">
            Comprehensive data on energy consumption patterns, carbon intensity, and renewable energy transitions.
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            <Button variant="outline" className="text-white border-white hover:bg-green-800">
              <Download className="h-4 w-4 mr-2" /> Export Data
            </Button>
            <Button variant="outline" className="text-white border-white hover:bg-green-800">
              <Share2 className="h-4 w-4 mr-2" /> Share Dashboard
            </Button>
            <Button variant="outline" className="text-white border-white hover:bg-green-800">
              <Info className="h-4 w-4 mr-2" /> About This Data
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Time Range:</span>
            </div>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1y">Last Year</SelectItem>
                <SelectItem value="5y">Last 5 Years</SelectItem>
                <SelectItem value="10y">Last 10 Years</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
            <div className="flex items-center">
              <Filter className="h-4 w-4 mr-2 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Region:</span>
            </div>
            <Select value={region} onValueChange={setRegion}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Africa</SelectItem>
                <SelectItem value="north">North Africa</SelectItem>
                <SelectItem value="west">West Africa</SelectItem>
                <SelectItem value="east">East Africa</SelectItem>
                <SelectItem value="central">Central Africa</SelectItem>
                <SelectItem value="southern">Southern Africa</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Renewable Share</p>
                  <h3 className="text-2xl font-bold text-[#0A5D22]">17.8%</h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-green-50 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M7 17L12 12L17 17"
                      stroke="#10B981"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7 13L12 8L17 13"
                      stroke="#10B981"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-2">Current share of renewables in energy mix</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Carbon Intensity</p>
                  <h3 className="text-2xl font-bold text-[#0A5D22]">-15%</h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-green-50 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M7 17L12 12L17 17"
                      stroke="#10B981"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7 13L12 8L17 13"
                      stroke="#10B981"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-2">Reduction in CO2 per unit of energy since 2015</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Energy Access</p>
                  <h3 className="text-2xl font-bold text-[#0A5D22]">48%</h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-green-50 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M7 17L12 12L17 17"
                      stroke="#10B981"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7 13L12 8L17 13"
                      stroke="#10B981"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-2">Population with access to reliable electricity</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="renewable">Renewable Energy</TabsTrigger>
            <TabsTrigger value="efficiency">Energy Efficiency</TabsTrigger>
            <TabsTrigger value="access">Energy Access</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <DashboardChartCard
                title="Energy Mix Transition"
                description="Changes in energy sources over time"
                className="col-span-1"
              >
                <div className="h-80 flex items-center justify-center bg-gray-100 rounded-md">
                  <div className="text-center">
                    <p className="text-gray-500 mb-2">Interactive Chart</p>
                    <p className="text-sm text-gray-400">Showing evolution of energy mix across African regions</p>
                  </div>
                </div>
              </DashboardChartCard>

              <DashboardChartCard
                title="Carbon Intensity by Region"
                description="CO2 emissions per unit of energy produced"
                className="col-span-1"
              >
                <div className="h-80 flex items-center justify-center bg-gray-100 rounded-md">
                  <div className="text-center">
                    <p className="text-gray-500 mb-2">Interactive Chart</p>
                    <p className="text-sm text-gray-400">Regional comparison of carbon intensity trends</p>
                  </div>
                </div>
              </DashboardChartCard>
            </div>

            <DashboardChartCard
              title="Energy Consumption by Sector"
              description="Breakdown of energy use across economic sectors"
              className="mb-6"
            >
              <div className="h-80 flex items-center justify-center bg-gray-100 rounded-md">
                <div className="text-center">
                  <p className="text-gray-500 mb-2">Interactive Chart</p>
                  <p className="text-sm text-gray-400">Sectoral energy consumption patterns and trends</p>
                </div>
              </div>
            </DashboardChartCard>
          </TabsContent>

          <TabsContent value="renewable" className="mt-0">
            <DashboardChartCard
              title="Renewable Energy Capacity Growth"
              description="Installation of renewable energy technologies over time"
              className="mb-6"
            >
              <div className="h-80 flex items-center justify-center bg-gray-100 rounded-md">
                <div className="text-center">
                  <p className="text-gray-500 mb-2">Interactive Chart</p>
                  <p className="text-sm text-gray-400">Growth trends for solar, wind, hydro, and other renewables</p>
                </div>
              </div>
            </DashboardChartCard>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DashboardChartCard
                title="Solar PV Cost Trends"
                description="Changes in solar installation costs over time"
                className="col-span-1"
              >
                <div className="h-80 flex items-center justify-center bg-gray-100 rounded-md">
                  <div className="text-center">
                    <p className="text-gray-500 mb-2">Interactive Chart</p>
                    <p className="text-sm text-gray-400">Cost reduction trends for solar PV technology</p>
                  </div>
                </div>
              </DashboardChartCard>

              <DashboardChartCard
                title="Renewable Investment"
                description="Financial flows into renewable energy projects"
                className="col-span-1"
              >
                <div className="h-80 flex items-center justify-center bg-gray-100 rounded-md">
                  <div className="text-center">
                    <p className="text-gray-500 mb-2">Interactive Chart</p>
                    <p className="text-sm text-gray-400">Investment trends by technology and region</p>
                  </div>
                </div>
              </DashboardChartCard>
            </div>
          </TabsContent>

          <TabsContent value="efficiency" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <DashboardChartCard
                title="Energy Intensity by Sector"
                description="Energy use per unit of economic output"
                className="col-span-1"
              >
                <div className="h-80 flex items-center justify-center bg-gray-100 rounded-md">
                  <div className="text-center">
                    <p className="text-gray-500 mb-2">Interactive Chart</p>
                    <p className="text-sm text-gray-400">Sectoral energy efficiency improvements over time</p>
                  </div>
                </div>
              </DashboardChartCard>

              <DashboardChartCard
                title="Efficiency Technology Adoption"
                description="Uptake of energy-efficient technologies"
                className="col-span-1"
              >
                <div className="h-80 flex items-center justify-center bg-gray-100 rounded-md">
                  <div className="text-center">
                    <p className="text-gray-500 mb-2">Interactive Chart</p>
                    <p className="text-sm text-gray-400">Adoption rates of key efficiency technologies</p>
                  </div>
                </div>
              </DashboardChartCard>
            </div>

            <DashboardChartCard
              title="Energy Efficiency Potential"
              description="Projected energy savings from efficiency measures"
              className="mb-6"
            >
              <div className="h-80 flex items-center justify-center bg-gray-100 rounded-md">
                <div className="text-center">
                  <p className="text-gray-500 mb-2">Interactive Chart</p>
                  <p className="text-sm text-gray-400">Potential energy savings by sector and technology</p>
                </div>
              </div>
            </DashboardChartCard>
          </TabsContent>

          <TabsContent value="access" className="mt-0">
            <DashboardChartCard
              title="Energy Access Map"
              description="Geographic distribution of energy access across Africa"
              className="mb-6"
            >
              <div className="h-96 flex items-center justify-center bg-gray-100 rounded-md">
                <div className="text-center">
                  <p className="text-gray-500 mb-2">Interactive Map</p>
                  <p className="text-sm text-gray-400">Regional and sub-regional electricity access rates</p>
                </div>
              </div>
            </DashboardChartCard>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DashboardChartCard
                title="Off-Grid Solutions"
                description="Growth of mini-grid and standalone systems"
                className="col-span-1"
              >
                <div className="h-80 flex items-center justify-center bg-gray-100 rounded-md">
                  <div className="text-center">
                    <p className="text-gray-500 mb-2">Interactive Chart</p>
                    <p className="text-sm text-gray-400">Deployment trends for off-grid energy solutions</p>
                  </div>
                </div>
              </DashboardChartCard>

              <DashboardChartCard
                title="Energy Access Investment"
                description="Financial flows into energy access initiatives"
                className="col-span-1"
              >
                <div className="h-80 flex items-center justify-center bg-gray-100 rounded-md">
                  <div className="text-center">
                    <p className="text-gray-500 mb-2">Interactive Chart</p>
                    <p className="text-sm text-gray-400">Investment trends in energy access by region</p>
                  </div>
                </div>
              </DashboardChartCard>
            </div>
          </TabsContent>
        </Tabs>

        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-bold mb-4 text-[#0A5D22]">Key Insights</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Renewable energy capacity in Africa has grown by 150% since 2010, with solar PV leading the expansion
            </li>
            <li>
              Solar PV installation costs have decreased by 82% over the past decade, making it increasingly competitive
            </li>
            <li>Energy efficiency improvements could reduce projected energy demand by 30% by 2040</li>
            <li>
              Mini-grid and off-grid solutions are providing energy access to 45 million previously unserved people
            </li>
            <li>Carbon intensity of electricity generation has decreased by 15% across the continent since 2015</li>
          </ul>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-[#0A5D22]">Recommended Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">For Policymakers</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Strengthen renewable energy targets and supporting policies</li>
                <li>Implement energy efficiency standards for buildings and appliances</li>
                <li>Develop integrated energy access plans combining grid and off-grid solutions</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">For Energy Providers</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Accelerate investment in renewable energy projects</li>
                <li>Develop innovative business models for off-grid energy access</li>
                <li>Implement demand-side management programs to improve efficiency</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
