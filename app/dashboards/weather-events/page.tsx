"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import DashboardChartCard from "@/components/dashboard-chart-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Download, Share2, Info, Calendar, Filter, CloudLightning } from "lucide-react"
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
  ScatterChart,
  Scatter,
} from "recharts"

// Sample data for charts
const disasterFrequencyData = [
  { year: 2000, floods: 28, droughts: 12, storms: 15, heatwaves: 5, landslides: 8 },
  { year: 2002, floods: 32, droughts: 14, storms: 16, heatwaves: 6, landslides: 9 },
  { year: 2004, floods: 35, droughts: 15, storms: 18, heatwaves: 8, landslides: 10 },
  { year: 2006, floods: 38, droughts: 16, storms: 20, heatwaves: 10, landslides: 12 },
  { year: 2008, floods: 42, droughts: 18, storms: 22, heatwaves: 12, landslides: 14 },
  { year: 2010, floods: 45, droughts: 20, storms: 25, heatwaves: 15, landslides: 16 },
  { year: 2012, floods: 48, droughts: 22, storms: 28, heatwaves: 18, landslides: 18 },
  { year: 2014, floods: 52, droughts: 24, storms: 30, heatwaves: 22, landslides: 20 },
  { year: 2016, floods: 56, droughts: 26, storms: 32, heatwaves: 25, landslides: 22 },
  { year: 2018, floods: 60, droughts: 28, storms: 35, heatwaves: 28, landslides: 24 },
  { year: 2020, floods: 65, droughts: 30, storms: 38, heatwaves: 32, landslides: 26 },
  { year: 2022, floods: 70, droughts: 32, storms: 42, heatwaves: 35, landslides: 28 },
]

const economicImpactData = [
  { name: "Floods", value: 38 },
  { name: "Droughts", value: 25 },
  { name: "Storms", value: 18 },
  { name: "Heatwaves", value: 12 },
  { name: "Landslides", value: 7 },
]

const COLORS = ["#0A5D22", "#8FD14F", "#D4E157", "#CDDC39", "#AFB42B", "#827717"]

