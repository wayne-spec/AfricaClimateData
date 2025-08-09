import Image from "next/image"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Clock, User, Calendar, Share2, Bookmark, Printer } from "lucide-react"
import { Button } from "@/components/ui/button"

// Sample article data
const article = {
  id: "carbon-budget-africa",
  title: "Africa's Carbon Budget in a 1.5°C World",
  excerpt:
    "How much carbon can African nations emit while still keeping global warming below 1.5°C? This article examines the concept of carbon budgets and their implications for African development.",
  author: "Dr. Ngozi Okonjo",
  date: "2023-06-15",
  readTime: 12,
  imageUrl: "/placeholder.svg?height=600&width=1200",
  topicId: "co2-emissions",
}

export default function ArticlePage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <article className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[#002147]">{article.title}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>
                  {new Date(article.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{article.readTime} min read</span>
              </div>
            </div>

            <div className="flex space-x-2 mb-8">
              <Button variant="outline" size="sm" className="flex items-center">
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </Button>
              <Button variant="outline" size="sm" className="flex items-center">
                <Bookmark className="h-4 w-4 mr-1" />
                Save
              </Button>
              <Button variant="outline" size="sm" className="flex items-center">
                <Printer className="h-4 w-4 mr-1" />
                Print
              </Button>
            </div>

            <div className="relative h-64 md:h-96 mb-8">
              <Image
                src={article.imageUrl || "/placeholder.svg"}
                alt={article.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </header>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl font-medium mb-6">{article.excerpt}</p>

            <h2>Understanding Carbon Budgets</h2>

            <p>
              The concept of a carbon budget is based on the scientific understanding that there is a finite amount of
              carbon dioxide that can be emitted into the atmosphere before a certain temperature threshold is crossed.
              For the Paris Agreement goal of limiting warming to 1.5°C above pre-industrial levels, the global carbon
              budget is rapidly depleting.
            </p>

            <p>
              As of 2023, estimates suggest that the world has approximately 400 gigatonnes of CO2 left to emit to have
              a 67% chance of staying below 1.5°C of warming. At current emission rates of about 40 gigatonnes per year,
              this budget would be exhausted in just 10 years.
            </p>

            <h2>Africa's Unique Position</h2>

            <p>
              African nations face a profound dilemma. Collectively, they have contributed less than 4% of historical
              global emissions, yet they face some of the most severe impacts of climate change. At the same time, many
              African countries are seeking to industrialize and develop their economies, which traditionally has been
              associated with increased carbon emissions.
            </p>

            <blockquote>
              "The question of how to allocate the remaining global carbon budget is not just technical but deeply
              ethical. It involves considerations of historical responsibility, current capabilities, and future
              development needs." — Dr. Youba Sokona, IPCC Vice-Chair
            </blockquote>

            <h2>Approaches to Carbon Budget Allocation</h2>

            <p>Several approaches have been proposed for allocating the remaining carbon budget among nations:</p>

            <ul>
              <li>
                <strong>Equal Per Capita:</strong> Dividing the remaining budget equally among all people globally.
              </li>
              <li>
                <strong>Historical Responsibility:</strong> Allocating less to nations that have already used more than
                their fair share historically.
              </li>
              <li>
                <strong>Development Needs:</strong> Providing larger allocations to developing nations to enable
                economic growth.
              </li>
              <li>
                <strong>Ability to Pay:</strong> Expecting greater mitigation efforts from wealthier nations.
              </li>
            </ul>

            <p>
              Under most equitable allocation frameworks, African nations would be entitled to a larger share of the
              remaining carbon budget than their current emission trajectories would use. This creates potential for
              either greater development headroom or for selling unused carbon allowances in international carbon
              markets.
            </p>

            <h2>Implications for African Development</h2>

            <p>
              The carbon budget constraint raises critical questions about development pathways for African nations.
              Traditional development models followed by today's wealthy nations involved carbon-intensive
              industrialization. However, technological advances now make it possible to consider alternative,
              lower-carbon development paths.
            </p>

            <p>
              Renewable energy presents a particular opportunity. Africa has abundant solar, wind, and hydroelectric
              resources that could power development while keeping emissions low. The continent receives more hours of
              sunshine than any other, and the cost of solar power has fallen by more than 80% over the past decade.
            </p>

            <h2>Policy Recommendations</h2>

            <p>
              Based on our analysis, we recommend the following approaches for African policymakers and international
              partners:
            </p>

            <ol>
              <li>
                Advocate for carbon budget allocations that recognize historical responsibility and development needs
              </li>
              <li>Invest heavily in renewable energy infrastructure to enable low-carbon development</li>
              <li>Develop carbon pricing mechanisms that can monetize unused carbon budget allocations</li>
              <li>Secure climate finance to support technological leapfrogging</li>
              <li>Strengthen capacity for carbon accounting and emissions management</li>
            </ol>

            <h2>Conclusion</h2>

            <p>
              The concept of carbon budgets makes clear the scale and urgency of the climate challenge. For African
              nations, it highlights both the injustice of historical emissions patterns and the need to chart new
              development pathways. With appropriate policies and international support, Africa could turn the carbon
              budget constraint into an opportunity for sustainable development that improves lives while protecting the
              climate.
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-xl font-bold mb-4">About the author</h3>
            <div className="flex items-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full mr-4"></div>
              <div>
                <p className="font-bold">{article.author}</p>
                <p className="text-gray-600">Climate Policy Researcher at African Climate Research Institute</p>
              </div>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  )
}
