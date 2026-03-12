import Image from "next/image"
import Link from "next/link"
import { Facebook, Instagram, Youtube, Twitter } from "lucide-react"

export function Footer({ topBgColor = "#ffffff" }: { topBgColor?: string }) {
    return (
        <footer className="relative bg-[#112441] text-white pt-20 pb-12 overflow-hidden w-full min-h-[500px]">
            {/* Top-Left Curve with White background & Yellow swoosh */}
            <div className="absolute top-0 left-0 w-full sm:w-[90%] lg:w-[80%] h-[240px] sm:h-[250px] lg:h-[350px] overflow-hidden leading-[0] z-0 pointer-events-none origin-top-left">
                <svg viewBox="0 0 1000 350" className="w-full h-full" preserveAspectRatio="none">
                    {/* The White cut-out curve from the top */}
                    <path d="M0,0 L1000,0 C600,0 300,50 0,350 Z" fill={topBgColor} />
                    {/* The Yellow swoosh under the white */}
                    <path d="M0,350 C300,50 600,0 1000,0 L1000,30 C600,30 300,80 0,350 Z" fill="#F59E0B" />
                </svg>
            </div>

            {/* Bottom-Right Yellow Swoosh */}
            <div className="absolute bottom-[-10px] right-0 w-[400px] h-[150px] md:h-[180px] overflow-hidden leading-[0] z-0 pointer-events-none">
                <svg viewBox="0 0 400 180" className="w-full h-full" preserveAspectRatio="none">
                    <path d="M0,180 C150,150 250,80 400,0 L400,180 Z" fill="#F59E0B" />
                </svg>
            </div>

            {/* Logo Container on the Left */}
            <div className="absolute left-0 top-[35%] w-[160px] h-[130px] md:w-[220px] md:h-[180px] bg-[#3B4C6A]/60 rounded-r-[100px] z-10 hidden lg:flex items-center pl-10 shadow-lg blur-[0.5px]">
                <Image
                    src="/irev-logo.jpg"
                    alt="iRev Logo"
                    width={80}
                    height={80}
                    className="rounded-full shadow-lg mix-blend-screen relative -left-2"
                />
            </div>

            {/* Main Content Area */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-10 relative z-20 h-full flex flex-col justify-between pt-16 lg:pl-[240px]">
                
                {/* 3 Main Columns aligned to the Right */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-row justify-end gap-10 lg:gap-24 text-[14px]">

                    {/* Support */}
                    <div className="w-full sm:w-auto lg:w-[180px]">
                        <h4 className="text-[#F59E0B] font-bold text-[19px] mb-6 tracking-wide">Support</h4>
                        <ul className="space-y-4 text-[#D1D5DB] font-medium tracking-wide">
                            <li><Link href="/#faq" className="hover:text-white transition-colors">FAQ</Link></li>
                            <li><Link href="/#contact" className="hover:text-white transition-colors">Contact us</Link></li>
                            <li><Link href="/#terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
                            <li><Link href="/#privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div className="w-full sm:w-auto lg:w-[180px]">
                        <h4 className="text-[#F59E0B] font-bold text-[19px] mb-6 tracking-wide">Quick Links</h4>
                        <ul className="space-y-4 text-[#D1D5DB] font-medium tracking-wide">
                            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-white rounded-full" /><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-white rounded-full" /><Link href="/#how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
                            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-white rounded-full" /><Link href="/#categories" className="hover:text-white transition-colors">Categories</Link></li>
                            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-white rounded-full" /><Link href="/#prizes" className="hover:text-white transition-colors">Prizes</Link></li>
                            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-white rounded-full" /><Link href="/#leaderboard" className="hover:text-white transition-colors">Leaderboard</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="w-full sm:col-span-2 lg:col-span-1 sm:w-auto lg:w-[200px]">
                        <h4 className="text-[#F59E0B] font-bold text-[19px] mb-6 tracking-wide">Contact</h4>
                        <ul className="space-y-6 text-[#D1D5DB] font-medium tracking-wide">
                            <li className="flex items-center gap-3">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#F59E0B]" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                                <span>info@irev.ng</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#F59E0B]" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                                <span>+234 800 000 0000</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#F59E0B]" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                                <span>Lagos, Nigeria</span>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Bottom section: Left text and Right Socials */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mt-14 md:mt-20 lg:mt-24 lg:-ml-[240px]">
                    
                    {/* Left text */}
                    <div className="max-w-[500px] mb-10 lg:mb-0">
                        <p className="mb-2 leading-relaxed text-[15px] text-[#E2E8F0] tracking-wide">
                            Intellectual Revolution : A 3-Stage Scholarship
                        </p>
                        <p className="leading-relaxed mb-10 text-[15px] text-[#E2E8F0] tracking-wide">
                            Competition empowering future leaders across Nigeria.
                        </p>
                        <p className="text-[12px] text-[#9CA3AF] tracking-wider mt-8 md:pl-2">
                            &copy; 2026 Intellectual Revolution (iRev). All rights reserved.
                        </p>
                    </div>

                    {/* Right text & icons */}
                    <div className="mb-2 lg:mb-8 lg:pr-14 relative lg:bottom-10">
                        <p className="mb-5 text-white text-[14px] tracking-wide pl-1">Follow Us</p>
                        <div className="flex gap-4">
                            <Link href="#" className="w-10 h-10 rounded-full border border-slate-400 flex items-center justify-center hover:bg-[#F59E0B] hover:border-[#F59E0B] hover:text-[#0A1930] transition-colors text-[#E2E8F0]">
                                <Facebook className="w-4 h-4" strokeWidth={1.5} />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-full border border-slate-400 flex items-center justify-center hover:bg-[#F59E0B] hover:border-[#F59E0B] hover:text-[#0A1930] transition-colors text-[#E2E8F0]">
                                <Instagram className="w-4 h-4" strokeWidth={1.5} />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-full border border-slate-400 flex items-center justify-center hover:bg-[#F59E0B] hover:border-[#F59E0B] hover:text-[#0A1930] transition-colors text-[#E2E8F0]">
                                <Youtube className="w-4 h-4" strokeWidth={1.5} />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-full border border-slate-400 flex items-center justify-center hover:bg-[#F59E0B] hover:border-[#F59E0B] hover:text-[#0A1930] transition-colors text-[#E2E8F0]">
                                <Twitter className="w-4 h-4" strokeWidth={1.5} />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-full border border-slate-400 flex items-center justify-center hover:bg-[#F59E0B] hover:border-[#F59E0B] hover:text-[#0A1930] transition-colors text-[#E2E8F0]">
                                {/* TikTok SVG Icon */}
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                                </svg>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </footer>
    )
}
