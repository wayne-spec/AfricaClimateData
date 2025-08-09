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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"

// Sample data for charts
const emissionsReductionData = [
  { year: "2018", target: 100, actual: 98 },
  { year: "2019", target: 95, actual: 94 },
  { year: "2020", target: 90, actual: 86 },
  { year: "2021", target: 85, actual: 82 },
  { year: "2022", target: 80, actual: 78 },
  { year: "2023", target: 75, actual: 71 },
]

const policyComplianceData = [
  { sector: "Energy", compliance: 72 },
  { sector: "Transport", compliance: 65 },
  { sector: "Agriculture", compliance: 58 },
  { sector: "Industry", compliance: 80 },
  { sector: "Buildings", compliance: 68 },
  { sector: "Waste", compliance: 75 },
]

const climateFinanceData = [
  { year: "2018", adaptation: 12, mitigation: 28 },
  { year: "2019", adaptation: 15, mitigation: 32 },
  { year: "2020", adaptation: 18, mitigation: 38 },
  { year: "2021", adaptation: 22, mitigation: 45 },
  { year: "2022", adaptation: 28, mitigation: 52 },
  { year: "2023", adaptation: 35, mitigation: 60 },
]

const COLORS = ["#4caf50", "#2196f3", "#ff9800", "#f44336", "#9c27b0", "#795548"]

// Add the dashboard-page class to the main container
export default function RegulatoryDashboardPage() {
  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8 dashboard-page">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <Link href="/dashboards" className="text-africa-green hover:underline flex items-center mb-2">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Dashboards
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold text-[#002147]">Regulatory Bodies Climate Dashboard</h1>
            <p className="text-gray-600">Compliance monitoring and policy impact assessment for government agencies</p>
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
            <TabsTrigger value="emissions-tracking">Emissions Tracking</TabsTrigger>
            <TabsTrigger value="policy-compliance">Policy Compliance</TabsTrigger>
            <TabsTrigger value="climate-finance">Climate Finance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <DashboardKPI
                title="Emissions Reduction"
                value="29%"
                description="From 2018 baseline"
                change={{ value: 5, type: "increase", timeframe: "last year" }}
                helpText="Percentage reduction in national greenhouse gas emissions compared to the 2018 baseline."
              />
              <DashboardKPI
                title="Policy Compliance Rate"
                value="68%"
                change={{ value: 7, type: "increase", timeframe: "last year" }}
                helpText="Percentage of regulated entities meeting climate policy requirements."
              />
              <DashboardKPI
                title="Climate Finance Mobilized"
                value="$95M"
                change={{ value: 32, type: "increase", timeframe: "last year" }}
                helpText="Total climate finance mobilized for adaptation and mitigation projects."
              />
              <DashboardKPI
                title="NDC Implementation Score"
                value="72/100"
                change={{ value: 8, type: "increase", timeframe: "last year" }}
                helpText="Score measuring progress in implementing Nationally Determined Contributions under the Paris Agreement."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <DashboardChartCard
                title="Emissions Reduction Progress"
                description="Target vs. Actual (indexed, 2018=100)"
                infoText="Shows progress in reducing emissions compared to national targets."
              >
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={emissionsReductionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="target"
                        name="Target"
                        stroke="#7986cb"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                      />
                      <Line type="monotone" dataKey="actual" name="Actual" stroke="#4caf50" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </DashboardChartCard>

              <DashboardChartCard
                title="Policy Compliance by Sector"
                description="Percentage of entities meeting requirements"
                infoText="Shows the level of compliance with climate policies across different economic sectors."
              >
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart outerRadius={90} data={policyComplianceData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="sector" />
                      <PolarRadiusAxis domain={[0, 100]} />
                      <Radar
                        name="Compliance Rate (%)"
                        dataKey="compliance"
                        stroke="#8884d8"
                        fill="#8884d8"
                        fillOpacity={0.6}
                      />
                      <Tooltip />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </DashboardChartCard>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <DashboardChartCard
                title="Climate Finance Allocation"
                description="Adaptation vs. Mitigation funding ($M)"
                infoText="Shows the distribution of climate finance between adaptation and mitigation projects."
              >
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={climateFinanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="adaptation" name="Adaptation" stackId="a" fill="#4db6ac" />
                      <Bar dataKey="mitigation" name="Mitigation" stackId="a" fill="#7986cb" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </DashboardChartCard>

              <Card className="md:col-span-2">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Policy Recommendations</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="bg-green-100 rounded-full p-1 mr-2 mt-0.5">
                        <div className="bg-green-500 rounded-full w-2 h-2"></div>
                      </div>
                      <span className="text-sm">
                        <span className="font-medium">Strengthen enforcement mechanisms</span> for emissions reduction
                        targets in the transport sector
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-green-100 rounded-full p-1 mr-2 mt-0.5">
                        <div className="bg-green-500 rounded-full w-2 h-2"></div>
                      </div>
                      <span className="text-sm">
                        <span className="font-medium">Increase climate finance allocation</span> for adaptation projects
                        in vulnerable agricultural regions
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-green-100 rounded-full p-1 mr-2 mt-0.5">
                        <div className="bg-green-500 rounded-full w-2 h-2"></div>
                      </div>
                      <span className="text-sm">
                        <span className="font-medium">Implement capacity building programs</span> for local governments
                        to improve policy implementation
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-green-100 rounded-full p-1 mr-2 mt-0.5">
                        <div className="bg-green-500 rounded-full w-2 h-2"></div>
                      </div>
                      <span className="text-sm">
                        <span className="font-medium">Develop sector-specific guidelines</span> to improve compliance
                        rates in agriculture and transport
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-green-100 rounded-full p-1 mr-2 mt-0.5">
                        <div className="bg-green-500 rounded-full w-2 h-2"></div>
                      </div>
                      <span className="text-sm">
                        <span className="font-medium">Enhance monitoring and reporting systems</span> to improve data
                        quality and policy evaluation
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="emissions-tracking">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-bold mb-4">Emissions Tracking</h2>
              <p className="text-gray-600 mb-6">
                This tab would contain detailed emissions tracking data, including sector-specific emissions, trends,
                and progress toward national targets.
              </p>
              <div className="p-12 border border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Detailed emissions tracking dashboard would appear here</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="policy-compliance">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-bold mb-4">Policy Compliance Monitoring</h2>
              <p className="text-gray-600 mb-6">
                This tab would contain detailed policy compliance data, including entity-level compliance status,
                enforcement actions, and compliance improvement initiatives.
              </p>
              <div className="p-12 border border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Policy compliance monitoring dashboard would appear here</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="climate-finance">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-bold mb-4">Climate Finance Tracking</h2>
              <p className="text-gray-600 mb-6">
                This tab would contain detailed climate finance data, including funding sources, project allocations,
                and impact assessment.
              </p>
              <div className="p-12 border border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Climate finance tracking dashboard would appear here</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </main>
  )
}
