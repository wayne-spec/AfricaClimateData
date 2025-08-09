"use client"

import { SignUp } from "@clerk/nextjs"

export default function Page() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center p-6">
      <SignUp
        routing="path"
        path="/sign-up"
        appearance={{
          elements: {
            formButtonPrimary: "bg-green-600 hover:bg-green-700 text-white",
          },
        }}
        // After sign up, let them into the app
        afterSignUpUrl="/"
      />
    </div>
  )
}
