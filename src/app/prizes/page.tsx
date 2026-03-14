import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import Image from "next/image"

export const metadata = {
  title: "Prizes & Scholarships | iRev",
  description: "Explore prizes and scholarships for top performers in the Intellectual Revolution competition.",
}

export default function PrizesPage() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-accent/30 scroll-smooth">
      <Navbar activePage="prizes" />

      <main>
        <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden min-h-[420px] lg:min-h-[520px] flex items-center bg-[#0B2144] border-b-[6px] border-[#F59E0B]">
          <div className="absolute inset-0 z-0" />

          <div className="absolute left-[9%] top-[32%] z-10 w-7 h-7 md:w-12 md:h-12 animate-pulse text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">
            <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0L13.5 10.5L24 12L13.5 13.5L12 24L10.5 13.5L0 12L10.5 10.5L12 0Z" />
            </svg>
          </div>
          <div className="absolute right-[12%] top-[32%] z-10 w-7 h-7 md:w-12 md:h-12 animate-pulse delay-300 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">
            <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0L13.5 10.5L24 12L13.5 13.5L12 24L10.5 13.5L0 12L10.5 10.5L12 0Z" />
            </svg>
          </div>

          <div className="absolute left-[10%] bottom-[18%] z-10 hidden md:block">
            <div className="w-20 h-20 text-[#F59E0B]/35">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 10c6 6 12 6 18 0s12-6 18 0" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                <path d="M6 22c6 6 12 6 18 0s12-6 18 0" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                <path d="M6 34c6 6 12 6 18 0s12-6 18 0" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-10 relative z-20">
            <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-6 items-center">
              <div className="text-center">
                <div className="max-w-3xl mx-auto">
                  <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-bold tracking-tight mb-6 text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.55)] leading-none">
                    Prizes & <span className="text-[#F59E0B]">Scholarships</span>
                  </h1>

                  <p className="text-base md:text-xl text-white/95 font-medium leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)]">
                    Excellence deserves reward. Here's what awaits our
                  </p>
                  <p className="mt-2 text-base md:text-xl text-white/95 font-medium leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)]">
                    top performers.
                  </p>
                </div>
              </div>

              <div className="flex justify-center lg:justify-end">
                <div className="relative w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] lg:w-[330px] lg:h-[330px] rounded-full bg-[#0A1930] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.35)] overflow-hidden">
                  <Image
                    src="/prizes-girl.png"
                    alt="Student holding books"
                    fill
                    className="object-contain object-bottom"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-10">
            <div className="max-w-5xl mx-auto">
              <div className="space-y-8">
                <div className="rounded-2xl bg-[#FFF4D6] px-6 sm:px-10 py-10 flex flex-col sm:flex-row gap-8 items-start sm:items-center justify-between">
                  <div className="max-w-xl">
                    <div className="inline-flex items-center rounded-full bg-[#F8D48A] px-5 py-2 text-xs font-bold tracking-widest text-[#6B4D00]">GOLD</div>
                    <div className="mt-5 text-[#0A192F] font-serif font-bold text-2xl">Full Scholarship</div>
                    <p className="mt-3 text-sm sm:text-[15px] text-[#334155] leading-relaxed">
                      Complete tuition coverage for the top performer in each category. Covers one full academic year.
                    </p>
                  </div>
                  <div className="self-end sm:self-auto">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 text-[#F59E0B]">
                      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="32" cy="26" r="12" fill="currentColor" />
                        <path d="M22 40l10-4 10 4v14l-10-4-10 4V40z" fill="#FBBF24" />
                        <path d="M32 12l3 6 6 3-6 3-3 6-3-6-6-3 6-3 3-6z" fill="#FDE68A" opacity="0.6" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl bg-[#DDE3EE] px-6 sm:px-10 py-10 flex flex-col sm:flex-row gap-8 items-start sm:items-center justify-between">
                  <div className="max-w-xl">
                    <div className="inline-flex items-center rounded-full bg-white/70 px-5 py-2 text-xs font-bold tracking-widest text-[#334155]">SILVER</div>
                    <div className="mt-5 text-[#0A192F] font-serif font-bold text-2xl">Partial Scholarship</div>
                    <p className="mt-3 text-sm sm:text-[15px] text-[#334155] leading-relaxed">
                      80% tuition support for 2nd and 3rd place finishers in every category.
                    </p>
                  </div>
                  <div className="self-end sm:self-auto">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 text-white/80">
                      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M32 6l10 6v14c0 10-6 18-10 20-4-2-10-10-10-20V12l10-6z" fill="currentColor" />
                        <path d="M22 48l10-4 10 4v10l-10-4-10 4V48z" fill="#CBD5E1" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl bg-[#F1D6CE] px-6 sm:px-10 py-10 flex flex-col sm:flex-row gap-8 items-start sm:items-center justify-between">
                  <div className="max-w-xl">
                    <div className="inline-flex items-center rounded-full bg-white/70 px-5 py-2 text-xs font-bold tracking-widest text-[#7C2D12]">BRONZE</div>
                    <div className="mt-5 text-[#0A192F] font-serif font-bold text-2xl">Cash Prizes</div>
                    <p className="mt-3 text-sm sm:text-[15px] text-[#334155] leading-relaxed">
                      Monetary awards for 4th-10th place finishers, recognizing consistent excellence.
                    </p>
                  </div>
                  <div className="self-end sm:self-auto">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 text-[#F59E0B]">
                      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22 22h20v8c0 9-6 14-10 16-4-2-10-7-10-16v-8z" fill="currentColor" />
                        <path d="M18 24h-6c0 8 6 14 12 14v-6c-3 0-6-3-6-8z" fill="#FBBF24" />
                        <path d="M46 24h6c0 8-6 14-12 14v-6c3 0 6-3 6-8z" fill="#FBBF24" />
                        <path d="M26 50h12v4H26v-4z" fill="#0A1930" opacity="0.25" />
                      </svg>
                    </div>
                  </div>
                </div>

                <section className="pt-8 sm:pt-10">
                  <div className="text-center">
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#0A192F]">Additional Awards</h2>
                    <div className="mt-3 mx-auto h-[3px] w-28 rounded-full bg-[#F59E0B]" />
                  </div>

                  <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="rounded-xl border border-slate-200 bg-white px-8 py-10 shadow-[0_10px_22px_rgba(15,23,42,0.10)]">
                      <div className="flex items-center justify-center">
                        <div className="w-10 h-10 text-[#F59E0B]">
                          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 3h10a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.8" />
                            <path d="M8 7h8M8 10h8M8 13h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                            <path d="M9 20l3-2 3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      </div>
                      <div className="mt-6 text-center">
                        <div className="font-serif font-bold text-sm text-[#0A192F]">Certificates of Excellence</div>
                        <p className="mt-3 text-xs leading-relaxed text-slate-600 max-w-[18rem] mx-auto">
                          Official certificates issued to all Stage 2 and Stage 3 participants.
                        </p>
                      </div>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white px-8 py-10 shadow-[0_10px_22px_rgba(15,23,42,0.10)]">
                      <div className="flex items-center justify-center">
                        <div className="w-10 h-10 text-[#F59E0B]">
                          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 21h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                            <path d="M10 21v-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                            <path d="M14 21v-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                            <path d="M7 4h10v3a5 5 0 0 1-10 0V4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                            <path d="M5 6H3a4 4 0 0 0 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                            <path d="M19 6h2a4 4 0 0 1-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                          </svg>
                        </div>
                      </div>
                      <div className="mt-6 text-center">
                        <div className="font-serif font-bold text-sm text-[#0A192F]">Top 10 Recognition</div>
                        <p className="mt-3 text-xs leading-relaxed text-slate-600 max-w-[18rem] mx-auto">
                          Featured on our website and social media channels as top intellectual leaders.
                        </p>
                      </div>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white px-8 py-10 shadow-[0_10px_22px_rgba(15,23,42,0.10)]">
                      <div className="flex items-center justify-center">
                        <div className="w-10 h-10 text-[#F59E0B]">
                          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2l2.2 4.6L19 8l-3.5 3.4.8 4.8L12 14.9 7.7 16.2l.8-4.8L5 8l4.8-1.4L12 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                            <path d="M8 20l4-2 4 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      </div>
                      <div className="mt-6 text-center">
                        <div className="font-serif font-bold text-sm text-[#0A192F]">Consolation Prizes</div>
                        <p className="mt-3 text-xs leading-relaxed text-slate-600 max-w-[18rem] mx-auto">
                          Learning materials and certificates for stage 1 top performers.
                        </p>
                      </div>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white px-8 py-10 shadow-[0_10px_22px_rgba(15,23,42,0.10)]">
                      <div className="flex items-center justify-center">
                        <div className="w-10 h-10 text-[#F59E0B]">
                          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 3l7 4v6c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V7l7-4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                            <path d="M10 12l1.3 1.3L14.8 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      </div>
                      <div className="mt-6 text-center">
                        <div className="font-serif font-bold text-sm text-[#0A192F]">School Recognition</div>
                        <p className="mt-3 text-xs leading-relaxed text-slate-600 max-w-[18rem] mx-auto">
                          Awards for schools with the highest number of qualifiers.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer topBgColor="#ffffff" />
    </div>
  )
}
