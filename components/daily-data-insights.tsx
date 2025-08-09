"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  ScatterChart,
  Scatter,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

// Updated insights with African climate and nature focus
const insights = [
  {
    id: "sahel-rainfall-decline",
    title: "Sahel rainfall has declined by 20-30% since the 1970s",
    date: "TODAY",
    chartType: "line",
    excerpt:
      "The Sahel region has experienced significant rainfall decline over the past five decades, with serious implications for agriculture and water security.",
    content:
      "Analysis of long-term precipitation data shows a persistent decline in annual rainfall across the Sahel belt, with the most severe reductions occurring in Mali, Niger, and Chad.",
    keyFinding: "-27%",
    keyFindingLabel: "Average rainfall reduction since 1970",
    data: [
      { year: "1960", rainfall: 100 },
      { year: "1970", rainfall: 95 },
      { year: "1980", rainfall: 80 },
      { year: "1990", rainfall: 75 },
      { year: "2000", rainfall: 70 },
      { year: "2010", rainfall: 73 },
      { year: "2020", rainfall: 73 },
    ],
    colors: ["#1d3d63", "#60a5fa"],
  },
  {
    id: "renewable-energy-growth",
    title: "Solar capacity in Africa has grown tenfold in the last decade",
    date: "YESTERDAY",
    chartType: "area",
    excerpt:
      "African nations are rapidly expanding their solar energy capacity, with total installed capacity increasing from less than 1 GW in 2010 to over 10 GW today.",
    content:
      "Morocco, South Africa, and Egypt lead the continent in solar deployment, with several other countries launching ambitious projects.",
    keyFinding: "10x",
    keyFindingLabel: "Increase in solar capacity since 2010",
    data: [
      { year: "2010", capacity: 1 },
      { year: "2012", capacity: 1.5 },
      { year: "2014", capacity: 2.5 },
      { year: "2016", capacity: 4 },
      { year: "2018", capacity: 6.5 },
      { year: "2020", capacity: 8.5 },
      { year: "2022", capacity: 10.2 },
    ],
    colors: ["#1d3d63", "#60a5fa"],
  },
  {
    id: "lake-chad-shrinking",
    title: "Lake Chad has lost 90% of its surface area since the 1960s",
    date: "2 DAYS AGO",
    chartType: "bar",
    excerpt:
      "Once one of Africa's largest lakes, Lake Chad has dramatically shrunk due to climate change, irrigation demands, and population growth.",
    content:
      "Satellite imagery analysis confirms the lake's surface area has decreased from approximately 25,000 km² in the 1960s to less than 2,500 km² today.",
    keyFinding: "90%",
    keyFindingLabel: "Reduction in lake surface area",
    data: [
      { year: "1960", area: 25000 },
      { year: "1970", area: 20000 },
      { year: "1980", area: 12000 },
      { year: "1990", area: 7000 },
      { year: "2000", area: 4000 },
      { year: "2010", area: 2800 },
      { year: "2020", area: 2500 },
    ],
    colors: ["#1d3d63"],
  },
  {
    id: "deforestation-congo-basin",
    title: "Congo Basin loses forest area equivalent to Belgium every two years",
    date: "3 DAYS AGO",
    chartType: "line",
    excerpt:
      "The Congo Basin, Earth's second-largest rainforest, is experiencing accelerating deforestation rates, threatening biodiversity and carbon storage.",
    content:
      "Annual forest loss has increased from approximately 1.5 million hectares in 2000 to over 3 million hectares in recent years.",
    keyFinding: "3M ha",
    keyFindingLabel: "Annual forest loss",
    data: [
      { year: "2000", loss: 1.5 },
      { year: "2005", loss: 1.8 },
      { year: "2010", loss: 2.2 },
      { year: "2015", loss: 2.5 },
      { year: "2020", loss: 2.8 },
      { year: "2022", loss: 3.1 },
    ],
    colors: ["#ce261e"],
  },
  {
    id: "coastal-erosion-west-africa",
    title: "West African coastlines eroding at up to 10 meters per year",
    date: "4 DAYS AGO",
    chartType: "scatter",
    excerpt:
      "Coastal erosion is accelerating along West Africa's Atlantic coast, threatening communities, infrastructure, and ecosystems.",
    content:
      "Data from satellite monitoring shows erosion rates of 5-10 meters annually in the most affected areas of Senegal, Togo, Benin, and Nigeria.",
    keyFinding: "10m",
    keyFindingLabel: "Maximum annual coastal retreat",
    data: [
      { country: "Senegal", erosion: 8.5, population: 18 },
      { country: "Togo", erosion: 10, population: 8.5 },
      { country: "Benin", erosion: 9.5, population: 12.5 },
      { country: "Nigeria", erosion: 7, population: 206 },
      { country: "Ghana", erosion: 5.5, population: 32 },
      { country: "Côte d'Ivoire", erosion: 6.5, population: 27 },
    ],
    colors: ["#1d3d63", "#60a5fa"],
  },
]

