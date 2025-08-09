"use client"

import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import DashboardKPI from "@/components/dashboard-kpi"
import DashboardChartCard from "@/components/dashboard-chart-card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Download, Filter } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
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
} from "recharts"

// Sample data for charts
const climateRiskExposureData = [
  { sector: "Agriculture", physical: 65, transition: 35 },
  { sector: "Energy", physical: 40, transition: 75 },
  { sector: "Manufacturing", physical: 55, transition: 60 },
  { sector: "Real Estate", physical: 70, transition: 30 },
  { sector: "Transportation", physical: 50, transition: 80 },
  { sector: "Utilities", physical: 60, transition: 65 },
]

const greenLoanTrendsData = [
  { year: "2018", amount: 12 },
  { year: "2019", amount: 19 },
  { year: "2020", amount: 25 },
  { year: "2021", amount: 38 },
  { year: "2022", amount: 52 },
  { year: "2023", amount: 78 },
]

const portfolioCompositionData = [
  { name: "High Carbon", value: 35 },
  { name: "Medium Carbon", value: 40 },
  { name: "Low Carbon", value: 15 },
  { name: "Carbon Neutral", value: 10 },
]

const COLORS = ["#ff5252", "#ffb142", "#78c350", "#26c6da"]

export default function BanksDashboardPage() {
  return (
    <main className="min-h-screen flex flex-col bg-gray-50 dashboard-page">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <Link href="/dashboards" className="text-africa-green hover:underline flex items-center mb-2">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Dashboards
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold text-[#002147]">Banking Sector Climate Dashboard</h1>
            <p className="text-gray-600">
              Climate risk assessment and sustainable finance tracking for financial institutions
            </p>
          </div>
          <div className="flex mt-4 md:mt-0 space-x-2">
            <Button variant="outline" className="flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button variant="outline" className="flex items-center">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="climate-risk">Climate Risk</TabsTrigger>
            <TabsTrigger value="sustainable-finance">Sustainable Finance</TabsTrigger>
            <TabsTrigger value="portfolio-analysis">Portfolio Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <DashboardKPI
                title="Total Climate Risk Exposure"
                value="$2.8B"
                change={{ value: 12, type: "increase", timeframe: "last year" }}
                helpText="The total monetary value of assets exposed to climate-related risks."
              />
              <DashboardKPI
                title="Green Loan Portfolio"
                value="$1.2B"
                change={{ value: 28, type: "increase", timeframe: "last year" }}
                helpText="The total value of loans financing environmentally sustainable projects."
              />
              <DashboardKPI
                title="Carbon Intensity"
                value="42 tCO₂e/$M"
                change={{ value: 8, type: "decrease", timeframe: "last year" }}
                helpText="Carbon emissions per million dollars of financing."
              />
              <DashboardKPI
                title="Climate Risk Score"
                value="68/100"
                change={{ value: 5, type: "increase", timeframe: "last year" }}
                helpText="Composite score measuring the bank's climate risk management effectiveness."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <DashboardChartCard
                title="Climate Risk Exposure by Sector"
                description="Physical vs. transition risk exposure ($M)"
                infoText="Physical risks include extreme weather events and sea level rise. Transition risks include policy changes, technology shifts, and market preferences."
              >
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={climateRiskExposureData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="sector" type="category" />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="physical" name="Physical Risk" fill="#26a69a" />
                      <Bar dataKey="transition" name="Transition Risk" fill="#ef5350" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </DashboardChartCard>

              <DashboardChartCard
                title="Green Loan Growth Trend"
                description="Annual green loan issuance ($B)"
                infoText="Green loans are loans specifically earmarked for environmentally sustainable projects."
              >
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={greenLoanTrendsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="amount" name="Green Loans ($B)" stroke="#4caf50" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </DashboardChartCard>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <DashboardChartCard
                title="Loan Portfolio Carbon Composition"
                description="Distribution by carbon intensity category"
                infoText="Categorization based on financed emissions intensity relative to industry benchmarks."
              >
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={portfolioCompositionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {portfolioCompositionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </DashboardChartCard>

              <Card className="md:col-span-2">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Climate Risk Mitigation Recommendations</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="bg-green-100 rounded-full p-1 mr-2 mt-0.5">
                        <div className="bg-green-500 rounded-full w-2 h-2"></div>
                      </div>
                      <span className="text-sm">
                        <span className="font-medium">Diversify lending portfolio</span> across regions with varying
                        climate vulnerability profiles
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-green-100 rounded-full p-1 mr-2 mt-0.5">
                        <div className="bg-green-500 rounded-full w-2 h-2"></div>
                      </div>
                      <span className="text-sm">
                        <span className="font-medium">Increase financing</span> for climate adaptation projects in
                        high-risk sectors
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-green-100 rounded-full p-1 mr-2 mt-0.5">
                        <div className="bg-green-500 rounded-full w-2 h-2"></div>
                      </div>
                      <span className="text-sm">
                        <span className="font-medium">Implement enhanced due diligence</span> for projects in
                        flood-prone areas
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-green-100 rounded-full p-1 mr-2 mt-0.5">
                        <div className="bg-green-500 rounded-full w-2 h-2"></div>
                      </div>
                      <span className="text-sm">
                        <span className="font-medium">Develop transition financing products</span> to help high-carbon
                        clients reduce emissions
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-green-100 rounded-full p-1 mr-2 mt-0.5">
                        <div className="bg-green-500 rounded-full w-2 h-2"></div>
                      </div>
                      <span className="text-sm">
                        <span className="font-medium">Integrate climate scenarios</span> into stress testing and capital
                        allocation processes
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="climate-risk">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-bold mb-4">Climate Risk Analysis</h2>
              <p className="text-gray-600 mb-6">
                This tab would contain detailed climate risk analysis, including physical and transition risk
                assessments, scenario analysis, and risk mitigation strategies.
              </p>
              <div className="p-12 border border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Detailed climate risk analysis dashboard would appear here</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sustainable-finance">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-bold mb-4">Sustainable Finance Tracking</h2>
              <p className="text-gray-600 mb-6">
                This tab would contain detailed tracking of sustainable finance initiatives, including green loans,
                bonds, and other ESG-related financial products.
              </p>
              <div className="p-12 border border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Sustainable finance tracking dashboard would appear here</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="portfolio-analysis">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-bold mb-4">Portfolio Carbon Analysis</h2>
              <p className="text-gray-600 mb-6">
                This tab would contain detailed analysis of the carbon intensity of the loan portfolio, including sector
                breakdowns, trends, and comparison to benchmarks.
              </p>
              <div className="p-12 border border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Portfolio carbon analysis dashboard would appear here</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </main>
  )
}
