"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

// Define the topic structure to match what's used in all-topics.tsx
interface Subtopic {
  name: string
  slug: string
}

interface Topic {
  name: string
  slug: string
  subtopics: Subtopic[]
}

// Sample data structure for Temperature Trends with 10 subtopics
const topicsData: Topic[] = [
  {
    name: "Temperature Trends",
    slug: "temperature-trends",
    subtopics: [
      { name: "Global Temperature Rise", slug: "global-temperature-rise" },
      { name: "Regional Variations", slug: "regional-variations" },
      { name: "Urban Heat Islands", slug: "urban-heat-islands" },
      { name: "Ocean Temperature", slug: "ocean-temperature" },
      { name: "Temperature Extremes", slug: "temperature-extremes" },
      { name: "Historical Records", slug: "historical-records" },
      { name: "Seasonal Patterns", slug: "seasonal-patterns" },
      { name: "Night vs Day Temperatures", slug: "night-vs-day-temperatures" },
      { name: "Temperature Projections", slug: "temperature-projections" },
      { name: "Temperature Impacts", slug: "temperature-impacts" },
    ],
  },
  {
    name: "Rainfall Patterns",
    slug: "rainfall-patterns",
    subtopics: [
      { name: "Precipitation Changes", slug: "precipitation-changes" },
      { name: "Drought Trends", slug: "drought-trends" },
      { name: "Flooding Events", slug: "flooding-events" },
      { name: "Seasonal Rainfall", slug: "seasonal-rainfall" },
    ],
  },
  {
    name: "Greenhouse Gas Emissions",
    slug: "greenhouse-gas-emissions",
    subtopics: [
      { name: "Carbon Dioxide", slug: "carbon-dioxide" },
      { name: "Methane", slug: "methane" },
      { name: "Nitrous Oxide", slug: "nitrous-oxide" },
      { name: "Emissions by Sector", slug: "emissions-by-sector" },
    ],
  },
  {
    name: "Renewable Energy",
    slug: "renewable-energy",
    subtopics: [
      { name: "Solar Power", slug: "solar-power" },
      { name: "Wind Energy", slug: "wind-energy" },
      { name: "Hydropower", slug: "hydropower" },
      { name: "Geothermal", slug: "geothermal" },
    ],
  },
  {
    name: "Climate Impacts",
    slug: "climate-impacts",
    subtopics: [
      { name: "Agriculture", slug: "agriculture" },
      { name: "Water Resources", slug: "water-resources" },
      { name: "Health", slug: "health" },
      { name: "Biodiversity", slug: "biodiversity" },
    ],
  },
]

interface TopicsDropdownProps {
  className?: string
}

export default function TopicsDropdown({ className }: TopicsDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredTopic, setHoveredTopic] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  // Check if any topic is active
  const hasActiveTopic = topicsData.some(
    (topic) =>
      pathname.includes(`/topics/${topic.slug}`) ||
      topic.subtopics.some((subtopic) => pathname.includes(`/topics/${topic.slug}/${subtopic.slug}`)),
  )

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      <button
        className={cn(
          "flex items-center text-sm hover:text-green-200 focus:outline-none transition-colors",
          hasActiveTopic ? "text-green-200 font-medium" : "",
        )}
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="mr-1">≡</span> Browse by topic <ChevronDown className="ml-1 h-4 w-4" />
      </button>

      {isOpen && (
        <div
          className="absolute left-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 flex flex-col md:flex-row max-w-screen-sm"
          onMouseLeave={() => setIsOpen(false)}
          role="menu"
          aria-orientation="vertical"
        >
          <div className="w-full md:w-64 border-r border-gray-200">
            {topicsData.map((topic) => (
              <div
                key={topic.slug}
                className={cn(
                  "px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer",
                  hoveredTopic === topic.slug ? "bg-gray-100" : "",
                  pathname.includes(`/topics/${topic.slug}`) ? "bg-gray-100 font-medium" : "",
                )}
                onMouseEnter={() => setHoveredTopic(topic.slug)}
                onClick={() => {
                  setIsOpen(false)
                  setHoveredTopic(null)
                }}
              >
                <Link href={`/topics/${topic.slug}`} className="block font-medium">
                  {topic.name}
                </Link>
              </div>
            ))}
          </div>

          {hoveredTopic && (
            <div className="w-full md:w-64 p-4 max-h-80 overflow-y-auto">
              <h3 className="font-medium text-sm text-gray-900 mb-3">
                {topicsData.find((t) => t.slug === hoveredTopic)?.name}
              </h3>
              <div className="space-y-2">
                <ul className="space-y-1">
                  {topicsData
                    .find((t) => t.slug === hoveredTopic)
                    ?.subtopics.map((subtopic) => (
                      <li key={subtopic.slug}>
                        <Link
                          href={`/topics/${hoveredTopic}/${subtopic.slug}`}
                          className="text-sm text-gray-600 hover:text-[#0A5D22] hover:underline"
                          onClick={() => setIsOpen(false)}
                        >
                          {subtopic.name}
                        </Link>
                      </li>
                    ))}
                </ul>
                <Link
                  href={`/topics/${hoveredTopic}`}
                  className="block text-sm text-[#0A5D22] hover:underline mt-3"
                  onClick={() => setIsOpen(false)}
                >
                  Explore this topic →
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
