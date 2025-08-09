"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import DashboardChartCard from "@/components/dashboard-chart-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Download, Share2, Info, Calendar, Filter, Tractor } from "lucide-react"
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
const cropYieldData = [
  { year: 2020, maize: -5, rice: -3, wheat: -8, cassava: -2, millet: -6 },
  { year: 2025, maize: -8, rice: -5, wheat: -12, cassava: -4, millet: -9 },
  { year: 2030, maize: -12, rice: -8, wheat: -15, cassava: -6, millet: -11 },
  { year: 2035, maize: -15, rice: -10, wheat: -18, cassava: -8, millet: -14 },
  { year: 2040, maize: -18, rice: -13, wheat: -22, cassava: -10, millet: -16 },
  { year: 2045, maize: -20, rice: -15, wheat: -25, cassava: -12, millet: -19 },
  { year: 2050, maize: -23, rice: -18, wheat: -28, cassava: -15, millet: -21 },
]

const emissionsData = [
  { name: "Livestock", value: 42 },
  { name: "Rice Cultivation", value: 15 },
  { name: "Crop Residues", value: 8 },
  { name: "Fertilizers", value: 20 },
  { name: "Energy Use", value: 10 },
  { name: "Other", value: 5 },
]

const adaptationData = [
  { year: 2015, droughtResistant: 10, conservation: 5, agroforestry: 8, precision: 3 },
  { year: 2016, droughtResistant: 12, conservation: 7, agroforestry: 9, precision: 4 },
  { year: 2017, droughtResistant: 15, conservation: 10, agroforestry: 11, precision: 6 },
  { year: 2018, droughtResistant: 18, conservation: 13, agroforestry: 14, precision: 9 },
  { year: 2019, droughtResistant: 22, conservation: 17, agroforestry: 16, precision: 12 },
  { year: 2020, droughtResistant: 25, conservation: 20, agroforestry: 19, precision: 15 },
  { year: 2021, droughtResistant: 29, conservation: 24, agroforestry: 22, precision: 18 },
  { year: 2022, droughtResistant: 35, conservation: 28, agroforestry: 26, precision: 22 },
]

const waterStressData = [
  { year: 2020, northAfrica: 75, westAfrica: 45, eastAfrica: 55, centralAfrica: 30, southernAfrica: 60 },
  { year: 2025, northAfrica: 78, westAfrica: 48, eastAfrica: 58, centralAfrica: 32, southernAfrica: 63 },
  { year: 2030, northAfrica: 82, westAfrica: 52, eastAfrica: 62, centralAfrica: 35, southernAfrica: 67 },
  { year: 2035, northAfrica: 85, westAfrica: 56, eastAfrica: 65, centralAfrica: 38, southernAfrica: 70 },
  { year: 2040, northAfrica: 88, westAfrica: 60, eastAfrica: 68, centralAfrica: 42, southernAfrica: 74 },
  { year: 2045, northAfrica: 92, westAfrica: 65, eastAfrica: 72, centralAfrica: 45, southernAfrica: 78 },
  { year: 2050, northAfrica: 95, westAfrica: 70, eastAfrica: 75, centralAfrica: 50, southernAfrica: 82 },
]

const COLORS = ["#0A5D22", "#8FD14F", "#D4E157", "#CDDC39", "#AFB42B", "#827717"]

