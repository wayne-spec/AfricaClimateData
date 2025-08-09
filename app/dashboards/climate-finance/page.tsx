"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import DashboardChartCard from "@/components/dashboard-chart-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Download, Share2, Info, Calendar, Filter, DollarSign } from "lucide-react"
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
  Scatter,
  ScatterChart,
} from "recharts"

// Sample data for charts
const financeFlowsData = [
  { year: 2015, public: 12.5, private: 8.2, multilateral: 15.3, bilateral: 9.8 },
  { year: 2016, public: 14.2, private: 9.5, multilateral: 16.8, bilateral: 10.5 },
  { year: 2017, public: 15.8, private: 11.2, multilateral: 18.5, bilateral: 11.2 },
  { year: 2018, public: 17.5, private: 13.8, multilateral: 20.2, bilateral: 12.8 },
  { year: 2019, public: 19.2, private: 16.5, multilateral: 22.5, bilateral: 14.5 },
  { year: 2020, public: 21.5, private: 19.8, multilateral: 25.2, bilateral: 16.2 },
  { year: 2021, public: 24.2, private: 23.5, multilateral: 28.5, bilateral: 18.5 },
  { year: 2022, public: 27.5, private: 28.2, multilateral: 32.5, bilateral: 21.2 },
]

const sectorAllocationData = [
  { name: "Renewable Energy", value: 35 },
  { name: "Agriculture & Forestry", value: 18 },
  { name: "Water Management", value: 15 },
  { name: "Urban Infrastructure", value: 12 },
  { name: "Transport", value: 10 },
  { name: "Disaster Risk Reduction", value: 7 },
  { name: "Other", value: 3 },
]

const COLORS = ["#0A5D22", "#8FD14F", "#D4E157", "#CDDC39", "#AFB42B", "#827717", "#9E9D24"]

