import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import CookieBanner from "@/components/cookie-banner"

export default function MissionPage() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Header */}
      <Navbar />

      {/* Hero Section */}
      <div className="bg-[#0A5D22] text-white py-16 relative">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/placeholder.svg?height=600&width=1200"
            alt="World map visualization"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-center max-w-4xl mx-auto mb-6">
            Our Mission: Empowering Climate Action Across Africa
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto">
            Making climate data accessible, understandable, and actionable for a more resilient Africa
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#1d3d63] mb-6">Why We Exist</h2>
            <p className="text-lg text-gray-700 mb-4">
              The Africa Climate Data Platform was founded with a clear purpose: to address the critical gap in
              accessible, reliable climate data for the African continent. We believe that informed decision-making is
              the foundation of effective climate action.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              Climate change presents unique challenges for Africa's diverse ecosystems, economies, and communities. By
              providing comprehensive data and research, we aim to empower policymakers, researchers, educators,
              journalists, and citizens with the knowledge they need to build a more sustainable and resilient future.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#1d3d63] mb-6">Our Core Principles</h2>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-[#1d3d63] mb-3">Open Access</h3>
              <p className="text-lg text-gray-700">
                All our data, visualizations, and research are freely available to everyone. We believe that knowledge
                about climate change should not be behind paywalls or restricted to academic institutions.
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-[#1d3d63] mb-3">Data Integrity</h3>
              <p className="text-lg text-gray-700">
                We are committed to accuracy, transparency, and rigor in our data collection and analysis. Every chart,
                map, and table is meticulously researched and includes clear documentation of sources and methodologies.
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-[#1d3d63] mb-3">African Focus</h3>
              <p className="text-lg text-gray-700">
                While global perspectives are important, we prioritize data and research that is relevant to African
                contexts, challenges, and opportunities. We work to highlight regional variations and local impacts.
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-[#1d3d63] mb-3">Accessibility</h3>
              <p className="text-lg text-gray-700">
                Complex climate data should be understandable to everyone. We strive to present information in clear,
                visual formats with explanatory context that makes the data meaningful and actionable.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#1d3d63] mb-6">Our Impact</h2>
            <p className="text-lg text-gray-700 mb-4">
              The Africa Climate Data Platform serves diverse stakeholders across the continent and beyond:
            </p>
            <ul className="list-disc pl-6 text-lg text-gray-700 space-y-3">
              <li>
                <span className="font-semibold">Policymakers</span> use our data to develop evidence-based climate
                policies and adaptation strategies.
              </li>
              <li>
                <span className="font-semibold">Researchers</span> build upon our open datasets to advance climate
                science and solutions.
              </li>
              <li>
                <span className="font-semibold">Educators</span> incorporate our visualizations into curricula to teach
                about climate change.
              </li>
              <li>
                <span className="font-semibold">Journalists</span> rely on our data to report accurately on climate
                trends and impacts.
              </li>
              <li>
                <span className="font-semibold">Communities</span> access information relevant to local climate risks
                and adaptation options.
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#1d3d63] mb-6">Join Our Mission</h2>
            <p className="text-lg text-gray-700 mb-6">
              The challenges of climate change require collaborative efforts. Here's how you can contribute to our
              mission:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-[#1d3d63] mb-3">Support Our Work</h3>
                <p className="text-gray-700 mb-4">
                  As a non-profit organization, we rely on donations and grants to maintain our independence and
                  continue providing free access to climate data.
                </p>
                <Link
                  href="/donate"
                  className="inline-block bg-[#1d3d63] text-white px-4 py-2 rounded hover:bg-[#152d4a] transition-colors"
                >
                  Donate Now
                </Link>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-[#1d3d63] mb-3">Collaborate With Us</h3>
                <p className="text-gray-700 mb-4">
                  We welcome partnerships with research institutions, government agencies, NGOs, and other organizations
                  working on climate issues in Africa.
                </p>
                <Link
                  href="/contact"
                  className="inline-block bg-[#1d3d63] text-white px-4 py-2 rounded hover:bg-[#152d4a] transition-colors"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Cookie Banner */}
      <CookieBanner />
    </main>
  )
}
