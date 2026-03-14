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
              src="/about-graphic.png"
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

        <section className="bg-white py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-10">
            <div className="max-w-5xl mx-auto space-y-8 sm:space-y-10">
              {[
                {
                  step: 1,
                  title: "Register",
                  desc: "Create your account with basic information. Students under 18 need parental consent. It's quick, free, and secure.",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  ),
                },
                {
                  step: 2,
                  title: "Take Stage 1 Assessment",
                  desc: "Complete the timed online objective test covering your academic level's curriculum. Auto-scored for transparency.",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 11l3 3L22 4" />
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                    </svg>
                  ),
                },
                {
                  step: 3,
                  title: "Top Students Qualify for Stage 2",
                  desc: "High scorers advance to the critical thinking round: a project or written submission judged by experts.",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z" />
                    </svg>
                  ),
                },
                {
                  step: 4,
                  title: "Finalists Enter Stage 3",
                  desc: "The best of the best compete in the Grand Finale: a live challenge, presentation, or final test.",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M8 21h8" />
                      <path d="M12 17v4" />
                      <path d="M7 4h10" />
                      <path d="M17 4v4a5 5 0 0 1-10 0V4" />
                      <path d="M5 8h2a5 5 0 0 0 10 0h2" />
                    </svg>
                  ),
                },
                {
                  step: 5,
                  title: "Winners Announced",
                  desc: "Scholarship recipients and prize winners are announced publicly. Certificates are awarded to all finalists.",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="8" r="7" />
                      <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.11" />
                    </svg>
                  ),
                },
              ].map((s) => (
                <div key={s.step} className="relative">
                  <div className="absolute -left-1.5 sm:-left-2 top-6 sm:top-7">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#0A1930] text-white flex items-center justify-center shadow-md">
                      {s.icon}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-[#E2E8F0] bg-white px-6 sm:px-8 py-6 sm:py-7 shadow-sm pl-14 sm:pl-16">
                    <div className="text-[#F59E0B] font-bold text-xs uppercase tracking-wider">Step {s.step}</div>
                    <div className="mt-1 text-[#0A192F] font-serif font-bold text-xl sm:text-2xl">{s.title}</div>
                    <p className="mt-3 text-sm sm:text-[15px] text-[#64748B] leading-relaxed max-w-3xl">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer topBgColor="#ffffff" />
    </div>
  )
}
