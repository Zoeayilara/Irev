import Image from "next/image"
import Link from "next/link"
import { Facebook, Instagram, Youtube, Twitter } from "lucide-react"

export function Footer({ topBgColor = "#F8F9FA" }: { topBgColor?: string }) {
    return (
        <footer className="relative bg-[#0A1930] text-white pt-32 pb-12 overflow-hidden mt-0">
            {/* Massive SVG Curve Divider matching the design */}
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
                <svg viewBox="0 0 1440 250" className="w-full h-auto" preserveAspectRatio="none">
                    {/* Background area above the curve to blend with the previous section. Can be changed via topBgColor */}
                    <path d="M0,0 L1440,0 L1440,250 C1000,100 500,200 0,250 Z" fill={topBgColor} />
                    {/* Dark Navy main thick curved body */}
                    <path d="M0,250 C500,200 1000,100 1440,250 L1440,300 L0,300 Z" fill="#0A1930" />
                    {/* The sweeping yellow accent curve */}
                    <path d="M-50,220 C400,0 900,-20 1440,110 C900,-10 400,20 -50,250 Z" fill="#F59E0B" />
                </svg>
            </div>

            {/* Decorative semi-circle on the left edge for the Logo (Absolute positioning) */}
            <div className="absolute left-[-20px] top-[40%] md:top-[38%] w-[220px] h-[180px] bg-[#3B4C6A]/60 rounded-r-full blur-[2px] z-0 flex items-center pl-10 hidden md:flex">
                <Image
                    src="/irev-logo.jpg"
                    alt="iRev Logo"
                    width={70}
                    height={70}
                    className="rounded-full shadow-lg relative z-10 mix-blend-screen"
                />
            </div>

            <div className="container mx-auto px-4 lg:px-24 relative z-10 md:pl-[280px]">
                {/* Main Footer Content Grid - 3 columns shifted to the right */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20 text-[15px]">

                    {/* Support */}
                    <div>
                        <h4 className="text-[#F59E0B] font-bold text-lg mb-6 tracking-wide">Support</h4>
                        <ul className="space-y-4 text-slate-300">
                            <li><Link href="/#faq" className="hover:text-white transition-colors">FAQ</Link></li>
                            <li><Link href="/#contact" className="hover:text-white transition-colors">Contact us</Link></li>
                            <li><Link href="/#terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
                            <li><Link href="/#privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-[#F59E0B] font-bold text-lg mb-6 tracking-wide">Quick Links</h4>
                        <ul className="space-y-4 text-slate-300">
                            <li className="flex items-center gap-2"><div className="w-1 h-1 bg-white rounded-full" /><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                            <li className="flex items-center gap-2"><div className="w-1 h-1 bg-white rounded-full" /><Link href="/#how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
                            <li className="flex items-center gap-2"><div className="w-1 h-1 bg-white rounded-full" /><Link href="/#categories" className="hover:text-white transition-colors">Categories</Link></li>
                            <li className="flex items-center gap-2"><div className="w-1 h-1 bg-white rounded-full" /><Link href="/#prizes" className="hover:text-white transition-colors">Prizes</Link></li>
                            <li className="flex items-center gap-2"><div className="w-1 h-1 bg-white rounded-full" /><Link href="/#leaderboard" className="hover:text-white transition-colors">Leaderboard</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-[#F59E0B] font-bold text-lg mb-6 tracking-wide">Contact</h4>
                        <ul className="space-y-6 text-slate-300">
                            <li className="flex items-center gap-3 text-[#F59E0B]">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                                <span className="text-slate-300">info@irev.ng</span>
                            </li>
                            <li className="flex items-center gap-3 text-[#F59E0B]">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                                <span className="text-slate-300">+234 800 000 0000</span>
                            </li>
                            <li className="flex items-center gap-3 text-[#F59E0B]">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                                <span className="text-slate-300">Lagos, Nigeria</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom row: Text and Socials */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 md:-ml-[260px] relative z-10 pt-10 border-t border-white/10 text-slate-300 font-light text-sm">
                    {/* Left text aligned with Logo via negative margin */}
                    <div className="max-w-md">
                        <p className="mb-1 leading-relaxed text-[15px]">Intellectual Revolution : A 3-Stage Scholarship</p>
                        <p className="leading-relaxed mb-6 text-[15px]">Competition empowering future leaders across Nigeria.</p>
                        <p className="text-xs text-slate-500">© {new Date().getFullYear()} iRev. All rights reserved.</p>
                    </div>

                    {/* Right text aligned naturally flex-row justify-between */}
                    <div className="relative bottom-4">
                        <p className="mb-4 text-slate-300 font-medium tracking-wide">Follow Us</p>
                        <div className="flex gap-4">
                            <Link href="#" className="w-10 h-10 rounded-full border border-slate-500 flex items-center justify-center hover:bg-[#F59E0B] hover:border-[#F59E0B] hover:text-[#0A1930] transition-all">
                                <Facebook className="w-4 h-4" />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-full border border-slate-500 flex items-center justify-center hover:bg-[#F59E0B] hover:border-[#F59E0B] hover:text-[#0A1930] transition-all">
                                <Instagram className="w-4 h-4" />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-full border border-slate-500 flex items-center justify-center hover:bg-[#F59E0B] hover:border-[#F59E0B] hover:text-[#0A1930] transition-all">
                                <Youtube className="w-4 h-4" />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-full border border-slate-500 flex items-center justify-center hover:bg-[#F59E0B] hover:border-[#F59E0B] hover:text-[#0A1930] transition-all">
                                <Twitter className="w-4 h-4" />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-full border border-slate-500 flex items-center justify-center hover:bg-[#F59E0B] hover:border-[#F59E0B] hover:text-[#0A1930] transition-all">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
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
