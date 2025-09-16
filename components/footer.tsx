import Link from "next/link"
import Image from "next/image"
import { Mail, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <Image
                src="/images/logo.png"
                alt="Africa Climate Data Platform"
                width={40}
                height={40}
                className="h-8 w-auto"
              />
              <span className="ml-2 text-xl font-bold">Africa Climate Data Platform</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Bridging climate science with data analytics to drive evidence-based conservation and climate adaptation
              strategies across Africa.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-gray-300">
                <Mail className="h-4 w-4 mr-2" />
                <span>reubenmuwhindi@gmail.com</span>
              </div>
              <div className="flex items-center text-gray-300">
                <MapPin className="h-4 w-4 mr-2" />
                <span>Nairobi, Kenya</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/dashboards" className="text-gray-300 hover:text-white transition-colors">
                  Dashboards
                </Link>
              </li>
              <li>
                <Link href="/data" className="text-gray-300 hover:text-white transition-colors">
                  Data
                </Link>
              </li>
              <li>
                <Link href="/insights" className="text-gray-300 hover:text-white transition-colors">
                  Insights
                </Link>
              </li>
              <li>
                <Link href="/mission" className="text-gray-300 hover:text-white transition-colors">
                  Mission
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/topics" className="text-gray-300 hover:text-white transition-colors">
                  Topics
                </Link>
              </li>
              <li>
                <Link href="/articles" className="text-gray-300 hover:text-white transition-colors">
                  Articles
                </Link>
              </li>
              <li>
                <Link href="/visualizations" className="text-gray-300 hover:text-white transition-colors">
                  Visualizations
                </Link>
              </li>
              <li>
                <Link href="/nature-data" className="text-gray-300 hover:text-white transition-colors">
                  Nature Data
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2024 Africa Climate Data Platform. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
