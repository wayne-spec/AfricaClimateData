"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import DashboardChartCard from "@/components/dashboard-chart-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Download, Share2, Info, Calendar, Filter, Home } from "lucide-react"
import Link from "next/link"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

// Sample data for charts
const energyEfficiencyData = [
  { year: 2010, residential: 65, commercial: 60, public: 55 },
  { year: 2012, residential: 68, commercial: 63, public: 58 },
  { year: 2014, residential: 72, commercial: 67, public: 62 },
  { year: 2016, residential: 75, commercial: 71, public: 66 },
  { year: 2018, residential: 79, commercial: 75, public: 70 },
  { year: 2020, residential: 82, commercial: 79, public: 74 },
  { year: 2022, residential: 85, commercial: 82, public: 78 },
]

const buildingEmissionsData = [
  { name: "Heating", value: 38 },
  { name: "Cooling", value: 22 },
  { name: "Lighting", value: 15 },
  { name: "Appliances", value: 12 },
  { name: "Water Heating", value: 8 },
  { name: "Other", value: 5 },
]

const greenBuildingAdoptionData = [
  { year: 2010, certified: 5, energyStar: 8, netzero: 0.5 },
  { year: 2012, certified: 8, energyStar: 12, netzero: 1 },
  { year: 2014, certified: 12, energyStar: 18, netzero: 2 },
  { year: 2016, certified: 18, energyStar: 25, netzero: 3 },
  { year: 2018, certified: 25, energyStar: 32, netzero: 5 },
  { year: 2020, certified: 32, energyStar: 38, netzero: 8 },
  { year: 2022, certified: 38, energyStar: 45, netzero: 12 },
]

const COLORS = ["#0A5D22", "#8FD14F", "#D4E157", "#CDDC39", "#AFB42B", "#827717"]

