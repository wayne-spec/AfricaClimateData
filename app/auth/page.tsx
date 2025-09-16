"use client"

import { useState } from "react"
import { SignIn } from "@clerk/nextjs"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

export default function AuthPage() {
  const [showSignIn, setShowSignIn] = useState(false)

  return (
    <div className="min-h-screen">
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          line-height: 1.6;
          color: #333;
          overflow-x: hidden;
        }
        .hero-section {
          min-height: 100vh;
          background: linear-gradient(135deg,
              rgba(34, 139, 34, 0.9) 0%,
              rgba(0, 100, 0, 0.8) 50%,
              rgba(46, 125, 50, 0.9) 100%),
             url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><defs><pattern id="leaves" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="30" fill="rgba(255,255,255,0.1)"/><circle cx="150" cy="100" r="25" fill="rgba(255,255,255,0.08)"/><circle cx="100" cy="150" r="20" fill="rgba(255,255,255,0.06)"/></pattern></defs><rect width="100%" height="100%" fill="url(%23leaves)"/></svg>');
          background-size: cover;
          background-attachment: fixed;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .floating-elements {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 1;
        }
        .floating-element {
          position: absolute;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          animation: float 6s ease-in-out infinite;
        }
        .floating-element:nth-child(1) {
          width: 80px;
          height: 80px;
          top: 20%;
          left: 10%;
          animation-delay: 0s;
        }
        .floating-element:nth-child(2) {
          width: 60px;
          height: 60px;
          top: 60%;
          right: 15%;
          animation-delay: 2s;
        }
        .floating-element:nth-child(3) {
          width: 100px;
          height: 100px;
          bottom: 30%;
          left: 20%;
          animation-delay: 4s;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          text-align: center;
          position: relative;
          z-index: 2;
        }
        .logo {
          font-size: 3rem;
          font-weight: 800;
          color: white;
          margin-bottom: 1rem;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
          animation: slideInFromTop 1s ease-out;
        }
        .tagline {
          font-size: 1.5rem;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 2rem;
          font-weight: 300;
          animation: slideInFromLeft 1s ease-out 0.3s both;
        }
        .main-message {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          padding: 3rem;
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          margin: 2rem auto;
          max-width: 600px;
          animation: slideInFromBottom 1s ease-out 0.6s both;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .thank-you {
          font-size: 2.5rem;
          font-weight: 700;
          color: #2e7d32;
          margin-bottom: 1rem;
          background: linear-gradient(45deg, #2e7d32, #4caf50);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .message-text {
          font-size: 1.2rem;
          color: #555;
          line-height: 1.8;
          margin-bottom: 2rem;
        }
        .demo-status {
          background: linear-gradient(135deg, #ff9800, #f57c00);
          color: white;
          padding: 1rem 2rem;
          border-radius: 50px;
          font-weight: 600;
          display: inline-block;
          box-shadow: 0 4px 15px rgba(255, 152, 0, 0.3);
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        .features-preview {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin: 3rem 0;
          animation: fadeInUp 1s ease-out 0.9s both;
        }
        .feature-card {
          background: rgba(255, 255, 255, 0.1);
          padding: 2rem;
          border-radius: 15px;
          backdrop-filter: blur(5px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .feature-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.2);
          background: rgba(255, 255, 255, 0.2);
        }
        .feature-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
          display: block;
        }
        .feature-title {
          font-size: 1.3rem;
          font-weight: 600;
          color: white;
          margin-bottom: 0.5rem;
        }
        .feature-desc {
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.95rem;
        }
        .contact-section {
          margin-top: 4rem;
          animation: fadeInUp 1s ease-out 1.2s both;
        }
        .contact-title {
          font-size: 2rem;
          color: white;
          margin-bottom: 1rem;
          font-weight: 600;
        }
        .contact-text {
          color: rgba(255, 255, 255, 0.9);
          font-size: 1.1rem;
          margin-bottom: 2rem;
        }
        .contact-button {
          background: linear-gradient(135deg, #4caf50, #45a049);
          color: white;
          padding: 15px 30px;
          border: none;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-block;
          box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
          margin-right: 1rem;
        }
        .contact-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(76, 175, 80, 0.4);
          background: linear-gradient(135deg, #45a049, #4caf50);
        }
        .signin-button {
          background: linear-gradient(135deg, #2196f3, #1976d2);
          color: white;
          padding: 15px 30px;
          border: none;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-block;
          box-shadow: 0 4px 15px rgba(33, 150, 243, 0.3);
        }
        .signin-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(33, 150, 243, 0.4);
          background: linear-gradient(135deg, #1976d2, #2196f3);
        }
        @keyframes slideInFromTop {
          from {
            transform: translateY(-100px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes slideInFromLeft {
          from {
            transform: translateX(-100px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes slideInFromBottom {
          from {
            transform: translateY(100px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes fadeInUp {
          from {
            transform: translateY(50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @media (max-width: 768px) {
          .logo {
            font-size: 2rem;
          }
          .tagline {
            font-size: 1.2rem;
          }
          .main-message {
            padding: 2rem;
            margin: 1rem;
          }
          .thank-you {
            font-size: 2rem;
          }
          .features-preview {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
        }
        .scroll-indicator {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          color: rgba(255, 255, 255, 0.8);
          animation: bounce 2s infinite;
        }
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
          40% { transform: translateX(-50%) translateY(-10px); }
          60% { transform: translateX(-50%) translateY(-5px); }
        }
      `}</style>

      <section className="hero-section">
        <div className="floating-elements">
          <div className="floating-element"></div>
          <div className="floating-element"></div>
          <div className="floating-element"></div>
        </div>

        <div className="container">
          <h1 className="logo">🌍 Africa Climate & Nature Data Platform</h1>
          <p className="tagline">Bridging Climate Science with Data Analytics</p>

          <div
            style={{
              background: "rgba(255, 193, 7, 0.95)",
              color: "#333",
              padding: "1rem 1.5rem",
              borderRadius: "10px",
              margin: "1rem auto",
              maxWidth: "350px",
              fontWeight: "700",
              fontSize: "0.9rem",
              boxShadow: "0 4px 15px rgba(255, 193, 7, 0.4)",
              animation: "slideInFromLeft 1s ease-out 0.2s both",
              border: "2px solid #ffc107",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "1.2rem", marginBottom: "0.3rem" }}>⚠️</div>
            This beta version of the platform is currently only available to select users.
          </div>

          <div className="main-message">
            <h2 className="thank-you">Thank You for Visiting Us!</h2>
            <p className="message-text">
              We appreciate your interest in our groundbreaking platform that integrates Africa's climate data with
              biodiversity insights to drive evidence-based conservation and climate adaptation strategies across the
              continent.
            </p>
          </div>

          <div className="features-preview">
            <div className="feature-card">
              <span className="feature-icon">🌡️</span>
              <h3 className="feature-title">Climate Data</h3>
              <p className="feature-desc">
                Real-time climate data analysis and long-term trend forecasting across African regions
              </p>
            </div>

            <div className="feature-card">
              <span className="feature-icon">📊</span>
              <h3 className="feature-title">Analytics Dashboard</h3>
              <p className="feature-desc">
                Interactive data visualization and insights dashboard for climate and nature analytics
              </p>
            </div>

            <div className="feature-card">
              <span className="feature-icon">🌿</span>
              <h3 className="feature-title">Nature-Climate Interface</h3>
              <p className="feature-desc">
                Comprehensive analysis of how climate change affects African ecosystems and biodiversity
              </p>
            </div>
          </div>

          <div className="contact-section">
            <h3 className="contact-title">Interested in Learning More?</h3>
            <p className="contact-text">
              Connect with our team to discuss partnership opportunities and future access to our platform.
            </p>
            <a
              href="mailto:reubenmuwhindi@gmail.com?subject=Africa Climate & Nature Data Platform - Inquiry"
              className="contact-button"
            >
              Get in Touch
            </a>
            <Dialog open={showSignIn} onOpenChange={setShowSignIn}>
              <DialogTrigger asChild>
                <button className="signin-button">Sign In</button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <SignIn
                  appearance={{
                    elements: {
                      formButtonPrimary: "bg-[#0A5D22] hover:bg-[#0A5D22]/90",
                      card: "shadow-none",
                    },
                  }}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="scroll-indicator">
          <span style={{ fontSize: "1.5rem" }}>↓</span>
        </div>
      </section>
    </div>
  )
}
