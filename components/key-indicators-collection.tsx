"use client"

import { useState } from "react"
import KeyIndicator from "@/components/key-indicator"
import { visualizations } from "@/lib/data"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function KeyIndicatorsCollection() {
  // State to track which indicator is open
  const [openIndicatorIndex, setOpenIndicatorIndex] = useState<number | null>(0) // Default first one open

  // Get a few visualizations to use as key indicators
  const temperatureViz = visualizations.find((v) => v.id === "africa-temperature-anomalies")
  const rainfallViz = visualizations.find((v) => v.id === "africa-rainfall-trends")
  const waterStressViz = visualizations.find((v) => v.id === "africa-water-stress")
  const renewableViz = visualizations.find((v) => v.id === "africa-renewable-capacity")

  // Function to handle toggling indicators
  const handleToggle = (index: number) => {
    if (openIndicatorIndex === index) {
      setOpenIndicatorIndex(null) // Close if already open
    } else {
      setOpenIndicatorIndex(index) // Open the clicked one, closing others
    }
  }

  return (
    <div className="space-y-6 w-full overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold" style={{ color: "rgb(29, 61, 99)" }}>
            Explore our data
          </h2>
          <p className="text-gray-600">Featured data from our collection of interactive visualizations.</p>
        </div>
        <Link href="/data" className="text-africa-red hover:underline flex items-center">
          See all our data
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>

      {temperatureViz && (
        <KeyIndicator
          title="Temperature Anomalies Across African Regions"
          source="Africa Climate Data Platform"
          description={temperatureViz.description}
          narrativeTitle="How are temperatures changing across Africa?"
          narrativeText="Temperature changes across Africa show a consistent warming trend over the past decades. This visualization reveals how different regions of Africa are experiencing climate change at varying rates, with North Africa showing the most significant temperature increases."
          visualization={temperatureViz}
          defaultOpen={openIndicatorIndex === 0}
          onToggle={() => handleToggle(0)}
        />
      )}

      {rainfallViz && (
        <KeyIndicator
          title="Rainfall Trends in African Regions"
          source="Africa Climate Data Platform"
          description={rainfallViz.description}
          narrativeTitle="How are rainfall patterns changing across Africa?"
          narrativeText="Rainfall patterns across Africa have been changing dramatically, with many regions experiencing increased variability and declining precipitation. The Sahel region has been particularly affected, with significant drought periods since the 1970s."
          visualization={rainfallViz}
          defaultOpen={openIndicatorIndex === 1}
          onToggle={() => handleToggle(1)}
        />
      )}

      {waterStressViz && (
        <KeyIndicator
          title="Water Stress Levels in African Countries"
          source="Africa Climate Data Platform"
          description={waterStressViz.description}
          narrativeTitle="Which African countries face the greatest water stress?"
          narrativeText="Water stress is becoming an increasingly critical issue across Africa as climate change affects precipitation patterns and population growth increases demand. Countries in North Africa face particularly severe water stress challenges."
          visualization={waterStressViz}
          defaultOpen={openIndicatorIndex === 2}
          onToggle={() => handleToggle(2)}
        />
      )}

      {renewableViz && (
        <KeyIndicator
          title="Renewable Energy Capacity in Africa"
          source="Africa Climate Data Platform"
          description={renewableViz.description}
          narrativeTitle="How is renewable energy capacity growing in Africa?"
          narrativeText="Africa has enormous potential for renewable energy development. This visualization shows how renewable energy capacity has been growing across different technologies, with hydropower historically dominating but solar and wind seeing rapid recent growth."
          visualization={renewableViz}
          defaultOpen={openIndicatorIndex === 3}
          onToggle={() => handleToggle(3)}
        />
      )}
    </div>
  )
}
