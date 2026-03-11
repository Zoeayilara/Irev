import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/layout/Footer"
import { Navbar } from "@/components/layout/Navbar"
import { ArrowRight, GraduationCap, MapPin, Calendar, Award, BookOpen, Trophy, Users } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background font-sans selection:bg-accent/30 scroll-smooth">
      {/* Global Navigation */}
      <Navbar activePage="home" />

      <main>
        {/* Hero Section */}
        <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-48 overflow-hidden bg-[#0A1930] selection:bg-accent/30 selection:text-accent-foreground min-h-[400px] lg:min-h-[600px] flex items-center">
          {/* Background Image (No overlays, full bleed) */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/desktop-6.jpg"
              alt="iRev Background"
              fill
              className="object-cover object-center"
              priority
            />
          </div>

          <div className="container mx-auto px-4 relative z-10 mt-8 lg:mt-0">
            <div className="lg:w-2/3 text-left">
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[76px] font-black tracking-tight mb-6 leading-[1.1] text-white drop-shadow-xl">
                The Intellectual <br />
                <span className="flex items-center gap-1 mt-2">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-accent shrink-0 -ml-2 w-8 h-8 md:w-12 md:h-12">
                    <path d="M12 2L13.5 10.5L22 12L13.5 13.5L12 22L10.5 13.5L2 12L10.5 10.5L12 2Z" fill="currentColor" />
                  </svg>
                  Revolution Has Begun.
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-2xl text-white/95 mb-10 font-medium max-w-2xl leading-relaxed drop-shadow-md">
                A 3- Stage Scholarship Competition For Future Leaders.<br className="hidden md:block" />
                From Primary School to University, Your brilliance<br className="hidden md:block" />
                deserves a spotlight.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full max-w-md mx-auto sm:mx-0">
                <Link href="/register" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full bg-[#101C2E] hover:bg-[#0A111A] text-white font-bold px-10 h-14 rounded-full text-[15px] shadow-[4px_0_15px_1px_rgba(217,119,6,0.6)] border border-transparent">
                    REGISTER NOW
                  </Button>
                </Link>
                <Link href="/about" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full border-[#0A192F]/30 text-[#0A192F] font-semibold px-8 h-12 rounded-full text-base bg-white/50 hover:bg-white hover:text-[#0A192F] backdrop-blur-sm sm:h-14">
                    LEARN MORE
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          {/* Wave decorative element at bottom of hero */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" className="w-full h-auto text-background fill-current">
              <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
            </svg>
          </div>
        </section>



        {/* What is iRev? */}
        <section id="about" className="py-12 lg:py-24 bg-white relative">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <div className="relative inline-block mb-10 mt-10">
                <h2 className="font-serif text-3xl md:text-[40px] font-bold text-[#001A41] tracking-tight">What is iRev?</h2>
                <svg viewBox="0 0 240 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[80%] max-w-[240px]">
                  <path d="M3 11C60 3 160 14 237 5" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </div>
              <p className="text-sm md:text-base font-medium text-[#0A192F] leading-relaxed max-w-3xl mx-auto">
                Intellectual Revolution (iRev) is a national scholarship competition designed to discover, celebrate,<br className="hidden md:block" /> and reward academic excellence among Nigerian students across all levels from primary school to<br className="hidden md:block" /> university.
              </p>
            </div>
          </div>
        </section>

        {/* Who Can Participate? */}
        <section id="participate" className="py-12 lg:py-24 bg-[#F5F7FA]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="relative inline-block">
                <h2 className="font-serif text-3xl md:text-[40px] font-bold text-[#001A41] tracking-tight">Who Can Participate?</h2>
                <svg viewBox="0 0 320 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[90%] max-w-[320px]">
                  <path d="M3 11C80 3 220 14 317 5" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* Primary Schools */}
              <div className="bg-white rounded-[16px] p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col items-center justify-center text-center h-[200px]">
                <div className="bg-[#FEF3C7] p-3 rounded-lg mb-4">
                  <BookOpen className="h-6 w-6 text-[#D97706]" />
                </div>
                <h3 className="font-serif font-bold text-[19px] mb-2 text-[#001A41]">Primary Schools</h3>
                <p className="text-[#64748B] text-[13px] font-medium">Primary 1 - 6</p>
              </div>

              {/* Junior Secondary */}
              <div className="bg-white rounded-[16px] p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col items-center justify-center text-center h-[200px]">
                <div className="bg-[#FCE7F3] p-3 rounded-lg mb-4">
                  <Users className="h-6 w-6 text-[#DB2777]" />
                </div>
                <h3 className="font-serif font-bold text-[19px] mb-2 text-[#001A41]">Junior Secondary</h3>
                <p className="text-[#64748B] text-[13px] font-medium">JSS 1 - JSS 3</p>
              </div>

              {/* Senior Secondary */}
              <div className="bg-white rounded-[16px] p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col items-center justify-center text-center h-[200px]">
                <div className="bg-[#DBEAFE] p-3 rounded-lg mb-4">
                  <GraduationCap className="h-6 w-6 text-[#2563EB]" />
                </div>
                <h3 className="font-serif font-bold text-[19px] mb-2 text-[#001A41]">Senior Secondary</h3>
                <p className="text-[#64748B] text-[13px] font-medium">SS 1 - SS 3</p>
              </div>

              {/* 100 Level / ND1 */}
              <div className="bg-white rounded-[16px] p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col items-center justify-center text-center h-[200px]">
                <div className="bg-[#F3F4F6] p-3 rounded-lg mb-4">
                  <Trophy className="h-6 w-6 text-[#4B5563]" />
                </div>
                <h3 className="font-serif font-bold text-[19px] mb-2 text-[#001A41]">100 Level / ND1</h3>
                <p className="text-[#64748B] text-[13px] font-medium">University & Polytechnic</p>
              </div>
            </div>
          </div>
        </section>



        {/* How It Works */}
        <section id="how-it-works" className="py-12 lg:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-20">
              <div className="relative inline-block">
                <h2 className="font-serif text-3xl md:text-[40px] font-bold text-[#001A41] tracking-tight">How It Works</h2>
                <svg viewBox="0 0 240 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[80%] max-w-[240px]">
                  <path d="M3 11C60 3 160 14 237 5" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* Steps Container */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-8 max-w-6xl mx-auto">

              {/* Step 1 */}
              <div className="relative w-full max-w-[260px]">
                <div className="bg-white rounded-[16px] border-2 border-[#1E3A8A] p-6 h-[220px] shadow-sm flex flex-col items-center justify-center text-center relative z-10">
                  <div className="absolute -top-3 -left-3 bg-[#1E3A8A] text-white text-xs font-bold w-8 h-8 rounded-tr-lg rounded-bl-lg flex items-center justify-center">
                    01
                  </div>
                  <h3 className="font-serif font-bold text-xl text-[#001A41] mb-2 mt-4">Register</h3>
                  <p className="text-[#64748B] text-sm leading-relaxed">Sign up and verify<br />your account</p>
                </div>
              </div>

              {/* Arrow 1 */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="hidden lg:block text-[#1E3A8A] transform rotate-0">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>

              {/* Step 2 */}
              <div className="relative w-full max-w-[260px]">
                <div className="bg-white rounded-[16px] border-2 border-[#F59E0B] p-6 h-[220px] shadow-sm flex flex-col items-center justify-center text-center relative z-10">
                  <div className="absolute -top-3 -left-3 bg-[#F59E0B] text-white text-xs font-bold w-8 h-8 rounded-tr-lg rounded-bl-lg flex items-center justify-center">
                    02
                  </div>
                  <h3 className="font-serif font-bold text-xl text-[#001A41] mb-2 mt-4">Stage 1 - Online<br />Assessment</h3>
                  <p className="text-[#64748B] text-sm leading-relaxed">Take the timed objective<br />test</p>
                </div>
              </div>

              {/* Arrow 2 */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="hidden lg:block text-[#1E3A8A] transform rotate-0">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>

              {/* Step 3 */}
              <div className="relative w-full max-w-[260px]">
                <div className="bg-white rounded-[16px] border-2 border-[#BE185D] p-6 h-[220px] shadow-sm flex flex-col items-center justify-center text-center relative z-10">
                  <div className="absolute -top-3 -left-3 bg-[#BE185D] text-white text-xs font-bold w-8 h-8 rounded-tr-lg rounded-bl-lg flex items-center justify-center">
                    03
                  </div>
                  <h3 className="font-serif font-bold text-xl text-[#001A41] mb-2 mt-4">Stage 2 -<br />Critical Thinking</h3>
                  <p className="text-[#64748B] text-sm leading-relaxed">Top scorers tackle<br />advanced challenges</p>
                </div>
              </div>

              {/* Arrow 3 */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="hidden lg:block text-[#1E3A8A] transform rotate-0">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>

              {/* Step 4 */}
              <div className="relative w-full max-w-[260px]">
                <div className="bg-white rounded-[16px] border-2 border-[#3B82F6] p-6 h-[220px] shadow-sm flex flex-col items-center justify-center text-center relative z-10">
                  <div className="absolute -top-3 -left-3 bg-[#3B82F6] text-white text-xs font-bold w-8 h-8 rounded-tr-lg rounded-bl-lg flex items-center justify-center">
                    04
                  </div>
                  <h3 className="font-serif font-bold text-xl text-[#001A41] mb-2 mt-4">Stage 3 -<br />Grand Finale</h3>
                  <p className="text-[#64748B] text-sm leading-relaxed">Finalists compete<br />live for scholarships</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Prizes & Scholarships */}
        <section id="prizes" className="py-12 lg:py-24 bg-[#0B1B36] border-t border-[#1E293B]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-20">
              <div className="relative inline-block">
                <h2 className="font-serif text-3xl md:text-[40px] font-bold text-white tracking-tight">Prizes & scholarships</h2>
                <svg viewBox="0 0 300 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[90%] max-w-[300px]">
                  <path d="M3 11C80 3 200 14 297 5" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">

              {/* Full Scholarship */}
              <div className="bg-[#0A192F] rounded-[16px] border border-[#1E293B] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_4px_20px_rgba(0,0,0,0.2)] p-8 flex flex-col items-center justify-center text-center h-[280px]">
                <div className="mb-6">
                  <Award className="h-12 w-12 text-[#F59E0B]" />
                </div>
                <h3 className="font-bold text-[22px] mb-4 text-[#F59E0B]">Full Scholarship</h3>
                <p className="text-[#94A3B8] text-[15px] leading-relaxed max-w-[200px]">Complete tuition coverage<br />for top performers</p>
              </div>

              {/* Cash Prizes */}
              <div className="bg-[#0A192F] rounded-[16px] border border-[#1E293B] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_4px_20px_rgba(0,0,0,0.2)] p-8 flex flex-col items-center justify-center text-center h-[280px]">
                <div className="mb-6 bg-[#001A41] w-12 h-12 rounded-full flex items-center justify-center border border-[#1E293B]">
                  {/* Custom Naira symbol using SVG */}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#F59E0B]">
                    <path d="M6 4V20M18 4V20M6 4L18 20M4 10H20M4 14H20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" />
                  </svg>
                </div>
                <h3 className="font-bold text-[22px] mb-4 text-[#F59E0B]">Cash Prizes</h3>
                <p className="text-[#94A3B8] text-[15px] leading-relaxed max-w-[200px]">Monetary rewards for<br />outstanding students</p>
              </div>

              {/* Certificates */}
              <div className="bg-[#0A192F] rounded-[16px] border border-[#1E293B] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_4px_20px_rgba(0,0,0,0.2)] p-8 flex flex-col items-center justify-center text-center h-[280px]">
                <div className="mb-6 relative">
                  <svg width="40" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#F59E0B]">
                    <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" fill="currentColor" />
                  </svg>
                  <div className="absolute -top-1 -right-2 bg-[#EF4444] rounded-full w-4 h-4" />
                </div>
                <h3 className="font-bold text-[22px] mb-4 text-[#F59E0B]">Certificates</h3>
                <p className="text-[#94A3B8] text-[15px] leading-relaxed max-w-[200px]">Recognition of excellence for<br />all participants</p>
              </div>

            </div>
          </div>
        </section>

        {/* Registration Closes In (Timer) */}
        <section className="py-12 lg:py-24 bg-white border-t border-[#F5F7FA]">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-[24px] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-12 max-w-4xl mx-auto flex flex-col items-center">

              <div className="text-center mb-10">
                <div className="relative inline-block mb-4 mt-2">
                  <h2 className="font-serif text-3xl md:text-[36px] font-bold text-[#001A41] tracking-tight">Registration Closes In</h2>
                  <svg viewBox="0 0 240 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[80%] max-w-[240px]">
                    <path d="M3 11C60 3 160 14 237 5" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </div>
                <p className="text-[#64748B] font-medium text-lg">Don't miss your chance to compete</p>
              </div>

              {/* Timer Blocks */}
              <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-12">
                {[
                  { label: "DAYS", value: "99" },
                  { label: "HOURS", value: "09" },
                  { label: "MINUTES", value: "53" },
                  { label: "SECONDS", value: "41" }
                ].map((block, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="bg-gradient-to-b from-[#0A192F] to-[#B46A14] rounded-xl w-24 h-24 md:w-28 md:h-28 flex items-center justify-center shadow-lg mb-4">
                      <span className="text-4xl md:text-5xl font-bold text-white tracking-wider">{block.value}</span>
                    </div>
                    <span className="text-[#64748B] font-serif font-bold text-sm tracking-widest">{block.label}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <Link href="/register">
                <Button className="bg-[#F8C147] hover:bg-[#F59E0B] text-[#001A41] font-bold px-12 h-14 rounded-md text-[16px] shadow-sm tracking-wide">
                  Register Before It's Too Late
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* What People Are Saying (Testimonials) */}
        <section className="py-12 lg:py-24 bg-[#F8F9FA]">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <div className="relative inline-block">
                <h2 className="font-serif text-3xl md:text-[40px] font-bold text-[#001A41] tracking-tight">What People Are Saying</h2>
                <svg viewBox="0 0 320 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[90%] max-w-[320px]">
                  <path d="M3 11C80 3 220 14 317 5" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Testimonial 1 */}
              <div className="bg-[#F6EBEB] rounded-2xl p-8 flex flex-col justify-between h-[280px]">
                <p className="text-[#001A41] font-medium leading-relaxed italic text-[15px]">
                  "iRev gave me the<br />platform to showcase<br />my abilities beyond the<br />classroom."
                </p>
                <div>
                  <h4 className="font-bold text-[#001A41] text-lg mb-1">Adaeze O.</h4>
                  <p className="text-[#64748B] text-sm italic">SS3 Student</p>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-[#E2E8F0] rounded-2xl p-8 flex flex-col justify-between h-[280px]">
                <p className="text-[#001A41] font-medium leading-relaxed italic text-[15px]">
                  "This competition is<br />exactly what our<br />educational system<br />needs structured<br />excellence."
                </p>
                <div>
                  <h4 className="font-bold text-[#001A41] text-lg mb-1">Mr. Balogun</h4>
                  <p className="text-[#64748B] text-sm italic">School Principal</p>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-[#EFE8E8] rounded-2xl p-8 flex flex-col justify-between h-[280px]">
                <p className="text-[#001A41] font-medium leading-relaxed italic text-[15px]">
                  "A credible, well-<br />organized initiative<br />that truly rewards<br />merit."
                </p>
                <div>
                  <h4 className="font-bold text-[#001A41] text-lg mb-1">Dr. Amina</h4>
                  <p className="text-[#001A41] font-bold text-sm">Education<br /><span className="text-[#64748B] italic font-normal">Advocate</span></p>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* FAQ Section */}
        <section className="py-12 lg:py-24 bg-slate-50 border-t border-slate-200">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-center mb-4 text-primary">Frequently Asked <span className="text-accent underline decoration-accent/50 underline-offset-8">Questions</span></h2>
            <p className="text-center text-slate-600 mb-12">Everything you need to know about iRev.</p>

            <div className="space-y-4">
              {[
                { q: "What is iRev?", a: "Intellectual Revolution (iRev) is a national scholarship competition designed to discover and reward academic excellence among Nigerian students from primary school to university level." },
                { q: "Who can participate?", a: "Students from Primary 1 to Primary 6, JSS 1-3, SS 1-3, and 100 Level / ND1 students across Nigeria are eligible to participate." },
                { q: "Is registration free?", a: "Registration for iRev is completely free. We believe every student's opportunity should not have financial barriers." },
                { q: "How many stages?", a: "The competition has 3 stages: Stage 1 is an online assessment, Stage 2 is a critical thinking round, and Stage 3 is the grand finale where scholarship winners are selected." },
                { q: "What are the prizes?", a: "Prizes include full and partial scholarships, certificates of excellence, and cash rewards for top 10 performers in each category." }
              ].map((faq, i) => (
                <details key={i} className="group bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-primary font-bold">
                    <h3 className="text-lg">{faq.q}</h3>
                    <span className="relative size-5 shrink-0">
                      <svg className="absolute inset-0 size-5 opacity-100 group-open:opacity-0 transition-opacity" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                      <svg className="absolute inset-0 size-5 opacity-0 group-open:opacity-100 transition-opacity" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-slate-600 leading-relaxed">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  )
}
