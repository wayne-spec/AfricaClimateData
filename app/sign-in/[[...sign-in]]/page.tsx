"use client"

import { SignIn } from "@clerk/nextjs"

export default function Page() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center p-6">
      <SignIn
        routing="path"
        path="/sign-in"
        appearance={{
          elements: {
            formButtonPrimary: "bg-green-600 hover:bg-green-700 text-white",
          },
        }}
        // After sign in, show the full site
        afterSignInUrl="/"
      />
    </div>
  )
}
