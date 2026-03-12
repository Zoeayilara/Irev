import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import Image from "next/image"

export const metadata = {
  title: "How It Works | iRev",
  description: "Learn how the Intellectual Revolution scholarship competition works.",
}

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-accent/30 scroll-smooth">
      {/* Global Navigation */}
      <Navbar activePage="how-it-works" />

      <main>
        {/* Hero Section */}
        <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-28 overflow-hidden min-h-[420px] lg:min-h-[520px] flex items-center justify-center bg-[#0B2144] border-b-[6px] border-[#F59E0B]">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/about-hero-final.jpg"
              alt="iRev Journey Background"
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-[#071a33]/65" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#071a33]/55 via-[#071a33]/35 to-[#071a33]/70" />
          </div>

          {/* Sparkle Graphics */}
          <div className="absolute left-[8%] top-[38%] z-10 w-7 h-7 md:w-12 md:h-12 animate-pulse text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">
            <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0L13.5 10.5L24 12L13.5 13.5L12 24L10.5 13.5L0 12L10.5 10.5L12 0Z" />
            </svg>
          </div>

          <div className="absolute right-[8%] top-[38%] z-10 w-7 h-7 md:w-12 md:h-12 animate-pulse delay-300 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">
            <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0L13.5 10.5L24 12L13.5 13.5L12 24L10.5 13.5L0 12L10.5 10.5L12 0Z" />
            </svg>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 bottom-[22%] z-10 w-6 h-6 md:w-10 md:h-10 animate-pulse delay-700 text-[#F8C147] drop-shadow-[0_0_15px_rgba(248,193,71,0.8)]">
            <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0L13.5 10.5L24 12L13.5 13.5L12 24L10.5 13.5L0 12L10.5 10.5L12 0Z" />
            </svg>
          </div>

          <div className="container mx-auto px-4 relative z-20 flex flex-col items-center justify-center text-center mt-10">
            <h1 className="font-serif text-5xl md:text-6xl lg:text-[72px] font-bold tracking-tight mb-6 text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.55)] leading-none">
              How It <span className="text-[#F59E0B]">Works</span>
            </h1>

            <p className="text-base md:text-xl text-white/95 font-medium max-w-3xl leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)]">
              From registration to scholarship here's your journey through
            </p>
            <p className="mt-2 text-base md:text-xl text-white/95 font-medium max-w-3xl leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)]">
              the Intellectual Revolution.
            </p>
          </div>
        </section>
      </main>

      <Footer topBgColor="#ffffff" />
    </div>
  )
}
