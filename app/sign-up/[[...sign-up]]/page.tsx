"use client"

import { SignUp } from "@clerk/nextjs"

export default function SignUpPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-6">
        <SignUp afterSignUpUrl="/" />
      </div>
    </main>
  )
}
