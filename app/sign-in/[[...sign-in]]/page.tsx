"use client"

import { SignIn } from "@clerk/nextjs"

export default function SignInPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-6">
        <SignIn
          afterSignInUrl="/"
          // Hide Sign Up option within the SignIn component
          appearance={{
            elements: {
              footerAction__signUp: "hidden",
            },
          }}
          signUpUrl={undefined}
        />
      </div>
    </main>
  )
}
