"use client"

import Link from "next/link"

export default function AccessGate() {
  return (
    <section className="relative min-h-[100vh] overflow-hidden">
      {/* Background gradient + subtle pattern */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(34,139,34,0.9) 0%, rgba(0,100,0,0.8) 50%, rgba(46,125,50,0.9) 100%), url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 1000'%3E%3Cdefs%3E%3Cpattern id='leaves' x='0' y='0' width='200' height='200' patternUnits='userSpaceOnUse'%3E%3Ccircle cx='50' cy='50' r='30' fill='rgba(255,255,255,0.1)'/%3E%3Ccircle cx='150' cy='100' r='25' fill='rgba(255,255,255,0.08)'/%3E%3Ccircle cx='100' cy='150' r='20' fill='rgba(255,255,255,0.06)'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23leaves)'/%3E%3C/svg%3E\")",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      />

      {/* Floating elements */}
      <div className="pointer-events-none absolute inset-0 z-[1]">
        <span className="absolute left-[10%] top-[20%] h-20 w-20 animate-[float_6s_ease-in-out_infinite] rounded-full bg-white/10" />
        <span className="absolute right-[15%] top-[60%] h-14 w-14 animate-[float_6s_ease-in-out_infinite] rounded-full bg-white/10 [animation-delay:2s]" />
        <span className="absolute bottom-[30%] left-[20%] h-24 w-24 animate-[float_6s_ease-in-out_infinite] rounded-full bg-white/10 [animation-delay:4s]" />
      </div>

      {/* Content */}
      <div className="relative z-[2] mx-auto max-w-[1200px] px-6 py-10 text-center text-white">
        <h1 className="mb-4 text-4xl font-extrabold drop-shadow-md sm:text-5xl">
          {"🌍 Africa Climate & Nature Data Platform"}
        </h1>
        <p className="mx-auto mb-6 max-w-xl text-lg font-light text-white/90">
          {"Bridging Climate Science with Data Analytics"}
        </p>

        <div className="mx-auto mb-6 max-w-[350px] rounded-lg border-2 border-amber-400 bg-amber-300/95 p-4 text-center font-bold text-gray-800 shadow-[0_4px_15px_rgba(255,193,7,0.4)]">
          <div className="mb-1 text-xl">{"⚠️"}</div>
          <div>{"This beta version of the platform is currently only available to select users."}</div>
        </div>

        <div className="mx-auto mb-10 max-w-[600px] rounded-2xl border border-white/20 bg-white/95 p-8 text-gray-700 shadow-xl backdrop-blur">
          <h2 className="bg-gradient-to-r from-green-700 to-green-500 bg-clip-text text-3xl font-extrabold text-transparent">
            {"Thank You for Visiting Us!"}
          </h2>
          <p className="mt-4 text-lg leading-8">
            {
              "We appreciate your interest in our groundbreaking platform that integrates Africa's climate data with biodiversity insights to drive evidence-based conservation and climate adaptation strategies across the continent."
            }
          </p>
        </div>

        {/* Feature cards */}
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="cursor-pointer rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:bg-white/20 hover:shadow-2xl">
            <div className="mb-2 text-3xl">{"🌡️"}</div>
            <h3 className="mb-1 text-lg font-semibold">{"Climate Data"}</h3>
            <p className="text-white/80">
              {"Real-time climate data analysis and long-term trend forecasting across African regions"}
            </p>
          </div>
          <div className="cursor-pointer rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:bg-white/20 hover:shadow-2xl">
            <div className="mb-2 text-3xl">{"📊"}</div>
            <h3 className="mb-1 text-lg font-semibold">{"Analytics Dashboard"}</h3>
            <p className="text-white/80">
              {"Interactive data visualization and insights dashboard for climate and nature analytics"}
            </p>
          </div>
          <div className="cursor-pointer rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:bg-white/20 hover:shadow-2xl">
            <div className="mb-2 text-3xl">{"🌿"}</div>
            <h3 className="mb-1 text-lg font-semibold">{"Nature-Climate Interface"}</h3>
            <p className="text-white/80">
              {"Comprehensive analysis of how climate change affects African ecosystems and biodiversity"}
            </p>
          </div>
        </div>

        {/* Contact */}
        <div className="mt-12">
          <h3 className="mb-2 text-2xl font-semibold">{"Interested in Learning More?"}</h3>
          <p className="mx-auto mb-6 max-w-xl text-white/90">
            {"Connect with our team to discuss partnership opportunities and future access to our platform."}
          </p>
          <a
            href={
              "mailto:reubenmuwhindi@gmail.com?subject=Africa%20Climate%20%26%20Nature%20Data%20Platform%20-%20Inquiry"
            }
            className="inline-block rounded-full bg-gradient-to-br from-green-600 to-green-500 px-6 py-3 font-semibold text-white shadow-[0_4px_15px_rgba(76,175,80,0.3)] transition-all hover:-translate-y-0.5 hover:from-green-500 hover:to-green-600 hover:shadow-[0_8px_25px_rgba(76,175,80,0.4)]"
          >
            {"Get in Touch"}
          </a>

          <div className="mt-6 text-white/90">
            {/* Optional: link to sign-in for invited testers */}
            <Link href="/sign-in" className="underline decoration-white/60 underline-offset-4 hover:text-white">
              {"Have access? Sign in"}
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="pointer-events-auto absolute bottom-8 left-1/2 z-[2] -translate-x-1/2 animate-bounce text-white/80">
        <span className="text-2xl">{"↓"}</span>
      </div>

      {/* keyframes */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </section>
  )
}