export default function BuildingsDashboardPage() {
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
          <div className="flex items-center gap-4 mb-2">
            <div className="bg-white p-2 rounded-full">
              <Home className="h-8 w-8 text-[#0A5D22]" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">Buildings Climate Dashboard</h1>
          </div>
          <p className="text-lg max-w-3xl">
            Comprehensive data on energy efficiency, carbon footprint, and green building initiatives across Africa.
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
                  <p className="text-sm font-medium text-gray-500">Energy Efficiency</p>
                  <h3 className="text-2xl font-bold text-[#0A5D22]">+28%</h3>
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
              <p className="text-sm text-gray-500 mt-2">Improvement in building energy efficiency since 2010</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Green Building Adoption</p>
                  <h3 className="text-2xl font-bold text-[#0A5D22]">38%</h3>
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
              <p className="text-sm text-gray-500 mt-2">
                Percentage of new commercial buildings with green certification
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Carbon Reduction</p>
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
              <p className="text-sm text-gray-500 mt-2">Reduction in building sector carbon emissions since 2010</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="efficiency">Energy Efficiency</TabsTrigger>
            <TabsTrigger value="emissions">Carbon Footprint</TabsTrigger>
            <TabsTrigger value="green">Green Buildings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <DashboardChartCard
                title="Building Energy Efficiency Trends"
                description="Energy efficiency improvements by building type"
                className="col-span-1"
              >
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={energyEfficiencyData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis label={{ value: "Efficiency Index (0-100)", angle: -90, position: "insideLeft" }} />
                      <Tooltip formatter={(value) => [`${value}`, "Efficiency Index"]} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="residential"
                        stroke="#0A5D22"
                        activeDot={{ r: 8 }}
                        name="Residential Buildings"
                      />
                      <Line type="monotone" dataKey="commercial" stroke="#8FD14F" name="Commercial Buildings" />
                      <Line type="monotone" dataKey="public" stroke="#D4E157" name="Public Buildings" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </DashboardChartCard>

              <DashboardChartCard
                title="Building Emissions by Source"
                description="Carbon emissions by building energy use"
                className="col-span-1"
              >
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={buildingEmissionsData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {buildingEmissionsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, "of Emissions"]} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </DashboardChartCard>
            </div>

            <DashboardChartCard
              title="Green Building Certification Trends"
              description="Adoption of green building certifications over time"
              className="mb-6"
            >
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={greenBuildingAdoptionData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis label={{ value: "Adoption Rate (%)", angle: -90, position: "insideLeft" }} />
                    <Tooltip formatter={(value) => [`${value}%`, "Adoption Rate"]} />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="certified"
                      stroke="#0A5D22"
                      fill="#0A5D22"
                      name="Green Certified Buildings"
                    />
                    <Area
                      type="monotone"
                      dataKey="energyStar"
                      stroke="#8FD14F"
                      fill="#8FD14F"
                      name="Energy Star Rated"
                    />
                    <Area type="monotone" dataKey="netzero" stroke="#D4E157" fill="#D4E157" name="Net Zero Buildings" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </DashboardChartCard>
          </TabsContent>

          <TabsContent value="efficiency" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DashboardChartCard
                title="Energy Consumption by Building Type"
                description="Energy use intensity across different building categories"
                className="col-span-1"
              >
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { type: "Office", traditional: 250, efficient: 150, highlyEfficient: 100 },
                        { type: "Retail", traditional: 220, efficient: 140, highlyEfficient: 90 },
                        { type: "Hospital", traditional: 400, efficient: 280, highlyEfficient: 200 },
                        { type: "School", traditional: 180, efficient: 120, highlyEfficient: 80 },
                        { type: "Residential", traditional: 160, efficient: 110, highlyEfficient: 70 },
                        { type: "Hotel", traditional: 300, efficient: 200, highlyEfficient: 140 },
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="type" />
                      <YAxis label={{ value: "Energy Use (kWh/m²/year)", angle: -90, position: "insideLeft" }} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="traditional" name="Traditional Buildings" fill="#AFB42B" />
                      <Bar dataKey="efficient" name="Energy Efficient" fill="#8FD14F" />
                      <Bar dataKey="highlyEfficient" name="Highly Efficient" fill="#0A5D22" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </DashboardChartCard>

              <DashboardChartCard
                title="Energy Efficiency Measures"
                description="Impact of different efficiency interventions"
                className="col-span-1"
              >
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      layout="vertical"
                      data={[
                        { measure: "LED Lighting", savings: 15, cost: 2, roi: 7.5 },
                        { measure: "Improved Insulation", savings: 25, cost: 5, roi: 5 },
                        { measure: "Smart HVAC", savings: 30, cost: 8, roi: 3.75 },
                        { measure: "Energy Management", savings: 20, cost: 3, roi: 6.67 },
                        { measure: "Solar PV", savings: 40, cost: 12, roi: 3.33 },
                        { measure: "Window Upgrades", savings: 18, cost: 6, roi: 3 },
                      ]}
                      margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="measure" type="category" />
                      <Tooltip
                        formatter={(value, name) => {
                          if (name === "savings") return [`${value}%`, "Energy Savings"]
                          if (name === "cost") return [`$${value}k/100m²`, "Implementation Cost"]
                          if (name === "roi") return [`${value}`, "ROI (years)"]
                          return [value, name]
                        }}
                      />
                      <Legend />
                      <Bar dataKey="savings" name="Energy Savings (%)" fill="#0A5D22" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </DashboardChartCard>
            </div>

            <DashboardChartCard
              title="Building Efficiency Standards Adoption"
              description="Implementation of energy efficiency building codes by country"
              className="mt-6"
            >
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { country: "South Africa", mandatory: 75, voluntary: 15, none: 10 },
                      { country: "Egypt", mandatory: 60, voluntary: 25, none: 15 },
                      { country: "Morocco", mandatory: 70, voluntary: 20, none: 10 },
                      { country: "Kenya", mandatory: 45, voluntary: 30, none: 25 },
                      { country: "Nigeria", mandatory: 30, voluntary: 35, none: 35 },
                      { country: "Ghana", mandatory: 40, voluntary: 30, none: 30 },
                      { country: "Ethiopia", mandatory: 25, voluntary: 25, none: 50 },
                      { country: "Tanzania", mandatory: 20, voluntary: 30, none: 50 },
                    ]}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="country" />
                    <YAxis label={{ value: "Percentage of Buildings (%)", angle: -90, position: "insideLeft" }} />
                    <Tooltip formatter={(value) => [`${value}%`, "of Buildings"]} />
                    <Legend />
                    <Bar dataKey="mandatory" name="Mandatory Standards" stackId="a" fill="#0A5D22" />
                    <Bar dataKey="voluntary" name="Voluntary Standards" stackId="a" fill="#8FD14F" />
                    <Bar dataKey="none" name="No Standards" stackId="a" fill="#E57373" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </DashboardChartCard>
          </TabsContent>

          <TabsContent value="emissions" className="mt-0">
            <DashboardChartCard
              title="Building Carbon Footprint by Region"
              description="Carbon emissions from buildings across different regions"
              className="mb-6"
            >
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { region: "North Africa", residential: 45, commercial: 65, public: 35 },
                      { region: "West Africa", residential: 38, commercial: 52, public: 28 },
                      { region: "East Africa", residential: 32, commercial: 48, public: 25 },
                      { region: "Central Africa", residential: 28, commercial: 42, public: 22 },
                      { region: "Southern Africa", residential: 52, commercial: 78, public: 42 },
                    ]}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="region" />
                    <YAxis label={{ value: "CO₂ Emissions (kg/m²/year)", angle: -90, position: "insideLeft" }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="residential" name="Residential Buildings" fill="#0A5D22" />
                    <Bar dataKey="commercial" name="Commercial Buildings" fill="#8FD14F" />
                    <Bar dataKey="public" name="Public Buildings" fill="#D4E157" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </DashboardChartCard>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DashboardChartCard
                title="Emissions Reduction Potential"
                description="Potential carbon savings from building interventions"
                className="col-span-1"
              >
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      layout="vertical"
                      data={[
                        { intervention: "Efficient HVAC", potential: 25 },
                        { intervention: "Building Envelope", potential: 20 },
                        { intervention: "Lighting Upgrades", potential: 15 },
                        { intervention: "Smart Controls", potential: 18 },
                        { intervention: "Renewable Energy", potential: 35 },
                        { intervention: "Behavior Change", potential: 12 },
                      ]}
                      margin={{ top: 20, right: 30, left: 120, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="intervention" type="category" />
                      <Tooltip formatter={(value) => [`${value}%`, "Reduction Potential"]} />
                      <Legend />
                      <Bar dataKey="potential" name="Emissions Reduction Potential (%)" fill="#0A5D22" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </DashboardChartCard>

              <DashboardChartCard
                title="Embodied Carbon in Building Materials"
                description="Carbon footprint of common building materials"
                className="col-span-1"
              >
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      layout="vertical"
                      data={[
                        { material: "Concrete", carbon: 410 },
                        { material: "Steel", carbon: 2750 },
                        { material: "Aluminum", carbon: 8500 },
                        { material: "Brick", carbon: 240 },
                        { material: "Timber", carbon: 110 },
                        { material: "Glass", carbon: 1400 },
                      ]}
                      margin={{ top: 20, right: 30, left: 80, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="material" type="category" />
                      <Tooltip formatter={(value) => [`${value} kg CO₂e/ton`, "Embodied Carbon"]} />
                      <Legend />
                      <Bar dataKey="carbon" name="Embodied Carbon (kg CO₂e/ton)" fill="#0A5D22" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </DashboardChartCard>
            </div>
          </TabsContent>

          <TabsContent value="green" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <DashboardChartCard
                title="Green Building Certification by Type"
                description="Distribution of different green building certifications"
                className="col-span-1"
              >
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: "LEED", value: 42 },
                          { name: "EDGE", value: 28 },
                          { name: "Green Star", value: 15 },
                          { name: "BREEAM", value: 10 },
                          { name: "National Systems", value: 5 },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {buildingEmissionsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, "of Certifications"]} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </DashboardChartCard>

              <DashboardChartCard
                title="Green Building Benefits"
                description="Performance improvements in green certified buildings"
                className="col-span-1"
              >
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { metric: "Energy Use", improvement: 30 },
                        { metric: "Water Use", improvement: 35 },
                        { metric: "CO₂ Emissions", improvement: 33 },
                        { metric: "Waste Reduction", improvement: 40 },
                        { metric: "Occupant Satisfaction", improvement: 27 },
                        { metric: "Operating Costs", improvement: 25 },
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="metric" />
                      <YAxis label={{ value: "Improvement (%)", angle: -90, position: "insideLeft" }} />
                      <Tooltip formatter={(value) => [`${value}%`, "Improvement"]} />
                      <Legend />
                      <Bar dataKey="improvement" name="Performance Improvement" fill="#0A5D22" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </DashboardChartCard>
            </div>

            <DashboardChartCard
              title="Green Building Market Growth"
              description="Growth of green building market value by region"
              className="mb-6"
            >
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={[
                      {
                        year: 2010,
                        northAfrica: 0.2,
                        westAfrica: 0.1,
                        eastAfrica: 0.15,
                        centralAfrica: 0.05,
                        southernAfrica: 0.3,
                      },
                      {
                        year: 2012,
                        northAfrica: 0.3,
                        westAfrica: 0.15,
                        eastAfrica: 0.25,
                        centralAfrica: 0.08,
                        southernAfrica: 0.5,
                      },
                      {
                        year: 2014,
                        northAfrica: 0.5,
                        westAfrica: 0.25,
                        eastAfrica: 0.4,
                        centralAfrica: 0.12,
                        southernAfrica: 0.8,
                      },
                      {
                        year: 2016,
                        northAfrica: 0.8,
                        westAfrica: 0.4,
                        eastAfrica: 0.6,
                        centralAfrica: 0.2,
                        southernAfrica: 1.2,
                      },
                      {
                        year: 2018,
                        northAfrica: 1.2,
                        westAfrica: 0.6,
                        eastAfrica: 0.9,
                        centralAfrica: 0.3,
                        southernAfrica: 1.8,
                      },
                      {
                        year: 2020,
                        northAfrica: 1.8,
                        westAfrica: 0.9,
                        eastAfrica: 1.4,
                        centralAfrica: 0.5,
                        southernAfrica: 2.5,
                      },
                      {
                        year: 2022,
                        northAfrica: 2.5,
                        westAfrica: 1.3,
                        eastAfrica: 2.0,
                        centralAfrica: 0.8,
                        southernAfrica: 3.5,
                      },
                    ]}
                    margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis label={{ value: "Market Value ($ billions)", angle: -90, position: "insideLeft" }} />
                    <Tooltip formatter={(value) => [`$${value}B`, "Market Value"]} />
                    <Legend />
                    <Line type="monotone" dataKey="northAfrica" stroke="#0A5D22" name="North Africa" />
                    <Line type="monotone" dataKey="westAfrica" stroke="#8FD14F" name="West Africa" />
                    <Line type="monotone" dataKey="eastAfrica" stroke="#D4E157" name="East Africa" />
                    <Line type="monotone" dataKey="centralAfrica" stroke="#AFB42B" name="Central Africa" />
                    <Line type="monotone" dataKey="southernAfrica" stroke="#827717" name="Southern Africa" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </DashboardChartCard>
          </TabsContent>
        </Tabs>

        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-bold mb-4 text-[#0A5D22]">Key Insights</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Building energy efficiency has improved by 28% since 2010, with commercial buildings showing the fastest
              rate of improvement
            </li>
            <li>
              Green building certifications have grown significantly, with 38% of new commercial buildings now receiving
              some form of certification
            </li>
            <li>Heating and cooling account for 60% of building-related carbon emissions across Africa</li>
            <li>Embodied carbon in building materials represents an increasing share of the sector's climate impact</li>
            <li>
              Energy-efficient building codes are being adopted at varying rates across the continent, with North and
              Southern Africa leading implementation
            </li>
          </ul>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-[#0A5D22]">Recommended Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">For Policymakers</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Strengthen and enforce building energy codes for new construction</li>
                <li>Develop incentive programs for energy-efficient retrofits of existing buildings</li>
                <li>Implement carbon reporting requirements for large commercial buildings</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">For Building Owners & Developers</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Prioritize energy efficiency measures with rapid payback periods</li>
                <li>Consider lifecycle carbon emissions when selecting building materials</li>
                <li>Implement building energy management systems to optimize performance</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
