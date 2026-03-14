import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"

export const metadata = {
  title: "Contact Us | iRev",
  description: "Get in touch with the iRev team.",
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-accent/30 scroll-smooth">
      <Navbar activePage="contact" />

      <main>
        <section className="bg-[#0B2144] pt-24 pb-14 lg:pt-32 lg:pb-16 border-b-[6px] border-[#0B2144]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-white">Contact Us</h1>
              <p className="mt-3 text-sm md:text-base text-white/80">Have a question? We'd love to hear from you.</p>
            </div>
          </div>
        </section>

        <section className="bg-white py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-10">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[0.95fr_1.35fr] gap-10 lg:gap-14 items-start">
              <aside>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#0B2144] text-white flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                      <path d="M7 12h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      <path d="M12 7v10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div className="font-serif font-bold text-[#0A192F]">Get in Touch</div>
                </div>

                <div className="mt-8 space-y-7">
                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-lg bg-[#FDE68A] text-[#0B2144] flex items-center justify-center">
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                        <path d="M4 6h16v12H4V6Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                        <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[#0A192F]">Email</div>
                      <div className="mt-1 text-sm text-slate-600">info@irev.ng</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-lg bg-[#FDE68A] text-[#0B2144] flex items-center justify-center">
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                        <path d="M8 4h3l1 4-2 1c1 2 3 4 5 5l1-2 4 1v3c0 1-1 2-2 2-8 0-14-6-14-14 0-1 1-2 2-2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[#0A192F]">Phone</div>
                      <div className="mt-1 text-sm text-slate-600">+234 800 000 000</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-lg bg-[#FDE68A] text-[#0B2144] flex items-center justify-center">
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                        <path d="M12 21s7-5 7-11a7 7 0 1 0-14 0c0 6 7 11 7 11Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                        <path d="M12 10.5a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4Z" stroke="currentColor" strokeWidth="1.8" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[#0A192F]">Location</div>
                      <div className="mt-1 text-sm text-slate-600">Lagos, Nigeria</div>
                    </div>
                  </div>
                </div>
              </aside>

              <div className="rounded-xl border border-slate-200 bg-white shadow-[0_18px_35px_rgba(15,23,42,0.12)] p-6 sm:p-8">
                <form className="space-y-5" action="#" method="post">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-sm font-semibold text-[#0A192F]">Name</label>
                      <input
                        name="name"
                        placeholder="Your name"
                        className="mt-2 w-full rounded-md border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/20"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-[#0A192F]">Email</label>
                      <input
                        name="email"
                        type="email"
                        placeholder="you@gmail.com"
                        className="mt-2 w-full rounded-md border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-[#0A192F]">Subject</label>
                    <input
                      name="subject"
                      placeholder="How can we help?"
                      className="mt-2 w-full rounded-md border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/20"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-[#0A192F]">Message</label>
                    <textarea
                      name="message"
                      placeholder="Your message..."
                      rows={6}
                      className="mt-2 w-full rounded-md border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/20 resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full sm:w-[260px] mx-auto block rounded-md bg-[#F59E0B] px-6 py-3 text-sm font-semibold text-white shadow hover:bg-[#F59E0B]/90 transition-colors"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer topBgColor="#ffffff" />
    </div>
  )
}
