"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

interface NavbarProps {
    activePage?: "home" | "about" | "how-it-works" | "stages" | "category" | "prizes" | "contact"
}

export function Navbar({ activePage = "home" }: NavbarProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <Link href="/" className="inline-block hover:opacity-90 transition-opacity">
                        <Image
                            src="/irev-logo.jpg"
                            alt="iRev Logo"
                            width={120}
                            height={48}
                            className="object-contain h-10 w-auto md:h-12"
                            priority
                        />
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8 font-medium">
                    <Link
                        href="/"
                        className={`transition-colors ${activePage === "home" ? "text-[#001A41] font-bold" : "text-[#001A41] font-medium hover:text-[#001A41]/80"}`}
                    >
                        Home
                    </Link>
                    <Link
                        href="/about"
                        className={`transition-colors ${activePage === "about" ? "text-[#F59E0B] font-bold" : "text-[#001A41] font-medium hover:text-[#001A41]/80"}`}
                    >
                        About
                    </Link>
                    <Link
                        href="/how-it-works"
                        className={`transition-colors ${activePage === "how-it-works" ? "text-[#F59E0B] font-bold" : "text-[#001A41] font-medium hover:text-[#001A41]/80"}`}
                    >
                        How it works
                    </Link>
                    <Link
                        href="/stages"
                        className={`transition-colors ${activePage === "stages" ? "text-[#F59E0B] font-bold" : "text-[#001A41] font-medium hover:text-[#001A41]/80"}`}
                    >
                        Stages
                    </Link>
                    <Link
                        href="/category"
                        className={`transition-colors ${activePage === "category" ? "text-[#F59E0B] font-bold" : "text-[#001A41] font-medium hover:text-[#001A41]/80"}`}
                    >
                        Category
                    </Link>
                    <Link
                        href="/prizes"
                        className={`transition-colors ${activePage === "prizes" ? "text-[#F59E0B] font-bold" : "text-[#001A41] font-medium hover:text-[#001A41]/80"}`}
                    >
                        Prizes
                    </Link>
                    <Link
                        href="/contact"
                        className={`transition-colors ${activePage === "contact" ? "text-[#F59E0B] font-bold" : "text-[#001A41] font-medium hover:text-[#001A41]/80"}`}
                    >
                        Contact
                    </Link>
                </nav>

                {/* Desktop Auth Buttons */}
                <div className="hidden md:flex items-center gap-4">
                    <Link href="/login" className="text-sm font-medium hover:text-accent transition-colors">
                        Log in
                    </Link>
                    <Link href="/register">
                        <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-6 rounded shadow-md">
                            Register
                        </Button>
                    </Link>
                </div>

                {/* Mobile Hamburger Toggle */}
                <div className="md:hidden flex items-center">
                    <button
                        onClick={toggleMenu}
                        className="text-[#001A41] p-2 focus:outline-none"
                        aria-label="Toggle Menu"
                    >
                        {isMobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-20 left-0 w-full bg-white shadow-xl border-b border-gray-100 flex flex-col py-6 px-4 gap-6 animate-in slide-in-from-top-2 duration-200 z-50">
                    <nav className="flex flex-col gap-5 text-lg text-center">
                        <Link
                            href="/"
                            onClick={toggleMenu}
                            className={`transition-colors ${activePage === "home" ? "text-[#001A41] font-bold" : "text-[#001A41] font-medium"}`}
                        >
                            Home
                        </Link>
                        <Link
                            href="/about"
                            onClick={toggleMenu}
                            className={`transition-colors ${activePage === "about" ? "text-[#F59E0B] font-bold" : "text-[#001A41] font-medium"}`}
                        >
                            About
                        </Link>
                        <Link href="/how-it-works" onClick={toggleMenu} className={`transition-colors ${activePage === "how-it-works" ? "text-[#F59E0B] font-bold" : "text-[#001A41] font-medium"}`}>
                            How it works
                        </Link>
                        <Link href="/stages" onClick={toggleMenu} className={`transition-colors ${activePage === "stages" ? "text-[#F59E0B] font-bold" : "text-[#001A41] font-medium"}`}>
                            Stages
                        </Link>
                        <Link
                            href="/category"
                            onClick={toggleMenu}
                            className={`transition-colors ${activePage === "category" ? "text-[#F59E0B] font-bold" : "text-[#001A41] font-medium"}`}
                        >
                            Category
                        </Link>
                        <Link href="/prizes" onClick={toggleMenu} className={`transition-colors ${activePage === "prizes" ? "text-[#F59E0B] font-bold" : "text-[#001A41] font-medium"}`}>
                            Prizes
                        </Link>
                        <Link
                            href="/contact"
                            onClick={toggleMenu}
                            className={`transition-colors ${activePage === "contact" ? "text-[#F59E0B] font-bold" : "text-[#001A41] font-medium"}`}
                        >
                            Contact
                        </Link>
                    </nav>
                    <div className="flex flex-col gap-3 mt-4 pt-6 border-t border-gray-100">
                        <Link href="/login" onClick={toggleMenu} className="w-full text-center">
                            <Button variant="outline" className="w-full text-[#001A41] border-[#001A41] h-12">
                                Log in
                            </Button>
                        </Link>
                        <Link href="/register" onClick={toggleMenu} className="w-full text-center">
                            <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold h-12 rounded shadow-md">
                                Register
                            </Button>
                        </Link>
                    </div>
                </div>
            )}
        </header>
    )
}
