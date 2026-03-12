import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/layout/Footer"
import { Navbar } from "@/components/layout/Navbar"
import image1 from '@/public/problems-graphic.png'
// import image1 from '@/'

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white font-sans selection:bg-accent/30 scroll-smooth">
            {/* Global Navigation */}
            <Navbar activePage="about" />

            <main>
                {/* Hero Section */}
                <section className="relative pt-16 pb-20 lg:pt-32 lg:pb-48 bg-[#1B3B6F] overflow-hidden min-h-[400px] lg:min-h-[500px] flex items-center">

                    <div className="container mx-auto px-4 relative z-20 flex flex-col items-center justify-center h-full">

                        {/* Center: Text Content */}
                        <div className="w-full lg:w-2/3 flex flex-col items-center text-center mt-8">
                            {/* Decorative Sparkle Above Title - Left */}
                            <div className="absolute left-[15%] top-[10%] lg:left-[5%] lg:top-[5%] z-20">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-[#F8EBBF]">
                                    <path d="M12 2L13.5 10.5L22 12L13.5 13.5L12 22L10.5 13.5L2 12L10.5 10.5L12 2Z" fill="currentColor" />
                                </svg>
                            </div>

                            <h1 className="font-serif text-4xl md:text-5xl lg:text-[56px] font-bold text-white mb-8 tracking-wide drop-shadow-md relative z-30">
                                About <span className="text-[#F59E0B]">IREV</span>
                            </h1>

                            <p className="text-[19px] md:text-xl text-white font-medium max-w-2xl leading-relaxed mb-4 drop-shadow-md relative z-30">
                                Discover the vision, mission, and purpose behind the
                            </p>
                            <p className="text-[19px] md:text-xl text-white font-medium max-w-2xl leading-relaxed drop-shadow-md relative z-30">
                                intellectual Revolution.
                            </p>

                            {/* Decorative Squiggly Lines Bottom Left */}
                            <div className="absolute left-[5%] bottom-[10%] w-40 opacity-80 z-20">
                                <svg viewBox="0 0 160 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 15C15 5 25 5 40 15C55 25 65 25 80 15C95 5 105 5 120 15C135 25 145 25 160 15" stroke="#927A32" strokeWidth="4" strokeLinecap="round" />
                                    <path d="M2 28C15 18 25 18 40 28C55 38 65 38 80 28C95 18 105 18 120 28C135 38 145 38 160 28" stroke="#927A32" strokeWidth="4" strokeLinecap="round" />
                                    <path d="M2 41C15 31 25 31 40 41C55 51 65 51 80 41C95 31 105 31 120 41C135 51 145 51 160 41" stroke="#927A32" strokeWidth="4" strokeLinecap="round" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Right Side Background Image - Absolute Positioning */}
                    <div className="absolute right-0 bottom-0 w-[55%] lg:w-[45%] h-[95%] z-10 hidden md:block">
                        {/* Decorative Sparkle Top Right */}
                        <div className="absolute right-[10%] top-[10%] z-20">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-[#F8EBBF]">
                                <path d="M12 2L13.5 10.5L22 12L13.5 13.5L12 22L10.5 13.5L2 12L10.5 10.5L12 2Z" fill="currentColor" />
                            </svg>
                        </div>

                        {/* Center-Right Sparkle */}
                        <div className="absolute left-[-5%] top-[55%] z-30">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-white drop-shadow-lg">
                                <path d="M12 2L13.5 10.5L22 12L13.5 13.5L12 22L10.5 13.5L2 12L10.5 10.5L12 2Z" fill="currentColor" />
                            </svg>
                        </div>

                        {/* Main Graphic - Shifted Down and Significantly Enlarged */}
                        <div className="absolute bottom-[-15%] -right-[20%] w-[160%] h-[150%]">
                            <Image
                                src="/about-students-transparent.png"
                                alt="Students"
                                fill
                                className="object-contain object-right-bottom drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)]"
                                priority
                            />
                        </div>
                    </div>
                </section>

                {/* Vision & Mission Section */}
                <section className="py-12 lg:py-12 bg-white relative overflow-hidden">
                    <div className="container mx-auto px-4 max-w-7xl relative z-10">
                        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 relative overflow-hidden lg:overflow-visible">

                            {/* Left Column: Text */}
                            <div className="lg:w-5/12 flex flex-col gap-16 lg:gap-24 relative z-20 w-full mt-4 px-5 lg:mt-0">

                                {/* Our Vision */}
                                <div>
                                    <div className="relative inline-block mb-6 w-full lg:w-auto overflow-hidden lg:overflow-visible">
                                        <h2 className="font-serif text-3xl md:text-[42px] font-bold text-[#001A41]">Our Vision</h2>
                                        <svg viewBox="0 0 180 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute -bottom-2 left-0 w-full max-w-[180px]">
                                            <path d="M3 11C45 3 120 14 177 5" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
                                        </svg>
                                    </div>
                                    <p className="text-[#0A192F] font-medium leading-loose text-[15px] lg:text-lg md:text-base lg:pr-4">
                                        To build a generation of intellectually empowered young leaders who will drive positive change across Africa and
                                        the world. We envision a future where every brilliant
                                        mind, regardless of socioeconomic background, gets
                                        the recognition and support they deserve.
                                    </p>
                                </div>

                                {/* Our Mission */}
                                <div>
                                    <div className="relative inline-block mb-6 w-full lg:w-auto overflow-hidden lg:overflow-visible">
                                        <h2 className="font-serif text-3xl md:text-[42px] font-bold text-[#001A41]">Our Mission</h2>
                                        <svg viewBox="0 0 200 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute -bottom-2 left-0 w-full max-w-[200px]">
                                            <path d="M3 11C50 3 140 14 197 5" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
                                        </svg>
                                    </div>
                                    <p className="text-[#0A192F] font-medium leading-loose text-[15px] md:text-base lg:pr-4 lg:text-lg">
                                        To identify, celebrate, and reward academic excellen among Nigerian students through a fair, transparent,
                                        and rigorous 3-stage competition that opens doors  scholarships and life-changing opportunities.
                                    </p>
                                </div>

                            </div>

                            {/* Right Column: Embedded Collage Graphic */}
                            <div className="lg:w-7/12 relative min-h-[350px] md:min-h-[500px] lg:min-h-[700px] w-full mt-12 lg:mt-0 flex justify-center lg:justify-end z-10 px-4 lg:px-0">
                                <div className="absolute inset-0 lg:-right-12 xl:-right-24 top-0 w-full h-full lg:h-[120%]">
                                    <Image
                                        src="/about-graphic.png"
                                        alt="Intellectual Revolution Students Collage"
                                        fill
                                        className="object-contain object-center lg:object-right"
                                        priority
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                {/* Why iRev Was Created Section */}
                <section className="py-12 lg:py-20 bg-[#F4F7F9] overflow-hidden">
                    <div className="container mx-auto px-4 max-w-4xl flex flex-col items-center">
                        <div className="relative inline-block mb-10 text-center px-4 w-full">
                            <h2 className="font-serif text-3xl md:text-[36px] font-bold text-[#001A41] break-words">
                                Why iRev Was Created
                            </h2>
                            <svg viewBox="0 0 280 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[90%] max-w-[280px]">
                                <path d="M3 11C70 3 200 14 277 5" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
                            </svg>
                        </div>

                        <div className="space-y-6 text-[#0A192F] font-medium leading-loose text-[15px] md:text-base w-full lg:text-lg">
                            <p>
                                Across Nigeria, thousands of academically brilliant students lack the financial resources to further their
                                education. Many talented young minds go unnoticed because they don't have access to platforms that
                                celebrate intellectual achievement.
                            </p>
                            <p>
                                iRev was born out of the belief that intelligence should be the great equalizer. By creating a structured,
                                accessible, and technology-driven competition, we bridge the gap between talent and opportunity.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Problems We Solve Section */}
                <section className="py-12 lg:py-24 bg-[#0B2144] overflow-hidden">
                    <div className="container mx-auto px-4 max-w-7xl">

                        {/* Section Header */}
                        <div className="flex flex-col items-center mb-20 text-center">
                            <div className="relative inline-block">
                                <h2 className="font-serif text-3xl md:text-[42px] font-bold text-white tracking-wide">
                                    Problems We Solve
                                </h2>
                                <svg width="320" height="16" viewBox="0 0 320 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[110%]">
                                    <path d="M4 12C75 4 230 16 316 6" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
                                </svg>
                            </div>
                        </div>

                        {/* Content Split */}
                        <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-12 lg:gap-16">

                            {/* Left Side: Illustration */}
                            <div className="w-full lg:w-1/3 flex justify-center items-center relative min-h-[400px]">
                            {/* <Image src={image1} alt="Student on books graphic" className="object-contain" /> */}
                                <Image
                                    src="/image1.jpg"
                                    alt="Student on books graphic"
                                    fill
                                    className="object-contain"
                                />
                            </div>

                            {/* Right Side: 2x2 Grid of Cards */}
                            <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">

                                {/* Card 1 */}
                                <div className="bg-[#122851] rounded-xl p-8 lg:p-10 border border-[#1E3A8A]/60 flex flex-col items-center text-center shadow-lg transition-transform hover:-translate-y-1">
                                    <div className="text-[#F59E0B] mb-6">
                                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                                            <path d="M12 9v4" />
                                            <path d="M12 17h.01" />
                                        </svg>
                                    </div>
                                    <h3 className="font-serif text-xl font-bold text-white mb-4">Lack of Recognition</h3>
                                    <p className="text-[#94A3B8] leading-relaxed text-[15px]">
                                        Brilliant students go unnoticed because there are no platforms to showcase their intellectual abilities beyond classroom walls.
                                    </p>
                                </div>

                                {/* Card 2 */}
                                <div className="bg-[#122851] rounded-xl p-8 lg:p-10 border border-[#1E3A8A]/60 flex flex-col items-center text-center shadow-lg transition-transform hover:-translate-y-1">
                                    <div className="text-[#F59E0B] mb-6">
                                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
                                            <polyline points="16 17 22 17 22 11" />
                                        </svg>
                                    </div>
                                    <h3 className="font-serif text-xl font-bold text-white mb-4">Educational Inequality</h3>
                                    <p className="text-[#94A3B8] leading-relaxed text-[15px]">
                                        Students from underserved communities rarely access the same opportunities as their peers in well-funded schools.
                                    </p>
                                </div>

                                {/* Card 3 */}
                                <div className="bg-[#122851] rounded-xl p-8 lg:p-10 border border-[#1E3A8A]/60 flex flex-col items-center text-center shadow-lg transition-transform hover:-translate-y-1">
                                    <div className="text-[#F59E0B] mb-6">
                                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="12" x2="12" y1="2" y2="22" />
                                            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                        </svg>
                                    </div>
                                    <h3 className="font-serif text-xl font-bold text-white mb-4">Financial Barriers</h3>
                                    <p className="text-[#94A3B8] leading-relaxed text-[15px]">
                                        Thousands of top-performing students cannot afford higher education, leaving their potential untapped.
                                    </p>
                                </div>

                                {/* Card 4 */}
                                <div className="bg-[#122851] rounded-xl p-8 lg:p-10 border border-[#1E3A8A]/60 flex flex-col items-center text-center shadow-lg transition-transform hover:-translate-y-1">
                                    <div className="text-[#F59E0B] mb-6">
                                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="12" cy="12" r="10" />
                                            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                                            <path d="M2 12h20" />
                                        </svg>
                                    </div>
                                    <h3 className="font-serif text-xl font-bold text-white mb-4">Limited Exposure</h3>
                                    <p className="text-[#94A3B8] leading-relaxed text-[15px]">
                                        Young talents lack access to networks, mentors, and platforms that could accelerate their academic and career growth.
                                    </p>
                                </div>

                            </div>
                        </div>

                    </div>
                </section>

                {/* Long-Term Goals Section */}
                <section className="py-12 lg:py-24 bg-white relative">
                    <div className="container mx-auto px-4 max-w-7xl">

                        {/* Section Header */}
                        <div className="flex flex-col items-center mb-16 text-center">
                            <div className="relative inline-block">
                                <h2 className="font-serif text-3xl md:text-[36px] font-bold text-[#001A41]">
                                    Long-Term Goals
                                </h2>
                                {/* Hand-drawn yellow wave underneath */}
                                <svg width="220" height="18" viewBox="0 0 220 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[120%]">
                                    <path d="M4 14C55 5 150 18 216 4" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
                                </svg>
                            </div>
                        </div>

                        {/* 3-Column Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl mx-auto">

                            {/* Card 1: National Expansion (Pinkish) */}
                            <div className="bg-[#FAEBEB] rounded-2xl p-8 lg:p-10 flex flex-col items-center text-center transition-transform hover:-translate-y-1">
                                <div className="text-[#F59E0B] mb-5">
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M9 18h6" />
                                        <path d="M10 22h4" />
                                        <path d="M12 2v1" />
                                        <path d="M12 7a5 5 0 1 1-2.9 8.95L8 18h8l-1.1-2.05A5 5 0 0 1 12 7z" />
                                    </svg>
                                </div>
                                <h3 className="font-serif text-[22px] font-bold text-[#F59E0B] mb-4">National Expansion</h3>
                                <p className="text-[#001A41] leading-loose text-[15px] md:text-base font-medium">
                                    Reach every state in Nigeria
                                    within 3 years, creating
                                    regional competition hubs.
                                </p>
                            </div>

                            {/* Card 2: Scholarship Fund (Greyish) */}
                            <div className="bg-[#E5E9ED] rounded-2xl p-8 lg:p-10 flex flex-col items-center text-center transition-transform hover:-translate-y-1">
                                <div className="text-[#F59E0B] mb-5">
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                                    </svg>
                                </div>
                                <h3 className="font-serif text-[22px] font-bold text-[#F59E0B] mb-4">Scholarship Fund</h3>
                                <p className="text-[#001A41] leading-loose text-[15px] md:text-base font-medium">
                                    Build a sustainable
                                    scholarship endowment
                                    fund supporting 1,000+
                                    students annually.
                                </p>
                            </div>

                            {/* Card 3: Digital Learning (Light Pinkish) */}
                            <div className="bg-[#EBE5E5] rounded-2xl p-8 lg:p-10 flex flex-col items-center text-center transition-transform hover:-translate-y-1">
                                <div className="text-[#F59E0B] mb-5">
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10" />
                                        <circle cx="12" cy="12" r="6" />
                                        <circle cx="12" cy="12" r="2" />
                                    </svg>
                                </div>
                                <h3 className="font-serif text-[22px] font-bold text-[#F59E0B] mb-4">Digital Learning</h3>
                                <p className="text-[#001A41] leading-loose text-[15px] md:text-base font-medium">
                                    Launch an integrated e-
                                    learning platform providing
                                    free academic resources to
                                    all registered students.
                                </p>
                            </div>

                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="py-12 lg:py-24 bg-slate-50 border-t border-slate-200">
                    <div className="container mx-auto px-4 max-w-3xl">
                        <h2 className="font-serif text-3xl md:text-5xl font-bold text-center mb-4 text-[#001A41]">Frequently Asked <span className="text-[#F59E0B] underline decoration-[#F59E0B]/50 underline-offset-8">Questions</span></h2>
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
                                    <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-[#001A41] font-bold">
                                        <h3 className="text-lg">{faq.q}</h3>
                                        <span className="relative size-5 shrink-0">
                                            <svg className="absolute inset-0 size-5 opacity-100 group-open:opacity-0 transition-opacity text-[#001A41]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                            </svg>
                                            <svg className="absolute inset-0 size-5 opacity-0 group-open:opacity-100 transition-opacity text-[#001A41]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
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

                {/* A Message From Founder Section */}
                <section className="py-12 lg:py-24 mb-16 bg-[#0B2144] overflow-hidden">
                    <div className="container mx-auto px-4 max-w-4xl flex flex-col items-center text-center">
                        <h2 className="font-serif text-3xl md:text-[38px] font-bold text-white mb-16 tracking-wide drop-shadow-md">
                            A Message From Founder
                        </h2>

                        {/* Founder Image Placeholder */}
                        <div className="w-32 h-32 md:w-36 md:h-36 bg-white rounded-full mb-12 shadow-xl flex items-center justify-center overflow-hidden relative">
                            {/* TODO: Add founder image here once provided */}
                        </div>

                        {/* Quote */}
                        <p className="text-[16px] md:text-[17px] text-gray-100 font-medium leading-relaxed mb-10 max-w-3xl drop-shadow-sm px-4 md:px-0">
                            "Every child deserves a chance to prove their worth beyond circumstances. iRev is not just a competition, it's a movement to reshape how we discover and nurture talent in Africa."
                        </p>

                        <p className="text-[#F59E0B] font-bold text-lg md:text-xl tracking-wide">
                            Founder, iRev
                        </p>
                    </div>
                </section>


            </main>

            {/* Global Footer */}
            <Footer topBgColor="#ffffff" />
        </div>
    )
}