export default function ClimateFinanceDashboardPage() {
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
              <DollarSign className="h-8 w-8 text-[#0A5D22]" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">Climate Finance Flows Dashboard</h1>
          </div>
          <p className="text-lg max-w-3xl">
            Tracking investments in climate mitigation and adaptation projects, sources of climate finance, and impact
            assessment.
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
                  <p className="text-sm font-medium text-gray-500">Total Climate Finance</p>
                  <h3 className="text-2xl font-bold text-[#0A5D22]">$109.4B</h3>
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
              <p className="text-sm text-gray-500 mt-2">Total climate finance flows to Africa in 2022</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Adaptation Finance</p>
                  <h3 className="text-2xl font-bold text-[#0A5D22]">$42.8B</h3>
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
              <p className="text-sm text-gray-500 mt-2">Finance for climate adaptation projects in 2022</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Private Sector Share</p>
                  <h3 className="text-2xl font-bold text-[#0A5D22]">25.8%</h3>
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
              <p className="text-sm text-gray-500 mt-2">Percentage of climate finance from private sources</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sources">Finance Sources</TabsTrigger>
            <TabsTrigger value="allocation">Sector Allocation</TabsTrigger>
            <TabsTrigger value="impact">Impact Assessment</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <DashboardChartCard
                title="Climate Finance Flows Over Time"
                description="Trends in climate finance to African countries"
                className="col-span-1"
              >
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={financeFlowsData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis label={{ value: "USD Billions", angle: -90, position: "insideLeft" }} />
                      <Tooltip formatter={(value) => [`$${value}B`, "Finance Flow"]} />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="public"
                        stackId="1"
                        stroke="#0A5D22"
                        fill="#0A5D22"
                        name="Public Finance"
                      />
                      <Area
                        type="monotone"
                        dataKey="private"
                        stackId="1"
                        stroke="#8FD14F"
                        fill="#8FD14F"
                        name="Private Finance"
                      />
                      <Area
                        type="monotone"
                        dataKey="multilateral"
                        stackId="2"
                        stroke="#D4E157"
                        fill="#D4E157"
                        name="Multilateral"
                      />
                      <Area
                        type="monotone"
                        dataKey="bilateral"
                        stackId="2"
                        stroke="#AFB42B"
                        fill="#AFB42B"
                        name="Bilateral"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </DashboardChartCard>

              <DashboardChartCard
                title="Sector Allocation of Climate Finance"
                description="Distribution of finance across different sectors"
                className="col-span-1"
              >
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sectorAllocationData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {sectorAllocationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, "of Total Finance"]} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </DashboardChartCard>
            </div>

            <DashboardChartCard
              title="Mitigation vs. Adaptation Finance"
              description="Balance between climate mitigation and adaptation funding"
              className="mb-6"
            >
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { year: 2015, mitigation: 25.8, adaptation: 20.0 },
                      { year: 2016, mitigation: 28.5, adaptation: 22.5 },
                      { year: 2017, mitigation: 32.2, adaptation: 24.5 },
                      { year: 2018, mitigation: 36.5, adaptation: 27.8 },
                      { year: 2019, mitigation: 41.2, adaptation: 31.5 },
                      { year: 2020, mitigation: 46.5, adaptation: 36.2 },
                      { year: 2021, mitigation: 52.8, adaptation: 41.9 },
                      { year: 2022, mitigation: 60.2, adaptation: 48.2 },
                    ]}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis label={{ value: "USD Billions", angle: -90, position: "insideLeft" }} />
                    <Tooltip formatter={(value) => [`$${value}B`, "Finance"]} />
                    <Legend />
                    <Bar dataKey="mitigation" name="Mitigation Finance" fill="#0A5D22" />
                    <Bar dataKey="adaptation" name="Adaptation Finance" fill="#8FD14F" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </DashboardChartCard>
          </TabsContent>

          <TabsContent value="sources" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DashboardChartCard
                title="Public vs. Private Finance"
                description="Comparison of public and private climate finance sources"
                className="col-span-1"
              >
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { year: 2015, public: 35.6, private: 10.2 },
                        { year: 2016, public: 38.2, private: 12.8 },
                        { year: 2017, public: 41.5, private: 15.2 },
                        { year: 2018, public: 45.3, private: 19.0 },
                        { year: 2019, public: 49.8, private: 22.9 },
                        { year: 2020, public: 54.5, private: 28.2 },
                        { year: 2021, public: 60.2, private: 34.5 },
                        { year: 2022, public: 67.8, private: 41.6 },
                      ]}
                      margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis label={{ value: "USD Billions", angle: -90, position: "insideLeft" }} />
                      <Tooltip formatter={(value) => [`$${value}B`, "Finance"]} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="public"
                        stroke="#0A5D22"
                        activeDot={{ r: 8 }}
                        name="Public Finance"
                      />
                      <Line type="monotone" dataKey="private" stroke="#8FD14F" name="Private Finance" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </DashboardChartCard>

              <DashboardChartCard
                title="Finance Sources Breakdown"
                description="Detailed breakdown of climate finance sources"
                className="col-span-1"
              >
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: "Multilateral Development Banks", value: 32 },
                          { name: "Bilateral Aid", value: 24 },
                          { name: "Climate Funds", value: 15 },
                          { name: "Private Corporations", value: 12 },
                          { name: "Commercial Banks", value: 8 },
                          { name: "Institutional Investors", value: 6 },
                          { name: "Philanthropy", value: 3 },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {sectorAllocationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, "of Total Finance"]} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </DashboardChartCard>
            </div>

            <DashboardChartCard
              title="Top 10 Climate Finance Contributors"
              description="Largest contributors to African climate finance"
              className="mt-6"
            >
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={[
                      { contributor: "World Bank", amount: 18.5 },
                      { contributor: "African Development Bank", amount: 12.8 },
                      { contributor: "European Union", amount: 10.5 },
                      { contributor: "Green Climate Fund", amount: 8.2 },
                      { contributor: "France", amount: 6.5 },
                      { contributor: "Germany", amount: 5.8 },
                      { contributor: "United Kingdom", amount: 5.2 },
                      { contributor: "Japan", amount: 4.5 },
                      { contributor: "United States", amount: 4.2 },
                      { contributor: "China", amount: 3.8 },
                    ]}
                    margin={{ top: 20, right: 30, left: 120, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="contributor" type="category" />
                    <Tooltip formatter={(value) => [`$${value}B`, "Contribution"]} />
                    <Legend />
                    <Bar dataKey="amount" name="USD Billions" fill="#0A5D22" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </DashboardChartCard>
          </TabsContent>

          <TabsContent value="allocation" className="mt-0">
            <DashboardChartCard
              title="Climate Finance by Country"
              description="Distribution of climate finance across African countries"
              className="mb-6"
            >
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { country: "South Africa", mitigation: 8.5, adaptation: 4.2 },
                      { country: "Egypt", mitigation: 7.2, adaptation: 5.8 },
                      { country: "Morocco", mitigation: 6.8, adaptation: 3.5 },
                      { country: "Kenya", mitigation: 4.5, adaptation: 3.8 },
                      { country: "Nigeria", mitigation: 4.2, adaptation: 3.2 },
                      { country: "Ethiopia", mitigation: 3.8, adaptation: 4.5 },
                      { country: "Ghana", mitigation: 2.5, adaptation: 2.2 },
                      { country: "Tanzania", mitigation: 2.2, adaptation: 2.8 },
                      { country: "Rwanda", mitigation: 1.8, adaptation: 1.5 },
                      { country: "Senegal", mitigation: 1.5, adaptation: 1.8 },
                    ]}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="country" />
                    <YAxis label={{ value: "USD Billions", angle: -90, position: "insideLeft" }} />
                    <Tooltip formatter={(value) => [`$${value}B`, "Finance"]} />
                    <Legend />
                    <Bar dataKey="mitigation" name="Mitigation Finance" fill="#0A5D22" />
                    <Bar dataKey="adaptation" name="Adaptation Finance" fill="#8FD14F" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </DashboardChartCard>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DashboardChartCard
                title="Mitigation Finance by Sector"
                description="Allocation of mitigation finance across sectors"
                className="col-span-1"
              >
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: "Renewable Energy", value: 45 },
                          { name: "Energy Efficiency", value: 18 },
                          { name: "Transport", value: 15 },
                          { name: "Forestry & Land Use", value: 12 },
                          { name: "Waste Management", value: 6 },
                          { name: "Industry", value: 4 },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {sectorAllocationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, "of Mitigation Finance"]} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </DashboardChartCard>

              <DashboardChartCard
                title="Adaptation Finance by Sector"
                description="Allocation of adaptation finance across sectors"
                className="col-span-1"
              >
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: "Water Management", value: 28 },
                          { name: "Agriculture", value: 25 },
                          { name: "Disaster Risk Reduction", value: 18 },
                          { name: "Infrastructure", value: 15 },
                          { name: "Health Systems", value: 8 },
                          { name: "Coastal Protection", value: 6 },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {sectorAllocationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, "of Adaptation Finance"]} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </DashboardChartCard>
            </div>
          </TabsContent>

          <TabsContent value="impact" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <DashboardChartCard
                title="Climate Finance Impact Metrics"
                description="Key performance indicators for climate finance"
                className="col-span-1"
              >
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { metric: "GHG Reduction", value: 85 },
                        { metric: "Renewable Capacity", value: 78 },
                        { metric: "Resilience Building", value: 65 },
                        { metric: "Job Creation", value: 72 },
                        { metric: "Policy Change", value: 58 },
                        { metric: "Technology Transfer", value: 62 },
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="metric" />
                      <YAxis label={{ value: "Performance Score (0-100)", angle: -90, position: "insideLeft" }} />
                      <Tooltip formatter={(value) => [`${value}`, "Impact Score"]} />
                      <Legend />
                      <Bar dataKey="value" name="Impact Score" fill="#0A5D22" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </DashboardChartCard>

              <DashboardChartCard
                title="Finance Effectiveness vs. Volume"
                description="Relationship between finance volume and effectiveness"
                className="col-span-1"
              >
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        type="number"
                        dataKey="finance"
                        name="Finance Volume"
                        unit="B"
                        label={{ value: "Finance Volume (USD Billions)", position: "bottom" }}
                      />
                      <YAxis
                        type="number"
                        dataKey="effectiveness"
                        name="Effectiveness"
                        unit="%"
                        label={{ value: "Effectiveness Score (%)", angle: -90, position: "insideLeft" }}
                      />
                      <Tooltip
                        cursor={{ strokeDasharray: "3 3" }}
                        formatter={(value, name) => {
                          if (name === "finance") return [`$${value}B`, "Finance Volume"]
                          if (name === "effectiveness") return [`${value}%`, "Effectiveness Score"]
                          return [value, name]
                        }}
                      />
                      <Legend />
                      <Scatter
                        name="Countries"
                        data={[
                          { country: "South Africa", finance: 12.7, effectiveness: 72 },
                          { country: "Egypt", finance: 13.0, effectiveness: 68 },
                          { country: "Morocco", finance: 10.3, effectiveness: 78 },
                          { country: "Kenya", finance: 8.3, effectiveness: 75 },
                          { country: "Nigeria", finance: 7.4, effectiveness: 62 },
                          { country: "Ethiopia", finance: 8.3, effectiveness: 70 },
                          { country: "Ghana", finance: 4.7, effectiveness: 73 },
                          { country: "Tanzania", finance: 5.0, effectiveness: 65 },
                          { country: "Rwanda", finance: 3.3, effectiveness: 82 },
                          { country: "Senegal", finance: 3.3, effectiveness: 76 },
                        ]}
                        fill="#0A5D22"
                      />
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
              </DashboardChartCard>
            </div>

            <DashboardChartCard
              title="Climate Finance Results Framework"
              description="Key outcomes and impacts of climate finance investments"
              className="mb-6"
            >
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { outcome: "Renewable Energy Added", value: 12.5, unit: "GW" },
                      { outcome: "GHG Emissions Reduced", value: 85.2, unit: "Mt CO₂e" },
                      { outcome: "People with Improved Resilience", value: 28.5, unit: "Million" },
                      { outcome: "Sustainable Land Management", value: 4.2, unit: "Million ha" },
                      { outcome: "Green Jobs Created", value: 1.8, unit: "Million" },
                      { outcome: "Clean Energy Access", value: 32.5, unit: "Million people" },
                    ]}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="outcome" />
                    <YAxis label={{ value: "Achievement (in respective units)", angle: -90, position: "insideLeft" }} />
                    <Tooltip formatter={(value, name, props) => [`${value} ${props.payload.unit}`, "Achievement"]} />
                    <Legend />
                    <Bar dataKey="value" name="Results Achieved" fill="#0A5D22" />
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
              Total climate finance flows to Africa reached $109.4 billion in 2022, a 15% increase from the previous
              year
            </li>
            <li>
              The share of adaptation finance has grown to 39% of total climate finance, but still falls short of the
              50% target
            </li>
            <li>Private sector participation in climate finance has increased significantly, reaching 25.8% in 2022</li>
            <li>
              Renewable energy remains the largest recipient of mitigation finance (45%), while water management leads
              adaptation finance (28%)
            </li>
            <li>
              South Africa, Egypt, and Morocco are the top recipients of climate finance, collectively receiving 30% of
              the continent's total
            </li>
          </ul>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-[#0A5D22]">Recommended Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">For Policymakers</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Strengthen national climate finance tracking systems to improve transparency and accountability</li>
                <li>Develop more bankable projects to attract private sector investment</li>
                <li>Increase focus on adaptation finance, particularly for vulnerable communities</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">For Financial Institutions</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Develop innovative financial instruments tailored to climate projects in Africa</li>
                <li>Enhance capacity for climate risk assessment in investment decisions</li>
                <li>Increase coordination between public and private finance to maximize impact</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
