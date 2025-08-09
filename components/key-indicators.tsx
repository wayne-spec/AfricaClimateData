"use client"

import { useState } from "react"
import Link from "next/link"
import { LineChartIcon as ChartLine, Globe, ArrowRight } from "lucide-react"
import Image from "next/image"

type Indicator = {
  id: string
  title: string
  source: string
  question: string
  description: string
  chartUrl: string
  icon: "chart" | "map"
}

const indicators: Indicator[] = [
  {
    id: "temperature-anomalies",
    title: "Temperature Anomalies in Africa",
    source: "Long-run estimates from multiple climate data sources",
    question: "How has Africa's climate changed over time?",
    description:
      "Temperature anomalies measure the deviation from the long-term average temperature. This data shows how Africa's climate has been warming at an accelerating rate over the past century, with significant regional variations across the continent.",
    chartUrl: "/placeholder.svg?height=600&width=850",
    icon: "chart",
  },
  {
    id: "drought-frequency",
    title: "Drought Frequency and Severity",
    source: "African Drought Monitor Database",
    question: "How are drought patterns changing across Africa?",
    description:
      "Droughts are becoming more frequent and severe in many parts of Africa. This visualization shows the changing patterns of drought across different regions, highlighting areas of increasing vulnerability to water scarcity.",
    chartUrl: "/placeholder.svg?height=600&width=850",
    icon: "map",
  },
  {
    id: "renewable-energy-adoption",
    title: "Renewable Energy Adoption",
    source: "International Renewable Energy Agency (IRENA)",
    question: "How quickly are African countries adopting renewable energy?",
    description:
      "The transition to renewable energy is a key climate adaptation and mitigation strategy. This data shows the growth of solar, wind, and other renewable energy sources across African countries, revealing both progress and remaining challenges.",
    chartUrl: "/placeholder.svg?height=600&width=850",
    icon: "chart",
  },
  {
    id: "climate-vulnerability-index",
    title: "Climate Vulnerability Index",
    source: "Notre Dame Global Adaptation Initiative",
    question: "Which regions are most vulnerable to climate change impacts?",
    description:
      "The Climate Vulnerability Index measures a region's exposure, sensitivity, and adaptive capacity to climate change. This map reveals the areas of Africa facing the greatest climate risks, helping to prioritize adaptation efforts.",
    chartUrl: "/placeholder.svg?height=600&width=850",
    icon: "map",
  },
]

export default function KeyIndicators() {
  const [activeIndicator, setActiveIndicator] = useState(indicators[0].id)

  const currentIndicator = indicators.find((ind) => ind.id === activeIndicator) || indicators[0]

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-africa-green">Explore our data</h2>
          <p className="text-gray-600">Featured data from our collection of interactive visualizations.</p>
        </div>
        <Link href="/data" className="text-africa-red hover:underline flex items-center">
          See all our data
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="border-b border-gray-200">
          {indicators.map((indicator) => (
            <button
              key={indicator.id}
              onClick={() => setActiveIndicator(indicator.id)}
              className={`relative px-4 py-3 text-left w-full transition-colors ${
                activeIndicator === indicator.id ? "bg-gray-50" : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-start">
                <div className="mr-3 mt-1">
                  {indicator.icon === "chart" ? (
                    <ChartLine className="h-5 w-5 text-africa-green" />
                  ) : (
                    <Globe className="h-5 w-5 text-africa-green" />
                  )}
                </div>
                <div>
                  <div className="font-medium">{indicator.title}</div>
                  <div className="text-sm text-gray-500">{indicator.source}</div>
                </div>
                {activeIndicator === indicator.id && (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <ArrowRight className="h-4 w-4 text-africa-green" />
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        <div className="p-6 grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-4">
            <div className="mb-2">
              <span className="text-sm text-gray-500">{currentIndicator.source}</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">{currentIndicator.question}</h3>
            <div className="text-gray-600 mb-6">
              <p>{currentIndicator.description}</p>
            </div>
            <Link
              href={`/visualizations/${currentIndicator.id}`}
              className="text-africa-green hover:underline flex items-center"
            >
              Explore and learn more about this data
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="col-span-12 md:col-span-8">
            <div className="bg-gray-100 rounded-lg h-80 flex items-center justify-center">
              <Image
                src={currentIndicator.chartUrl || "/placeholder.svg"}
                alt={currentIndicator.title}
                width={850}
                height={600}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