export default function DailyDataInsights() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [containerWidth, setContainerWidth] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  // Handle resize and determine if mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      if (scrollContainerRef.current) {
        setContainerWidth(scrollContainerRef.current.clientWidth)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Scroll to a specific card
  const scrollToCard = (index: number) => {
    if (isAnimating) return

    setIsAnimating(true)
    if (scrollContainerRef.current) {
      const newIndex = Math.max(0, Math.min(index, insights.length - 1))
      setActiveIndex(newIndex)

      scrollContainerRef.current.scrollTo({
        left: newIndex * containerWidth,
        behavior: "smooth",
      })

      // Reset animation flag after transition
      setTimeout(() => {
        setIsAnimating(false)
      }, 500)
    }
  }

  // Scroll to next or previous card
  const scrollNext = () => {
    scrollToCard(activeIndex + 1)
  }

  const scrollPrev = () => {
    scrollToCard(activeIndex - 1)
  }

  // Handle scroll end detection
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const handleScroll = () => {
      if (isAnimating) return

      const scrollPosition = container.scrollLeft
      const cardWidth = containerWidth
      const newIndex = Math.round(scrollPosition / cardWidth)

      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex)
      }
    }

    container.addEventListener("scroll", handleScroll)
    return () => container.removeEventListener("scroll", handleScroll)
  }, [activeIndex, containerWidth, isAnimating])

  // Render the appropriate chart based on chart type
  const renderChart = (insight: (typeof insights)[0]) => {
    const { chartType, data, colors } = insight

    switch (chartType) {
      case "line":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis
                dataKey={data[0].hasOwnProperty("year") ? "year" : "country"}
                tick={{ fill: "#666", fontSize: 12 }}
              />
              <YAxis tick={{ fill: "#666", fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  borderRadius: "4px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                }}
              />
              <Line
                type="monotone"
                dataKey={Object.keys(data[0]).find((key) => key !== "year" && key !== "country") || ""}
                stroke={colors[0]}
                strokeWidth={3}
                dot={{ r: 4, fill: colors[0] }}
                activeDot={{ r: 6, fill: colors[0] }}
                animationDuration={1500}
              />
            </LineChart>
          </ResponsiveContainer>
        )

      case "bar":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis
                dataKey={data[0].hasOwnProperty("year") ? "year" : "country"}
                tick={{ fill: "#666", fontSize: 12 }}
              />
              <YAxis tick={{ fill: "#666", fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  borderRadius: "4px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                }}
              />
              <Bar
                dataKey={Object.keys(data[0]).find((key) => key !== "year" && key !== "country") || ""}
                fill={colors[0]}
                animationDuration={1500}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        )

      case "area":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis
                dataKey={data[0].hasOwnProperty("year") ? "year" : "country"}
                tick={{ fill: "#666", fontSize: 12 }}
              />
              <YAxis tick={{ fill: "#666", fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  borderRadius: "4px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                }}
              />
              <Area
                type="monotone"
                dataKey={Object.keys(data[0]).find((key) => key !== "year" && key !== "country") || ""}
                stroke={colors[0]}
                fill={colors[0]}
                fillOpacity={0.6}
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
        )

      case "scatter":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis
                dataKey="erosion"
                name="Erosion (m/year)"
                tick={{ fill: "#666", fontSize: 12 }}
                label={{ value: "Erosion (m/year)", position: "bottom", fill: "#666", fontSize: 12 }}
              />
              <YAxis
                dataKey="population"
                name="Population (millions)"
                tick={{ fill: "#666", fontSize: 12 }}
                label={{ value: "Population (M)", angle: -90, position: "left", fill: "#666", fontSize: 12 }}
              />
              <Tooltip
                cursor={{ strokeDasharray: "3 3" }}
                contentStyle={{
                  backgroundColor: "white",
                  borderRadius: "4px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                }}
                formatter={(value, name) => [`${value}`, name === "erosion" ? "Erosion (m/year)" : "Population (M)"]}
                labelFormatter={(value) => {
                  // Fix: Safely access the country property
                  if (typeof value === "number" && value >= 0 && value < data.length) {
                    return data[value].country || "Unknown"
                  }
                  return "Unknown"
                }}
              />
              <Scatter name="Countries" data={data} fill={colors[0]} animationDuration={1500}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[0]} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        )

      default:
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis
                dataKey={data[0].hasOwnProperty("year") ? "year" : "country"}
                tick={{ fill: "#666", fontSize: 12 }}
              />
              <YAxis tick={{ fill: "#666", fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  borderRadius: "4px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                }}
              />
              <Line
                type="monotone"
                dataKey={Object.keys(data[0]).find((key) => key !== "year" && key !== "country") || ""}
                stroke={colors[0]}
                strokeWidth={3}
                animationDuration={1500}
              />
            </LineChart>
          </ResponsiveContainer>
        )
    }
  }

  return (
    <section className="py-12 bg-white overflow-hidden relative">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#002147]">Daily Data Insights</h2>
            <p className="text-gray-600">
              Bite-sized insights on Africa's changing climate and environment, published every weekday.
            </p>
          </div>
          <Link
            href="/insights/daily"
            className="inline-flex items-center text-[#ce261e] border border-[#ce261e] px-4 py-2 rounded hover:bg-[#0A5D22] hover:text-white hover:border-[#0A5D22] transition-colors"
          >
            See all Daily Data Insights
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        {/* Navigation indicators */}
        <div className="flex justify-center mb-4">
          <div className="flex space-x-2">
            {insights.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToCard(index)}
                className={`w-2.5 h-2.5 rounded-full focus:outline-none transition-colors ${
                  activeIndex === index ? "bg-[#002147]" : "bg-gray-300"
                }`}
                aria-label={`Go to insight ${index + 1}`}
                aria-current={activeIndex === index ? "true" : "false"}
              />
            ))}
          </div>
        </div>

        {/* Navigation arrows positioned on sides */}
        <div className="relative">
          {/* Left arrow */}
          <button
            onClick={scrollPrev}
            disabled={activeIndex === 0 || isAnimating}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-md text-gray-700 hover:bg-gray-100 disabled:opacity-0 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#002147] ${
              activeIndex === 0 ? "opacity-0" : "opacity-100"
            }`}
            aria-label="Previous insight"
            style={{ transform: "translate(-50%, -50%)" }}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Right arrow */}
          <button
            onClick={scrollNext}
            disabled={activeIndex === insights.length - 1 || isAnimating}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-md text-gray-700 hover:bg-gray-100 disabled:opacity-0 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#002147] ${
              activeIndex === insights.length - 1 ? "opacity-0" : "opacity-100"
            }`}
            aria-label="Next insight"
            style={{ transform: "translate(50%, -50%)" }}
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Horizontally scrollable container */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-hidden snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {insights.map((insight, index) => (
              <div key={insight.id} className="flex-shrink-0 w-full snap-center" style={{ scrollSnapAlign: "center" }}>
                <div className="bg-[#f5f7ff] rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg mx-auto max-w-5xl">
                  <div className="flex flex-col md:flex-row">
                    {/* Chart section */}
                    <div className="md:w-1/2 h-64 md:h-auto p-4 relative">
                      <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded z-10">
                        {insight.date}
                      </div>
                      <div className="w-full h-full">{renderChart(insight)}</div>
                    </div>

                    {/* Content section */}
                    <div className="p-6 md:w-1/2 flex flex-col">
                      <h3 className="text-xl font-bold text-[#002147] mb-3">{insight.title}</h3>

                      <div className="bg-white/60 rounded-lg p-4 mb-4 border border-blue-100">
                        <div className="text-4xl md:text-5xl font-bold text-[#ce261e]">{insight.keyFinding}</div>
                        <div className="text-sm text-gray-600">{insight.keyFindingLabel}</div>
                      </div>

                      <p className="text-gray-700 mb-3">{insight.excerpt}</p>
                      <p className="text-gray-700 mb-4">{insight.content}</p>

                      <div className="mt-auto">
                        <Link
                          href={`/insights/${insight.id}`}
                          className="inline-flex items-center text-[#1d3d63] hover:underline font-medium"
                        >
                          Continue reading
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            href="/insights/daily"
            className="inline-flex items-center text-[#ce261e] border border-[#ce261e] px-4 py-2 rounded hover:bg-[#0A5D22] hover:text-white hover:border-[#0A5D22] transition-colors"
          >
            See all Daily Data Insights
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>

      <style jsx>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        /* Hide scrollbar for IE, Edge and Firefox */
        .scrollbar-hide {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>
    </section>
  )
}