export default function AgricultureDashboardPage() {
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
              <Tractor className="h-8 w-8 text-[#0A5D22]" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">Agriculture Climate Dashboard</h1>
          </div>
          <p className="text-lg max-w-3xl">
            Comprehensive data on climate impacts, adaptation strategies, and emissions in the agricultural sector.
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
                  <p className="text-sm font-medium text-gray-500">Crop Yield Impact</p>
                  <h3 className="text-2xl font-bold text-[#0A5D22]">-15.3%</h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-red-50 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M7 13L12 8L17 13"
                      stroke="#EF4444"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7 17L12 12L17 17"
                      stroke="#EF4444"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-2">Projected change in major crop yields by 2050</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Water Stress</p>
                  <h3 className="text-2xl font-bold text-[#0A5D22]">+28%</h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-red-50 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M7 13L12 8L17 13"
                      stroke="#EF4444"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7 17L12 12L17 17"
                      stroke="#EF4444"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-2">Increase in agricultural water stress index</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Sustainable Practices</p>
                  <h3 className="text-2xl font-bold text-[#0A5D22]">+35%</h3>
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
              <p className="text-sm text-gray-500 mt-2">Growth in climate-smart agriculture adoption</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="crops">Crop Impacts</TabsTrigger>
            <TabsTrigger value="water">Water Resources</TabsTrigger>
            <TabsTrigger value="adaptation">Adaptation</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <DashboardChartCard
                title="Crop Yield Projections by Region"
                description="Projected changes in major crop yields due to climate change"
                className="col-span-1"
              >
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={cropYieldData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis label={{ value: "Yield Change (%)", angle: -90, position: "insideLeft" }} />
                      <Tooltip formatter={(value) => [`${value}%`, "Yield Change"]} />
                      <Legend />
                      <Line type="monotone" dataKey="maize" stroke="#0A5D22" activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="rice" stroke="#8FD14F" />
                      <Line type="monotone" dataKey="wheat" stroke="#D4E157" />
                      <Line type="monotone" dataKey="cassava" stroke="#AFB42B" />
                      <Line type="monotone" dataKey="millet" stroke="#827717" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </DashboardChartCard>

              <DashboardChartCard
                title="Agricultural Emissions by Source"
                description="Greenhouse gas emissions by agricultural activity"
                className="col-span-1"
              >
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={emissionsData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {emissionsData.map((entry, index) => (
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
              title="Climate-Smart Agriculture Adoption"
              description="Adoption rates of climate-smart agricultural practices across regions"
              className="mb-6"
            >
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={adaptationData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis label={{ value: "Adoption Rate (%)", angle: -90, position: "insideLeft" }} />
                    <Tooltip formatter={(value) => [`${value}%`, "Adoption Rate"]} />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="droughtResistant"
                      stackId="1"
                      stroke="#0A5D22"
                      fill="#0A5D22"
                      name="Drought-Resistant Crops"
                    />
                    <Area
                      type="monotone"
                      dataKey="conservation"
                      stackId="1"
                      stroke="#8FD14F"
                      fill="#8FD14F"
                      name="Conservation Agriculture"
                    />
                    <Area
                      type="monotone"
                      dataKey="agroforestry"
                      stackId="1"
                      stroke="#D4E157"
                      fill="#D4E157"
                      name="Agroforestry"
                    />
                    <Area
                      type="monotone"
                      dataKey="precision"
                      stackId="1"
                      stroke="#AFB42B"
                      fill="#AFB42B"
                      name="Precision Farming"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </DashboardChartCard>
          </TabsContent>

          <TabsContent value="crops" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DashboardChartCard
                title="Maize Yield Projections"
                description="Climate impact on maize production across regions"
                className="col-span-1"
              >
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { region: "North Africa", current: 3.2, projected2030: 2.8, projected2050: 2.4 },
                        { region: "West Africa", current: 2.1, projected2030: 1.8, projected2050: 1.5 },
                        { region: "East Africa", current: 2.5, projected2030: 2.2, projected2050: 1.9 },
                        { region: "Central Africa", current: 1.8, projected2030: 1.6, projected2050: 1.4 },
                        { region: "Southern Africa", current: 2.7, projected2030: 2.3, projected2050: 1.9 },
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="region" />
                      <YAxis label={{ value: "Yield (tons/hectare)", angle: -90, position: "insideLeft" }} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="current" name="Current Yield" fill="#0A5D22" />
                      <Bar dataKey="projected2030" name="Projected 2030" fill="#8FD14F" />
                      <Bar dataKey="projected2050" name="Projected 2050" fill="#D4E157" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </DashboardChartCard>

              <DashboardChartCard
                title="Rice Yield Projections"
                description="Climate impact on rice production across regions"
                className="col-span-1"
              >
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { region: "North Africa", current: 4.5, projected2030: 4.1, projected2050: 3.7 },
                        { region: "West Africa", current: 2.8, projected2030: 2.6, projected2050: 2.3 },
                        { region: "East Africa", current: 3.2, projected2030: 2.9, projected2050: 2.6 },
                        { region: "Central Africa", current: 2.4, projected2030: 2.2, projected2050: 2.0 },
                        { region: "Southern Africa", current: 3.5, projected2030: 3.2, projected2050: 2.9 },
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="region" />
                      <YAxis label={{ value: "Yield (tons/hectare)", angle: -90, position: "insideLeft" }} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="current" name="Current Yield" fill="#0A5D22" />
                      <Bar dataKey="projected2030" name="Projected 2030" fill="#8FD14F" />
                      <Bar dataKey="projected2050" name="Projected 2050" fill="#D4E157" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </DashboardChartCard>
            </div>

            <DashboardChartCard
              title="Crop Vulnerability Index"
              description="Vulnerability assessment of key crops to climate change"
              className="mt-6"
            >
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={[
                      { crop: "Maize", vulnerability: 0.78, adaptive: 0.45 },
                      { crop: "Rice", vulnerability: 0.65, adaptive: 0.52 },
                      { crop: "Wheat", vulnerability: 0.82, adaptive: 0.38 },
                      { crop: "Cassava", vulnerability: 0.45, adaptive: 0.68 },
                      { crop: "Millet", vulnerability: 0.58, adaptive: 0.62 },
                      { crop: "Sorghum", vulnerability: 0.52, adaptive: 0.65 },
                      { crop: "Beans", vulnerability: 0.72, adaptive: 0.48 },
                    ]}
                    margin={{ top: 20, right: 30, left: 90, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 1]} />
                    <YAxis dataKey="crop" type="category" />
                    <Tooltip formatter={(value) => [`${(value * 100).toFixed(0)}%`, "Index"]} />
                    <Legend />
                    <Bar dataKey="vulnerability" name="Vulnerability Index" fill="#EF4444" />
                    <Bar dataKey="adaptive" name="Adaptive Capacity" fill="#0A5D22" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </DashboardChartCard>
          </TabsContent>

          <TabsContent value="water" className="mt-0">
            <DashboardChartCard
              title="Agricultural Water Stress Trends"
              description="Projected water stress levels affecting agriculture by region"
              className="mb-6"
            >
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={waterStressData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis label={{ value: "Water Stress Index (0-100)", angle: -90, position: "insideLeft" }} />
                    <Tooltip formatter={(value) => [`${value}`, "Water Stress Index"]} />
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DashboardChartCard
                title="Irrigation Efficiency Trends"
                description="Changes in irrigation efficiency over time"
                className="col-span-1"
              >
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={[
                        { year: 2010, traditional: 75, drip: 10, sprinkler: 15 },
                        { year: 2012, traditional: 72, drip: 12, sprinkler: 16 },
                        { year: 2014, traditional: 68, drip: 15, sprinkler: 17 },
                        { year: 2016, traditional: 65, drip: 17, sprinkler: 18 },
                        { year: 2018, traditional: 60, drip: 20, sprinkler: 20 },
                        { year: 2020, traditional: 55, drip: 24, sprinkler: 21 },
                        { year: 2022, traditional: 50, drip: 28, sprinkler: 22 },
                      ]}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis label={{ value: "Percentage (%)", angle: -90, position: "insideLeft" }} />
                      <Tooltip formatter={(value) => [`${value}%`, "of Total Irrigation"]} />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="traditional"
                        stackId="1"
                        stroke="#AFB42B"
                        fill="#AFB42B"
                        name="Traditional Irrigation"
                      />
                      <Area
                        type="monotone"
                        dataKey="drip"
                        stackId="1"
                        stroke="#0A5D22"
                        fill="#0A5D22"
                        name="Drip Irrigation"
                      />
                      <Area
                        type="monotone"
                        dataKey="sprinkler"
                        stackId="1"
                        stroke="#8FD14F"
                        fill="#8FD14F"
                        name="Sprinkler Systems"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </DashboardChartCard>

              <DashboardChartCard
                title="Rainfall Pattern Changes"
                description="Shifts in precipitation affecting agricultural regions"
                className="col-span-1"
              >
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { month: "Jan", historical: 45, current: 38, projected: 32 },
                        { month: "Feb", historical: 50, current: 45, projected: 40 },
                        { month: "Mar", historical: 65, current: 60, projected: 55 },
                        { month: "Apr", historical: 80, current: 75, projected: 70 },
                        { month: "May", historical: 95, current: 90, projected: 85 },
                        { month: "Jun", historical: 75, current: 80, projected: 85 },
                        { month: "Jul", historical: 60, current: 65, projected: 70 },
                        { month: "Aug", historical: 70, current: 75, projected: 80 },
                        { month: "Sep", historical: 85, current: 80, projected: 75 },
                        { month: "Oct", historical: 75, current: 70, projected: 65 },
                        { month: "Nov", historical: 60, current: 55, projected: 50 },
                        { month: "Dec", historical: 50, current: 45, projected: 40 },
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis label={{ value: "Rainfall (mm)", angle: -90, position: "insideLeft" }} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="historical" name="1980-2000 Average" fill="#8FD14F" />
                      <Bar dataKey="current" name="2000-2020 Average" fill="#0A5D22" />
                      <Bar dataKey="projected" name="2030-2050 Projected" fill="#D4E157" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </DashboardChartCard>
            </div>
          </TabsContent>

          <TabsContent value="adaptation" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <DashboardChartCard
                title="Drought-Resistant Crop Adoption"
                description="Uptake of drought-resistant crop varieties"
                className="col-span-1"
              >
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { year: 2010, maize: 5, rice: 3, millet: 12, sorghum: 15 },
                        { year: 2012, maize: 8, rice: 5, millet: 18, sorghum: 20 },
                        { year: 2014, maize: 12, rice: 8, millet: 25, sorghum: 28 },
                        { year: 2016, maize: 18, rice: 12, millet: 32, sorghum: 35 },
                        { year: 2018, maize: 25, rice: 18, millet: 38, sorghum: 42 },
                        { year: 2020, maize: 32, rice: 22, millet: 45, sorghum: 48 },
                        { year: 2022, maize: 38, rice: 28, millet: 52, sorghum: 55 },
                      ]}
                      margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis label={{ value: "Adoption Rate (%)", angle: -90, position: "insideLeft" }} />
                      <Tooltip formatter={(value) => [`${value}%`, "Adoption Rate"]} />
                      <Legend />
                      <Line type="monotone" dataKey="maize" stroke="#0A5D22" name="Drought-Resistant Maize" />
                      <Line type="monotone" dataKey="rice" stroke="#8FD14F" name="Drought-Resistant Rice" />
                      <Line type="monotone" dataKey="millet" stroke="#D4E157" name="Improved Millet" />
                      <Line type="monotone" dataKey="sorghum" stroke="#AFB42B" name="Improved Sorghum" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </DashboardChartCard>

              <DashboardChartCard
                title="Sustainable Soil Management"
                description="Adoption of soil conservation practices"
                className="col-span-1"
              >
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { region: "North Africa", noTill: 15, coverCrops: 12, rotation: 25, terracing: 18 },
                        { region: "West Africa", noTill: 22, coverCrops: 18, rotation: 32, terracing: 10 },
                        { region: "East Africa", noTill: 28, coverCrops: 25, rotation: 35, terracing: 22 },
                        { region: "Central Africa", noTill: 12, coverCrops: 15, rotation: 20, terracing: 8 },
                        { region: "Southern Africa", noTill: 25, coverCrops: 20, rotation: 30, terracing: 15 },
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="region" />
                      <YAxis label={{ value: "Adoption Rate (%)", angle: -90, position: "insideLeft" }} />
                      <Tooltip formatter={(value) => [`${value}%`, "Adoption Rate"]} />
                      <Legend />
                      <Bar dataKey="noTill" name="No-Till Farming" stackId="a" fill="#0A5D22" />
                      <Bar dataKey="coverCrops" name="Cover Crops" stackId="a" fill="#8FD14F" />
                      <Bar dataKey="rotation" name="Crop Rotation" stackId="a" fill="#D4E157" />
                      <Bar dataKey="terracing" name="Terracing" stackId="a" fill="#AFB42B" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </DashboardChartCard>
            </div>

            <DashboardChartCard
              title="Climate Adaptation Investment"
              description="Financial resources allocated to agricultural adaptation"
              className="mb-6"
            >
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={[
                      { year: 2015, research: 120, infrastructure: 180, training: 80, subsidies: 150 },
                      { year: 2016, research: 140, infrastructure: 200, training: 90, subsidies: 160 },
                      { year: 2017, research: 160, infrastructure: 220, training: 100, subsidies: 180 },
                      { year: 2018, research: 180, infrastructure: 250, training: 120, subsidies: 200 },
                      { year: 2019, research: 210, infrastructure: 280, training: 140, subsidies: 220 },
                      { year: 2020, research: 250, infrastructure: 320, training: 160, subsidies: 250 },
                      { year: 2021, research: 280, infrastructure: 350, training: 180, subsidies: 280 },
                      { year: 2022, research: 320, infrastructure: 380, training: 210, subsidies: 310 },
                    ]}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis label={{ value: "Investment ($ millions)", angle: -90, position: "insideLeft" }} />
                    <Tooltip formatter={(value) => [`$${value}M`, "Investment"]} />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="research"
                      stackId="1"
                      stroke="#0A5D22"
                      fill="#0A5D22"
                      name="Research & Development"
                    />
                    <Area
                      type="monotone"
                      dataKey="infrastructure"
                      stackId="1"
                      stroke="#8FD14F"
                      fill="#8FD14F"
                      name="Infrastructure"
                    />
                    <Area
                      type="monotone"
                      dataKey="training"
                      stackId="1"
                      stroke="#D4E157"
                      fill="#D4E157"
                      name="Farmer Training"
                    />
                    <Area
                      type="monotone"
                      dataKey="subsidies"
                      stackId="1"
                      stroke="#AFB42B"
                      fill="#AFB42B"
                      name="Subsidies & Incentives"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </DashboardChartCard>
          </TabsContent>
        </Tabs>

        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-bold mb-4 text-[#0A5D22]">Key Insights</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Climate change is projected to reduce crop yields by 5-25% across African regions by 2050, with maize and
              wheat showing the highest vulnerability
            </li>
            <li>
              Adoption of drought-resistant crop varieties has increased by 35% in the last decade, with East Africa
              leading implementation
            </li>
            <li>
              Livestock production faces severe heat stress risks, with potential productivity losses of 10-20% in arid
              and semi-arid regions
            </li>
            <li>
              Water-efficient irrigation systems could reduce agricultural water use by up to 40%, but current adoption
              rates remain below 15% in most regions
            </li>
            <li>
              Climate-smart agriculture practices show potential to increase resilience while reducing emissions by
              14-41% depending on the farming system
            </li>
          </ul>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-[#0A5D22]">Recommended Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">For Policymakers</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Increase investment in agricultural research focused on climate-resilient crop varieties</li>
                <li>Develop targeted subsidy programs for climate-smart agriculture technologies</li>
                <li>Strengthen early warning systems for drought and extreme weather events</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">For Farmers & Cooperatives</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Diversify crop portfolios to reduce climate vulnerability</li>
                <li>Implement water conservation techniques including rainwater harvesting</li>
                <li>Adopt agroforestry practices to improve soil health and carbon sequestration</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
