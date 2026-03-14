import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import Image from "next/image"

export const metadata = {
  title: "Competition Stages | iRev",
  description: "Learn about the three competition stages in the Intellectual Revolution scholarship competition.",
}

export default function StagesPage() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-accent/30 scroll-smooth">
      <Navbar activePage="stages" />

      <main>
        <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-28 overflow-hidden min-h-[420px] lg:min-h-[520px] flex items-center justify-center bg-[#0B2144] border-b-[6px] border-[#F59E0B]">
          <div className="absolute inset-0 z-0">
            <Image
              src="/about-graphic.png"
              alt="Competition Stages Background"
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-[#071a33]/65" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#071a33]/55 via-[#071a33]/35 to-[#071a33]/70" />
          </div>

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
              Competition <span className="text-[#F59E0B]">Stages</span>
            </h1>

            <p className="text-base md:text-xl text-white/95 font-medium max-w-3xl leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)]">
              Three rigorous stages designed to test knowledge, creativity,
            </p>
            <p className="mt-2 text-base md:text-xl text-white/95 font-medium max-w-3xl leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)]">
              and leadership.
            </p>
          </div>
        </section>

        <section className="bg-white py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-10">
            <div className="max-w-5xl mx-auto">
              <div className="relative">
                <div className="pointer-events-none absolute -left-3 top-0 hidden sm:block">
                  <div className="w-10 h-10 text-[#F59E0B]/40">
                    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 10c6 6 12 6 18 0s12-6 18 0" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                      <path d="M6 22c6 6 12 6 18 0s12-6 18 0" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                      <path d="M6 34c6 6 12 6 18 0s12-6 18 0" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
                <div className="pointer-events-none absolute -right-3 bottom-2 hidden sm:block">
                  <div className="w-10 h-10 text-[#F59E0B]/40">
                    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 10c6 6 12 6 18 0s12-6 18 0" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                      <path d="M6 22c6 6 12 6 18 0s12-6 18 0" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                      <path d="M6 34c6 6 12 6 18 0s12-6 18 0" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>

                <div className="space-y-6 sm:space-y-8">
                  {[
                    {
                      stage: 1,
                      stageColor: "text-[#4338CA]",
                      iconBg: "bg-[#FFF7ED]",
                      iconFg: "text-[#F59E0B]",
                      title: "Stage 1 – Online Assessment",
                      desc: "A timed, objective-based online test open to all registered students.",
                      points: [
                        "Time-based with auto-scoring",
                        "Multiple choice questions per subject",
                        "Open to all registered students",
                        "Top performers qualify for Stage 2",
                      ],
                      icon: (
                        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="4" width="18" height="14" rx="2" />
                          <path d="M7 8h6" />
                          <path d="M7 12h10" />
                        </svg>
                      ),
                    },
                    {
                      stage: 2,
                      stageColor: "text-[#F59E0B]",
                      iconBg: "bg-[#FFF7ED]",
                      iconFg: "text-[#F59E0B]",
                      title: "Stage 2 – Critical Thinking Round",
                      desc: "A deeper evaluation through written submissions or projects, judged by experts.",
                      points: [
                        "Submission deadline within 2 weeks",
                        "Essay, project, or case study",
                        "Reviewed by panel of judges",
                        "Top scorers advance to Stage 3",
                      ],
                      icon: (
                        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 2a7 7 0 0 0-4 12c.5.5 1 1.5 1 2h6c0-.5.5-1.5 1-2a7 7 0 0 0-4-12z" />
                          <path d="M9 21h6" />
                          <path d="M10 18h4" />
                        </svg>
                      ),
                    },
                    {
                      stage: 3,
                      stageColor: "text-[#22C55E]",
                      iconBg: "bg-[#ECFDF5]",
                      iconFg: "text-[#22C55E]",
                      title: "Stage 3 – Grand Finale",
                      desc: "The ultimate live challenge where finalists compete for scholarships and prizes.",
                      points: [
                        "Live event (in-person or virtual)",
                        "Presentation or final test",
                        "Observed by sponsors & media",
                        "Scholarship winners selected",
                      ],
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
                  ].map((s) => (
                    <div key={s.stage} className="rounded-2xl border border-[#E2E8F0] bg-white shadow-sm px-6 sm:px-8 py-6 sm:py-7">
                      <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-xl ${s.iconBg} flex items-center justify-center ${s.iconFg} border border-[#F1F5F9]`}
                        >
                          {s.icon}
                        </div>

                        <div className="flex-1">
                          <div className={`text-xs font-bold uppercase tracking-wider ${s.stageColor}`}>Stage {s.stage}</div>
                          <div className="mt-1 text-[#0A192F] font-serif font-bold text-xl sm:text-2xl">
                            {s.title}
                          </div>
                          <p className="mt-3 text-sm sm:text-[15px] text-[#64748B] leading-relaxed max-w-3xl">
                            {s.desc}
                          </p>

                          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3">
                            {s.points.map((p) => (
                              <div key={p} className="flex items-center gap-2 text-sm text-[#0A192F]">
                                <span className="w-4 h-4 rounded-full bg-[#F59E0B]/15 flex items-center justify-center">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
                                </span>
                                <span className="text-[#0A192F] font-medium">{p}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-10 rounded-2xl border border-[#E2E8F0] bg-[#0A1930] px-6 sm:px-8 py-8 text-white shadow-sm">
                <div className="text-lg sm:text-xl font-serif font-bold">Tip</div>
                <p className="mt-2 text-sm sm:text-[15px] text-white/90 leading-relaxed">
                  Make sure your profile details are correct before taking Stage 1. Once you submit, results are released after the scheduled processing window.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer topBgColor="#ffffff" />
    </div>
  )
}
