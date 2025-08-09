import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import TopicButton from "@/components/topic-button"
import SearchForm from "@/components/search-form"
import CookieBanner from "@/components/cookie-banner"
import { Button } from "@/components/ui/button"
import { getFeaturedArticles, getNewArticles, topics } from "@/lib/data"
import KeyIndicatorsCollection from "@/components/key-indicators-collection"
import DataExplorers from "@/components/data-explorers"
import NewsletterSubscription from "@/components/newsletter-subscription"
import AllTopics from "@/components/all-topics"
import DailyDataInsights from "@/components/daily-data-insights"

export default async function Home() {
  // Fetch data for the homepage
  const featuredArticles = await getFeaturedArticles()
  const newArticles = await getNewArticles()

  return (
    <main className="min-h-screen flex flex-col">
      {/* Header */}
      <Navbar />

      {/* Popular Pages */}
      <div className="bg-gray-100 py-2 overflow-x-auto">
        <div className="container mx-auto px-4">
          <div className="flex space-x-2 whitespace-nowrap">
            <span className="text-gray-500 text-sm font-medium py-1">POPULAR PAGES</span>
            {topics.slice(0, 9).map((topic) => (
              <TopicButton key={topic.id} label={topic.title} />
            ))}
          </div>
        </div>
      </div>

      {/* Hero Section with Search */}
      <div className="bg-[#0A5D22] text-white py-12 relative">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://ourworldindata.org/images/world.svg"
            alt="World map visualization"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#f7c020] max-w-3xl mb-8">
            Climate data and research to address Africa's environmental challenges.
          </h2>

          <SearchForm placeholder="Try 'Rainfall Sahel', 'Temperature Nigeria', 'Renewable Energy Kenya'..." />

          <p className="mt-4 text-sm text-center">
            5,000+ charts across 50+ African countries — All free: open access and open source
          </p>
        </div>
      </div>

      {/* Content Sections */}
      <div className="bg-[#0A5D22] bg-opacity-10 py-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Mission Section */}
          <div className="col-span-1">
            <h3 className="text-sm font-medium text-gray-500 mb-2">OUR MISSION</h3>
            <h2 className="text-2xl font-bold text-[#1d3d63] mb-4">
              Empowering climate action across Africa through accessible data
            </h2>
            <p className="text-gray-700 mb-4">
              To address the climate challenges facing Africa, we need reliable data and research that is accessible to
              policymakers, researchers, and communities.
            </p>
            <p className="text-gray-700 mb-6">
              The Africa Climate Data Platform makes this knowledge accessible and understandable, to empower those
              working to build a more resilient and sustainable future for the continent.
            </p>
            <Link href="/mission" className="text-[#1d3d63] hover:underline flex items-center">
              Read about our mission →
            </Link>

            <div className="mt-6 border border-gray-300 rounded p-4">
              <Button variant="outline" className="w-full mb-4">
                Subscribe to our newsletters
              </Button>
              <p className="text-sm text-gray-600 mb-4">
                We are a non-profit – all our work is free to use and open source. Consider supporting us if you find
                our work valuable.
              </p>
              <Button className="w-full bg-africa-red hover:bg-red-700 text-white">Donate to support us</Button>
            </div>
          </div>

          {/* Featured Work Section */}
          <div className="col-span-1">
            <h3 className="text-sm font-medium text-gray-500 mb-6">FEATURED WORK</h3>
            <div className="space-y-2">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="flex space-x-2">
                  <div className={`h-6 bg-orange-300 rounded`} style={{ width: `${Math.random() * 100 + 50}px` }}></div>
                  <div className={`h-6 bg-purple-400 rounded`} style={{ width: `${Math.random() * 150 + 50}px` }}></div>
                </div>
              ))}
            </div>

            {newArticles.length > 0 && (
              <div className="mt-8">
                <div className="flex items-center">
                  <span className="text-xs font-medium bg-red-100 text-red-800 px-2 py-1 rounded">NEW</span>
                  <span className="ml-2 text-xs text-gray-500">ARTICLE · {newArticles[0].readTime} MIN READ</span>
                </div>
                <h3 className="text-xl font-bold text-[#1d3d63] mt-2">
                  <Link href={`/articles/${newArticles[0].id}`} className="hover:underline">
                    {newArticles[0].title}
                  </Link>
                </h3>
                <p className="text-gray-700 mt-2">{newArticles[0].excerpt}</p>
                <p className="text-sm text-gray-500 mt-1">{newArticles[0].author}</p>
              </div>
            )}
          </div>

          {/* Classics Section */}
          <div className="col-span-1">
            {featuredArticles.length > 0 && (
              <>
                <div className="mb-8">
                  <Image
                    src="/placeholder.svg?height=300&width=500"
                    alt="Climate vulnerability data visualization for Africa"
                    width={500}
                    height={300}
                    className="rounded"
                  />
                </div>

                <h3 className="text-sm font-medium text-gray-500 mb-2">FROM OUR CLASSICS</h3>
                <h2 className="text-xl font-bold text-[#1d3d63] mb-2">
                  <Link href={`/articles/${featuredArticles[0].id}`} className="hover:underline">
                    {featuredArticles[0].title}
                  </Link>
                </h2>
                <p className="text-gray-700 mb-4">{featuredArticles[0].excerpt}</p>
                <p className="text-sm text-gray-500">{featuredArticles[0].author}</p>
              </>
            )}

            {newArticles.length > 1 && (
              <div className="mt-8">
                <Image
                  src="/placeholder.svg?height=200&width=500"
                  alt="3D visualization of temperature anomalies across Africa"
                  width={500}
                  height={200}
                  className="rounded"
                />
                <div className="mt-2">
                  <span className="text-xs text-gray-500">ARTICLE · {newArticles[1].readTime} MIN READ</span>
                  <h3 className="text-lg font-bold text-[#1d3d63] mt-1">
                    <Link href={`/articles/${newArticles[1].id}`} className="hover:underline">
                      {newArticles[1].title}
                    </Link>
                  </h3>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Daily Data Insights Section */}
      <DailyDataInsights />

      {/* Key Indicators Collection (Explore our data) */}
      <div className="bg-gray-50 py-12 home-explore-data-section">
        <div className="container mx-auto px-4">
          <KeyIndicatorsCollection />
        </div>
      </div>

      {/* Data Explorers Section - Positioned right after Key Indicators */}
      <div className="container mx-auto px-4 py-12 home-explore-data-section">
        <DataExplorers />
      </div>

      {/* All Topics Section */}
      <AllTopics />

      {/* Newsletter Subscription */}
      <NewsletterSubscription />

      {/* Footer */}
      <Footer />

      {/* Cookie Banner */}
      <CookieBanner />
    </main>
  )
}
