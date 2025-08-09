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
  AreaChart,
  Area,
} from "recharts"

// Sample data for charts
const climateClaimsData = [
  { year: "2018", flood: 120, drought: 45, storm: 85, wildfire: 35 },
  { year: "2019", flood: 150, drought: 50, storm: 95, wildfire: 40 },
  { year: "2020", flood: 180, drought: 65, storm: 110, wildfire: 55 },
  { year: "2021", flood: 210, drought: 75, storm: 130, wildfire: 70 },
  { year: "2022", flood: 250, drought: 90, storm: 160, wildfire: 95 },
  { year: "2023", flood: 290, drought: 110, storm: 190, wildfire: 120 },
]

const riskExposureData = [
  { region: "North Africa", value: 65 },
  { region: "West Africa", value: 78 },
  { region: "East Africa", value: 72 },
  { region: "Central Africa", value: 58 },
  { region: "Southern Africa", value: 63 },
]

const premiumTrendsData = [
  { year: "2018", standard: 100, climate: 20 },
  { year: "2019", standard: 105, climate: 35 },
  { year: "2020", standard: 110, climate: 55 },
  { year: "2021", standard: 112, climate: 80 },
  { year: "2022", standard: 115, climate: 110 },
  { year: "2023", standard: 118, climate: 145 },
]

const COLORS = ["#3f51b5", "#009688", "#ff9800", "#f44336", "#4caf50"]

// Add the dashboard-page class to the main container
export default function InsuranceDashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8 dashboard-page">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <Link href="/dashboards" className="text-africa-green hover:underline flex items-center mb-2">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Dashboards
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold text-[#002147]">Insurance Sector Climate Dashboard</h1>
            <p className="text-gray-600">Climate-related risk exposure and claims analysis for insurance providers</p>
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
            <TabsTrigger value="claims-analysis">Claims Analysis</TabsTrigger>
            <TabsTrigger value="risk-modeling">Risk Modeling</TabsTrigger>
            <TabsTrigger value="premium-trends">Premium Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <DashboardKPI
                title="Climate-Related Claims"
                value="$845M"
                change={{ value: 32, type: "increase", timeframe: "last year" }}
                helpText="Total value of insurance claims attributed to climate events."
              />
              <DashboardKPI
                title="Climate Risk Exposure"
                value="$3.2B"
                change={{ value: 18, type: "increase", timeframe: "last year" }}
                helpText="Total value of insured assets exposed to climate risks."
              />
              <DashboardKPI
                title="Climate Premium Growth"
                value="28%"
                change={{ value: 5, type: "increase", timeframe: "last year" }}
                helpText="Year-over-year growth in premiums for climate-specific coverage."
              />
              <DashboardKPI
                title="Loss Ratio (Climate)"
                value="72%"
                change={{ value: 8, type: "increase", timeframe: "last year" }}
                helpText="Ratio of climate-related claims to premiums collected."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <DashboardChartCard
                title="Climate-Related Claims by Type"
                description="Annual claims value by climate event type ($M)"
                infoText="Shows the distribution of insurance claims across different types of climate-related events."
              >
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={climateClaimsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area type="monotone" dataKey="flood" name="Flood" stackId="1" fill="#3f51b5" stroke="#3f51b5" />
                      <Area
                        type="monotone"
                        dataKey="drought"
                        name="Drought"
                        stackId="1"
                        fill="#009688"
                        stroke="#009688"
                      />
                      <Area type="monotone" dataKey="storm" name="Storm" stackId="1" fill="#ff9800" stroke="#ff9800" />
                      <Area
                        type="monotone"
                        dataKey="wildfire"
                        name="Wildfire"
                        stackId="1"
                        fill="#f44336"
                        stroke="#f44336"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </DashboardChartCard>

              <DashboardChartCard
                title="Climate Risk Exposure by Region"
                description="Risk exposure index (0-100)"
                infoText="Composite index measuring the level of climate risk exposure in each region based on historical events and future projections."
              >
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={riskExposureData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="region" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" name="Risk Exposure Index" fill="#7e57c2" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </DashboardChartCard>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <DashboardChartCard
                title="Premium Trends"
                description="Standard vs. Climate-specific premiums (indexed, 2018=100)"
                infoText="Shows the growth in climate-specific insurance premiums compared to standard premiums."
              >
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={premiumTrendsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="standard"
                        name="Standard Premiums"
                        stroke="#64b5f6"
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="climate"
                        name="Climate Premiums"
                        stroke="#4caf50"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </DashboardChartCard>

              <Card className="md:col-span-2">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Climate Risk Management Recommendations</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="bg-purple-100 rounded-full p-1 mr-2 mt-0.5">
                        <div className="bg-purple-500 rounded-full w-2 h-2"></div>
                      </div>
                      <span className="text-sm">
                        <span className="font-medium">Implement dynamic pricing models</span> that account for changing
                        climate risk profiles
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-purple-100 rounded-full p-1 mr-2 mt-0.5">
                        <div className="bg-purple-500 rounded-full w-2 h-2"></div>
                      </div>
                      <span className="text-sm">
                        <span className="font-medium">Develop parametric insurance products</span> for regions with high
                        exposure to climate events
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-purple-100 rounded-full p-1 mr-2 mt-0.5">
                        <div className="bg-purple-500 rounded-full w-2 h-2"></div>
                      </div>
                      <span className="text-sm">
                        <span className="font-medium">Partner with climate adaptation initiatives</span> to reduce
                        overall risk exposure
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-purple-100 rounded-full p-1 mr-2 mt-0.5">
                        <div className="bg-purple-500 rounded-full w-2 h-2"></div>
                      </div>
                      <span className="text-sm">
                        <span className="font-medium">Utilize advanced climate modeling</span> to improve risk
                        assessment accuracy
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-purple-100 rounded-full p-1 mr-2 mt-0.5">
                        <div className="bg-purple-500 rounded-full w-2 h-2"></div>
                      </div>
                      <span className="text-sm">
                        <span className="font-medium">Explore risk transfer mechanisms</span> such as catastrophe bonds
                        and reinsurance
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="claims-analysis">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-bold mb-4">Claims Analysis</h2>
              <p className="text-gray-600 mb-6">
                This tab would contain detailed analysis of climate-related insurance claims, including trends,
                geographic distribution, and event type breakdowns.
              </p>
              <div className="p-12 border border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Detailed claims analysis dashboard would appear here</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="risk-modeling">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-bold mb-4">Climate Risk Modeling</h2>
              <p className="text-gray-600 mb-6">
                This tab would contain advanced climate risk models, including scenario analysis, probability
                distributions, and future projections.
              </p>
              <div className="p-12 border border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Climate risk modeling dashboard would appear here</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="premium-trends">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-bold mb-4">Premium Trends Analysis</h2>
              <p className="text-gray-600 mb-6">
                This tab would contain detailed analysis of premium trends for climate-related insurance products,
                including regional variations and product types.
              </p>
              <div className="p-12 border border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Premium trends analysis dashboard would appear here</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  )
}