export default function WeatherEventsDashboardPage() {
  const [timeRange, setTimeRange] = useState("10y")
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
              <CloudLightning className="h-8 w-8 text-[#0A5D22]" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">Weather Events & Disasters Dashboard</h1>
          </div>
          <p className="text-lg max-w-3xl">
            Tracking the frequency, intensity, and impacts of extreme weather events and climate-related disasters
            across Africa.
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
                <SelectItem value="5y">Last 5 Years</SelectItem>
                <SelectItem value="10y">Last 10 Years</SelectItem>
                <SelectItem value="20y">Last 20 Years</SelectItem>
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
                  <p className="text-sm font-medium text-gray-500">Disaster Frequency</p>
                  <h3 className="text-2xl font-bold text-[#0A5D22]">+68%</h3>
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
              <p className="text-sm text-gray-500 mt-2">Increase in climate-related disasters since 2000</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Economic Losses</p>
                  <h3 className="text-2xl font-bold text-[#0A5D22]">$38.5B</h3>
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
              <p className="text-sm text-gray-500 mt-2">Annual economic losses from climate disasters (2022)</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">People Affected</p>
                  <h3 className="text-2xl font-bold text-[#0A5D22]">28.5M</h3>
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
              <p className="text-sm text-gray-500 mt-2">People affected by climate disasters annually</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="frequency">Disaster Frequency</TabsTrigger>
            <TabsTrigger value="impacts">Economic Impacts</TabsTrigger>
            <TabsTrigger value="preparedness">Disaster Preparedness</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <DashboardChartCard
                title="Extreme Weather Events Frequency"
                description="Trends in climate-related disaster frequency"
                className="col-span-1"
              >
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={disasterFrequencyData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis label={{ value: "Number of Events", angle: -90, position: "insideLeft" }} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="floods" stroke="#0A5D22" activeDot={{ r: 8 }} name="Floods" />
                      <Line type="monotone" dataKey="droughts" stroke="#8FD14F" name="Droughts" />
                      <Line type="monotone" dataKey="storms" stroke="#D4E157" name="Storms" />
                      <Line type="monotone" dataKey="heatwaves" stroke="#AFB42B" name="Heatwaves" />
                      <Line type="monotone" dataKey="landslides" stroke="#827717" name="Landslides" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </DashboardChartCard>

              <DashboardChartCard
                title="Economic Impact by Disaster Type"
                description="Distribution of economic losses by disaster category"
                className="col-span-1"
              >
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={economicImpactData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {economicImpactData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, "of Economic Losses"]} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </DashboardChartCard>
            </div>

            <DashboardChartCard
              title="Disaster Impacts Over Time"
              description="Trends in human and economic impacts of climate disasters"
              className="mb-6"
            >
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={[
                      { year: 2000, affected: 12.5, economic: 8.2 },
                      { year: 2002, affected: 14.2, economic: 10.5 },
                      { year: 2004, affected: 15.8, economic: 12.8 },
                      { year: 2006, affected: 17.5, economic: 15.2 },
                      { year: 2008, affected: 19.2, economic: 18.5 },
                      { year: 2010, affected: 21.5, economic: 22.2 },
                      { year: 2012, affected: 23.2, economic: 25.8 },
                      { year: 2014, affected: 24.8, economic: 28.5 },
                      { year: 2016, affected: 26.2, economic: 31.2 },
                      { year: 2018, affected: 27.5, economic: 34.8 },
                      { year: 2020, affected: 28.2, economic: 36.5 },
                      { year: 2022, affected: 28.5, economic: 38.5 },
                    ]}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis
                      yAxisId="left"
                      label={{ value: "People Affected (millions)", angle: -90, position: "insideLeft" }}
                    />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      label={{ value: "Economic Losses ($ billions)", angle: 90, position: "insideRight" }}
                    />
                    <Tooltip
                      formatter={(value, name) => {
                        if (name === "affected") return [`${value}M`, "People Affected"]
                        if (name === "economic") return [`$${value}B`, "Economic Losses"]
                        return [value, name]
                      }}
                    />
                    <Legend />
                    <Area
                      yAxisId="left"
                      type="monotone"
                      dataKey="affected"
                      stroke="#0A5D22"
                      fill="#0A5D22"
                      name="People Affected"
                    />
                    <Area
                      yAxisId="right"
                      type="monotone"
                      dataKey="economic"
                      stroke="#8FD14F"
                      fill="#8FD14F"
                      name="Economic Losses"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </DashboardChartCard>
          </TabsContent>

          <TabsContent value="frequency" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DashboardChartCard
                title="Disaster Frequency by Region"
                description="Distribution of climate disasters across African regions"
                className="col-span-1"
              >
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { region: "North Africa", floods: 12, droughts: 8, storms: 5, heatwaves: 10, landslides: 3 },
                        { region: "West Africa", floods: 18, droughts: 6, storms: 12, heatwaves: 8, landslides: 5 },
                        { region: "East Africa", floods: 15, droughts: 10, storms: 8, heatwaves: 6, landslides: 7 },
                        { region: "Central Africa", floods: 10, droughts: 5, storms: 7, heatwaves: 4, landslides: 8 },
                        {
                          region: "Southern Africa",
                          floods: 15,
                          droughts: 12,
                          storms: 10,
                          heatwaves: 7,
                          landslides: 5,
                        },
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="region" />
                      <YAxis label={{ value: "Number of Events (2022)", angle: -90, position: "insideLeft" }} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="floods" name="Floods" stackId="a" fill="#0A5D22" />
                      <Bar dataKey="droughts" name="Droughts" stackId="a" fill="#8FD14F" />
                      <Bar dataKey="storms" name="Storms" stackId="a" fill="#D4E157" />
                      <Bar dataKey="heatwaves" name="Heatwaves" stackId="a" fill="#AFB42B" />
                      <Bar dataKey="landslides" name="Landslides" stackId="a" fill="#827717" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </DashboardChartCard>

              <DashboardChartCard
                title="Disaster Intensity Trends"
                description="Changes in disaster intensity over time"
                className="col-span-1"
              >
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { year: 2000, floodIntensity: 0.8, droughtIntensity: 0.7, stormIntensity: 0.6 },
                        { year: 2002, floodIntensity: 0.85, droughtIntensity: 0.75, stormIntensity: 0.65 },
                        { year: 2004, floodIntensity: 0.9, droughtIntensity: 0.8, stormIntensity: 0.7 },
                        { year: 2006, floodIntensity: 0.95, droughtIntensity: 0.85, stormIntensity: 0.75 },
                        { year: 2008, floodIntensity: 1.0, droughtIntensity: 0.9, stormIntensity: 0.8 },
                        { year: 2010, floodIntensity: 1.05, droughtIntensity: 0.95, stormIntensity: 0.85 },
                        { year: 2012, floodIntensity: 1.1, droughtIntensity: 1.0, stormIntensity: 0.9 },
                        { year: 2014, floodIntensity: 1.15, droughtIntensity: 1.05, stormIntensity: 0.95 },
                        { year: 2016, floodIntensity: 1.2, droughtIntensity: 1.1, stormIntensity: 1.0 },
                        { year: 2018, floodIntensity: 1.25, droughtIntensity: 1.15, stormIntensity: 1.05 },
                        { year: 2020, floodIntensity: 1.3, droughtIntensity: 1.2, stormIntensity: 1.1 },
                        { year: 2022, floodIntensity: 1.35, droughtIntensity: 1.25, stormIntensity: 1.15 },
                      ]}
                      margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis
                        label={{ value: "Intensity Index (1.0 = 2000 baseline)", angle: -90, position: "insideLeft" }}
                      />
                      <Tooltip formatter={(value) => [`${value}`, "Intensity Index"]} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="floodIntensity"
                        stroke="#0A5D22"
                        activeDot={{ r: 8 }}
                        name="Flood Intensity"
                      />
                      <Line type="monotone" dataKey="droughtIntensity" stroke="#8FD14F" name="Drought Intensity" />
                      <Line type="monotone" dataKey="stormIntensity" stroke="#D4E157" name="Storm Intensity" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </DashboardChartCard>
            </div>

            <DashboardChartCard
              title="Seasonal Distribution of Disasters"
              description="Monthly patterns of different disaster types"
              className="mt-6"
            >
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { month: "Jan", floods: 8, droughts: 2, storms: 5, heatwaves: 1, landslides: 2 },
                      { month: "Feb", floods: 7, droughts: 3, storms: 4, heatwaves: 2, landslides: 2 },
                      { month: "Mar", floods: 6, droughts: 4, storms: 6, heatwaves: 3, landslides: 3 },
                      { month: "Apr", floods: 8, droughts: 3, storms: 7, heatwaves: 4, landslides: 4 },
                      { month: "May", floods: 10, droughts: 2, storms: 8, heatwaves: 5, landslides: 5 },
                      { month: "Jun", floods: 12, droughts: 1, storms: 10, heatwaves: 7, landslides: 6 },
                      { month: "Jul", floods: 15, droughts: 1, storms: 12, heatwaves: 8, landslides: 7 },
                      { month: "Aug", floods: 18, droughts: 1, storms: 15, heatwaves: 8, landslides: 8 },
                      { month: "Sep", floods: 14, droughts: 2, storms: 12, heatwaves: 6, landslides: 6 },
                      { month: "Oct", floods: 10, droughts: 3, storms: 8, heatwaves: 4, landslides: 4 },
                      { month: "Nov", floods: 8, droughts: 4, storms: 6, heatwaves: 2, landslides: 3 },
                      { month: "Dec", floods: 7, droughts: 3, storms: 5, heatwaves: 1, landslides: 2 },
                    ]}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis label={{ value: "Number of Events", angle: -90, position: "insideLeft" }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="floods" name="Floods" fill="#0A5D22" />
                    <Bar dataKey="droughts" name="Droughts" fill="#8FD14F" />
                    <Bar dataKey="storms" name="Storms" fill="#D4E157" />
                    <Bar dataKey="heatwaves" name="Heatwaves" fill="#AFB42B" />
                    <Bar dataKey="landslides" name="Landslides" fill="#827717" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </DashboardChartCard>
          </TabsContent>

          <TabsContent value="impacts" className="mt-0">
            <DashboardChartCard
              title="Economic Losses by Country"
              description="Top 10 countries by climate disaster economic impact"
              className="mb-6"
            >
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={[
                      { country: "Mozambique", value: 5.2 },
                      { country: "Nigeria", value: 4.8 },
                      { country: "South Africa", value: 4.5 },
                      { country: "Madagascar", value: 3.8 },
                      { country: "Kenya", value: 3.5 },
                      { country: "Ethiopia", value: 3.2 },
                      { country: "Egypt", value: 2.8 },
                      { country: "Zimbabwe", value: 2.5 },
                      { country: "Morocco", value: 2.2 },
                      { country: "Ghana", value: 1.8 },
                    ]}
                    margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="country" type="category" />
                    <Tooltip formatter={(value) => [`$${value}B`, "Economic Losses"]} />
                    <Legend />
                    <Bar dataKey="value" name="Economic Losses (USD Billions)" fill="#0A5D22" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </DashboardChartCard>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DashboardChartCard
                title="Sectoral Economic Impacts"
                description="Distribution of economic losses by sector"
                className="col-span-1"
              >
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: "Agriculture", value: 35 },
                          { name: "Infrastructure", value: 25 },
                          { name: "Housing", value: 18 },
                          { name: "Industry", value: 12 },
                          { name: "Services", value: 10 },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {economicImpactData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, "of Economic Losses"]} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </DashboardChartCard>

              <DashboardChartCard
                title="Disaster Cost vs. GDP"
                description="Economic impact as percentage of GDP"
                className="col-span-1"
              >
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        type="number"
                        dataKey="gdp"
                        name="GDP"
                        unit="B"
                        label={{ value: "GDP (USD Billions)", position: "bottom" }}
                      />
                      <YAxis
                        type="number"
                        dataKey="impact"
                        name="Impact"
                        unit="%"
                        label={{ value: "Disaster Cost (% of GDP)", angle: -90, position: "insideLeft" }}
                      />
                      <Tooltip
                        cursor={{ strokeDasharray: "3 3" }}
                        formatter={(value, name) => {
                          if (name === "gdp") return [`$${value}B`, "GDP"]
                          if (name === "impact") return [`${value}%`, "Disaster Cost (% of GDP)"]
                          return [value, name]
                        }}
                      />
                      <Legend />
                      <Scatter
                        name="Countries"
                        data={[
                          { country: "Mozambique", gdp: 15.3, impact: 8.5 },
                          { country: "Nigeria", gdp: 440.8, impact: 1.1 },
                          { country: "South Africa", gdp: 350.1, impact: 1.3 },
                          { country: "Madagascar", gdp: 14.5, impact: 6.8 },
                          { country: "Kenya", gdp: 110.3, impact: 3.2 },
                          { country: "Ethiopia", gdp: 126.8, impact: 2.5 },
                          { country: "Egypt", gdp: 435.6, impact: 0.6 },
                          { country: "Zimbabwe", gdp: 28.4, impact: 4.8 },
                          { country: "Morocco", gdp: 132.7, impact: 1.7 },
                          { country: "Ghana", gdp: 77.6, impact: 2.3 },
                        ]}
                        fill="#0A5D22"
                      />
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
              </DashboardChartCard>
            </div>
          </TabsContent>

          <TabsContent value="preparedness" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <DashboardChartCard
                title="Early Warning System Coverage"
                description="Percentage of population covered by early warning systems"
                className="col-span-1"
              >
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { region: "North Africa", coverage: 68 },
                        { region: "West Africa", coverage: 42 },
                        { region: "East Africa", coverage: 55 },
                        { region: "Central Africa", coverage: 35 },
                        { region: "Southern Africa", coverage: 62 },
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="region" />
                      <YAxis label={{ value: "Population Coverage (%)", angle: -90, position: "insideLeft" }} />
                      <Tooltip formatter={(value) => [`${value}%`, "Population Coverage"]} />
                      <Legend />
                      <Bar dataKey="coverage" name="Early Warning Coverage" fill="#0A5D22" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </DashboardChartCard>

              <DashboardChartCard
                title="Disaster Preparedness Index"
                description="Composite index of disaster readiness by country"
                className="col-span-1"
              >
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      layout="vertical"
                      data={[
                        { country: "South Africa", index: 72 },
                        { country: "Morocco", index: 68 },
                        { country: "Egypt", index: 65 },
                        { country: "Kenya", index: 58 },
                        { country: "Ghana", index: 55 },
                        { country: "Nigeria", index: 52 },
                        { country: "Ethiopia", index: 48 },
                        { country: "Mozambique", index: 45 },
                        { country: "Tanzania", index: 42 },
                        { country: "DR Congo", index: 35 },
                      ]}
                      margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="country" type="category" />
                      <Tooltip formatter={(value) => [`${value}`, "Preparedness Index (0-100)"]} />
                      <Legend />
                      <Bar dataKey="index" name="Disaster Preparedness Index" fill="#0A5D22" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </DashboardChartCard>
            </div>

            <DashboardChartCard
              title="Disaster Response Effectiveness"
              description="Assessment of disaster response capabilities"
              className="mb-6"
            >
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { metric: "Early Warning", score: 65, target: 90 },
                      { metric: "Emergency Response", score: 58, target: 85 },
                      { metric: "Evacuation Systems", score: 52, target: 80 },
                      { metric: "Relief Distribution", score: 60, target: 85 },
                      { metric: "Healthcare Capacity", score: 55, target: 80 },
                      { metric: "Infrastructure Resilience", score: 48, target: 75 },
                      { metric: "Communication Systems", score: 62, target: 85 },
                    ]}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="metric" />
                    <YAxis label={{ value: "Score (0-100)", angle: -90, position: "insideLeft" }} />
                    <Tooltip formatter={(value) => [`${value}`, "Score (0-100)"]} />
                    <Legend />
                    <Bar dataKey="score" name="Current Score" fill="#0A5D22" />
                    <Bar dataKey="target" name="Target Score" fill="#8FD14F" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </DashboardChartCard>
          </TabsContent>
        </Tabs>

        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-bold mb-4 text-[#0A5D22]">Key Insights</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              The frequency of climate-related disasters in Africa has increased by 68% since 2000, with floods showing
              the most significant rise
            </li>
            <li>
              Annual economic losses from climate disasters reached $38.5 billion in 2022, representing approximately 2%
              of the continent's GDP
            </li>
            <li>
              Agriculture remains the most affected sector, accounting for 35% of all economic losses from climate
              disasters
            </li>
            <li>
              Early warning systems currently cover only 52% of Africa's population, with significant regional
              disparities
            </li>
            <li>
              Countries with higher disaster preparedness indices show significantly lower per-capita economic losses
              from climate events
            </li>
          </ul>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-[#0A5D22]">Recommended Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">For Policymakers</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Invest in comprehensive early warning systems, particularly in Central and West Africa</li>
                <li>Develop integrated disaster risk reduction strategies that address multiple hazards</li>
                <li>Incorporate climate disaster risk into national development planning</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">For Communities</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Implement community-based disaster preparedness programs</li>
                <li>Develop local early warning mechanisms that complement national systems</li>
                <li>Adopt climate-resilient agricultural and infrastructure practices</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
