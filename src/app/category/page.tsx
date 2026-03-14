import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"

export const metadata = {
  title: "Competition Categories | iRev",
  description: "Explore competition categories across academic levels and the subjects covered.",
}

export default function CategoryPage() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-accent/30 scroll-smooth">
      <Navbar activePage="category" />

      <main>
        <section className="relative pt-24 pb-14 lg:pt-32 lg:pb-20 overflow-hidden bg-[#0B2144] border-b-[6px] border-[#F59E0B]">
          <div className="absolute inset-0" />

          <div className="absolute left-[8%] top-[28%] z-10 w-6 h-6 md:w-10 md:h-10 animate-pulse text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">
            <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0L13.5 10.5L24 12L13.5 13.5L12 24L10.5 13.5L0 12L10.5 10.5L12 0Z" />
            </svg>
          </div>
          <div className="absolute right-[9%] top-[24%] z-10 w-6 h-6 md:w-10 md:h-10 animate-pulse delay-300 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">
            <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0L13.5 10.5L24 12L13.5 13.5L12 24L10.5 13.5L0 12L10.5 10.5L12 0Z" />
            </svg>
          </div>
          <div className="absolute left-[12%] bottom-[28%] z-10 w-6 h-6 md:w-10 md:h-10 animate-pulse delay-500 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">
            <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0L13.5 10.5L24 12L13.5 13.5L12 24L10.5 13.5L0 12L10.5 10.5L12 0Z" />
            </svg>
          </div>
          <div className="absolute right-[15%] bottom-[34%] z-10 w-6 h-6 md:w-10 md:h-10 animate-pulse delay-700 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">
            <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0L13.5 10.5L24 12L13.5 13.5L12 24L10.5 13.5L0 12L10.5 10.5L12 0Z" />
            </svg>
          </div>

          <div className="absolute right-[10%] top-[40%] hidden md:block">
            <div className="relative w-[260px] h-[180px]">
              <div className="absolute right-0 top-0 w-28 h-28 rounded-full bg-emerald-800/70" />
              <div className="absolute right-[92px] top-[56px] w-32 h-32 rounded-full bg-[#D6C563]/85" />
              <div className="absolute right-[20px] top-[84px] w-32 h-32 rounded-full bg-blue-700/85" />
            </div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-10 relative z-20">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.55)] leading-none">
                Competition <span className="text-[#F59E0B]">Categories</span>
              </h1>

              <p className="text-base md:text-lg text-white/95 font-medium leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)]">
                Four academic levels, one shared mission — rewarding excellence at every
              </p>
              <p className="mt-2 text-base md:text-lg text-white/95 font-medium leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)]">
                stage of education.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-10">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="rounded-xl border-2 border-blue-500/90 overflow-hidden">
                  <div className="bg-blue-600 text-white px-6 py-6">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                          <path d="M7 19h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                          <path d="M9 19V8a3 3 0 0 1 6 0v11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                          <path d="M7 8h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-serif font-bold text-lg">Primary School</div>
                        <div className="mt-1 text-xs text-white/90 font-medium">Primary 1 - Primary 6 · Ages 6 - 12</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white px-6 py-6">
                    <div className="text-slate-700 font-semibold text-sm">Subjects Covered</div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-700">English Language</span>
                      <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-700">Mathematics</span>
                      <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-700">General Knowledge</span>
                      <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-700">Basic Science</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border-2 border-emerald-500/90 overflow-hidden">
                  <div className="bg-emerald-600 text-white px-6 py-6">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                          <path d="M8 7h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                          <path d="M6 10h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                          <path d="M7 10v7a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-serif font-bold text-lg">Junior Secondary</div>
                        <div className="mt-1 text-xs text-white/90 font-medium">JSS 1 - JSS 3 · Ages 12 - 15</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white px-6 py-6">
                    <div className="text-slate-700 font-semibold text-sm">Subjects Covered</div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-700">English Language</span>
                      <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-700">Mathematics</span>
                      <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-700">General Knowledge</span>
                      <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-700">Basic Science</span>
                      <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-700">Social Studies</span>
                      <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-700">Civic Education</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border-2 border-orange-500/90 overflow-hidden">
                  <div className="bg-orange-600 text-white px-6 py-6">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                          <path d="M7 20h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                          <path d="M9 20V10a3 3 0 0 1 6 0v10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                          <path d="M8.5 10h7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-serif font-bold text-lg">Senior Secondary</div>
                        <div className="mt-1 text-xs text-white/90 font-medium">SS 1 - SS 3 · Ages 15 - 18</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white px-6 py-6">
                    <div className="text-slate-700 font-semibold text-sm">Subjects Covered</div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-700">English Language</span>
                      <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-700">Mathematics</span>
                      <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-700">Physics/Chemistry/Biology</span>
                      <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-700">Government/Economics</span>
                      <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-700">Literature</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border-2 border-purple-500/90 overflow-hidden">
                  <div className="bg-purple-600 text-white px-6 py-6">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                          <path d="M7 7h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                          <path d="M7 12h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                          <path d="M7 17h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-serif font-bold text-lg">100 Level / ND1</div>
                        <div className="mt-1 text-xs text-white/90 font-medium">University & Polytechnic · Ages 16 - 20</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white px-6 py-6">
                    <div className="text-slate-700 font-semibold text-sm">Subjects Covered</div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-700">General Studies</span>
                      <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-700">Critical Thinking</span>
                      <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-700">Field-Specific Questions</span>
                      <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-700">Current Affairs</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer topBgColor="#ffffff" />
    </div>
  )
}
