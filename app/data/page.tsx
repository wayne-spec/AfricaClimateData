"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import CountrySelector from "@/components/country-selector"
import { topics, visualizations } from "@/lib/data"
import { Search, ArrowRight } from "lucide-react"

export default function DataPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<string>("all")

  // Group visualizations by topic and type
  const vizByTopic: Record<string, typeof visualizations> = {}
  const charts = visualizations.filter((viz) => viz.type === "chart")
  const maps = visualizations.filter((viz) => viz.type === "map")
  const tables = visualizations.filter((viz) => viz.type === "table")

  visualizations.forEach((viz) => {
    if (!vizByTopic[viz.topicId]) {
      vizByTopic[viz.topicId] = []
    }
    vizByTopic[viz.topicId].push(viz)
  })

  // Filter visualizations based on search query and selected country
  const filteredTopics = topics.filter((topic) => {
    if (searchQuery) {
      return (
        topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        topic.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    return true
  })

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <div className="bg-[#f5f7ff] py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[#002147]">Data Catalog</h1>
          <p className="text-lg text-gray-600 mb-8">
            Search for a specific chart, or browse all our charts by area and topic.
          </p>

          <div className="relative mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search for an indicator, a topic, or a keyword..."
                  className="w-full py-3 px-4 pr-10 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1d3d63]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              <div className="md:w-auto">
                <CountrySelector onSelect={setSelectedCountry} selectedCountry={selectedCountry} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">ALL AREAS OF RESEARCH</h2>
            <div className="flex flex-wrap gap-2 mb-8">
              {topics.map((topic) => (
                <Link key={topic.id} href={`#${topic.id}`} className="text-sm text-[#1d3d63] hover:underline">
                  {topic.title} <span className="text-gray-500">({topic.chartCount})</span>
                  <span className="mx-2 text-gray-300 last:hidden">•</span>
                </Link>
              ))}
            </div>
          </div>

          {filteredTopics.map((topic) => {
            const topicVisualizations = vizByTopic[topic.id] || []
            const filteredViz = topicVisualizations

            if (filteredViz.length === 0) return null

            return (
              <div id={topic.id} key={topic.id} className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-[#1d3d63]">{topic.title}</h2>
                    <p className="text-sm text-gray-600">{topic.description}</p>
                  </div>
                  <div className="flex items-center text-[#1d3d63]">
                    <span className="mr-2">{filteredViz.length} charts</span>
                    <Link href={`/topics/${topic.id}`} className="flex items-center hover:underline">
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {filteredViz.slice(0, 4).map((viz) => (
                    <Link
                      key={viz.id}
                      href={`/visualizations/${viz.id}`}
                      className="block border border-gray-200 rounded-lg hover:shadow-md transition-all overflow-hidden"
                    >
                      <div className="bg-gray-50 p-2 h-40 flex items-center justify-center">
                        {viz.type === "chart" && (
                          <Image
                            src="/placeholder.svg?height=150&width=250"
                            alt={viz.title}
                            width={250}
                            height={150}
                            className="w-full h-full object-cover"
                          />
                        )}
                        {viz.type === "map" && (
                          <Image
                            src="/placeholder.svg?height=150&width=250"
                            alt={viz.title}
                            width={250}
                            height={150}
                            className="w-full h-full object-cover"
                          />
                        )}
                        {viz.type === "table" && (
                          <Image
                            src="/placeholder.svg?height=150&width=250"
                            alt={viz.title}
                            width={250}
                            height={150}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="p-3">
                        <h3 className="font-medium text-sm text-gray-800 mb-1 line-clamp-2">{viz.title}</h3>
                        <p className="text-xs text-gray-500 line-clamp-2">{viz.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>

                {filteredViz.length > 4 && (
                  <div className="mt-4 text-center">
                    <Link
                      href={`/topics/${topic.id}`}
                      className="inline-flex items-center text-[#1d3d63] hover:underline"
                    >
                      See all {filteredViz.length} visualizations
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                )}
              </div>
            )
          })}

          {filteredTopics.length === 0 && (
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <p className="text-gray-600">No results found for your search criteria.</p>
              <button
                className="mt-4 text-[#1d3d63] hover:underline"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCountry(null)
                }}
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}
