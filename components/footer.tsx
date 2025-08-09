import Link from "next/link"
import Image from "next/image"
import { Twitter, Instagram, Facebook, Linkedin, Github } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#0A5D22] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="md:flex justify-between">
          {/* Left Section: Logo + Text */}
          <div className="w-full md:w-1/3">
            <p className="mb-4">
              Africa Climate Nature Data Platform is a Data platform that focuses on Climate solutions for Africa. ,
              unless stated otherwise. Tools and software we develop are open source under the{" "}
              <span className="font-bold">MIT license</span>.
            </p>
            <p className="mb-6">
              Third-party materials, including some charts and data, are subject to third-party licenses. See our{" "}
              <Link href="/faqs" className="underline">
                FAQs
              </Link>{" "}
              for more details.
            </p>

            {/* Logos */}
            <div className="flex space-x-4">
              <Image
                src="/placeholder.svg?height=50&width=50"
                alt="Logo 1"
                width={50}
                height={50}
                className="bg-white p-1"
              />
              <Image
                src="/placeholder.svg?height=50&width=50"
                alt="Logo 2"
                width={50}
                height={50}
                className="bg-white p-1"
              />
              <Image
                src="/placeholder.svg?height=50&width=50"
                alt="Logo 3"
                width={50}
                height={50}
                className="bg-white p-1"
              />
            </div>
          </div>

          {/* Right Section: Links */}
          <div className="w-full md:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-8 mt-8 md:mt-0">
            <div>
              <h4 className="font-bold text-lg mb-4 uppercase">Explore</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/topics" className="hover:text-green-200">
                    Topics
                  </Link>
                </li>
                <li>
                  <Link href="/data" className="hover:text-green-200">
                    Data
                  </Link>
                </li>
                <li>
                  <Link href="/insights" className="hover:text-green-200">
                    Insights
                  </Link>
                </li>
              </ul>

              <h4 className="font-bold text-lg mt-6 mb-4 uppercase">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/articles" className="hover:text-green-200">
                    Latest Articles
                  </Link>
                </li>
                <li>
                  <Link href="/sdg-tracker" className="hover:text-green-200">
                    SDG Tracker
                  </Link>
                </li>
                <li>
                  <Link href="/teaching" className="hover:text-green-200">
                    Teaching Materials
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4 uppercase">About</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="hover:text-green-200">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/organization" className="hover:text-green-200">
                    Organization
                  </Link>
                </li>
                <li>
                  <Link href="/funding" className="hover:text-green-200">
                    Funding
                  </Link>
                </li>
                <li>
                  <Link href="/team" className="hover:text-green-200">
                    Team
                  </Link>
                </li>
                <li>
                  <Link href="/jobs" className="hover:text-green-200">
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link href="/faqs" className="hover:text-green-200">
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4 uppercase">RSS Feeds</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/research-and-writing" className="hover:text-green-200">
                    Research & Writing
                  </Link>
                </li>
                <li>
                  <Link href="/daily-data-insights" className="hover:text-green-200">
                    Daily Data Insights
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-4 mb-4 md:mb-0">
            <h4 className="font-bold uppercase mr-2">Follow Us</h4>
            <Link href="https://twitter.com" className="hover:text-green-200">
              <Twitter size={20} />
            </Link>
            <Link href="https://instagram.com" className="hover:text-green-200">
              <Instagram size={20} />
            </Link>
            <Link href="https://facebook.com" className="hover:text-green-200">
              <Facebook size={20} />
            </Link>
            <Link href="https://linkedin.com" className="hover:text-green-200">
              <Linkedin size={20} />
            </Link>
            <Link href="https://github.com" className="hover:text-green-200">
              <Github size={20} />
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link href="/privacy" className="hover:text-green-200">
              Privacy policy
            </Link>
            <Link href="/legal" className="hover:text-green-200">
              Legal disclaimer
            </Link>
            <Link href="/license" className="hover:text-green-200">
              Grapher license
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
