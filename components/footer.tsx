import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { Instagram, Facebook, Twitter, MapPin, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full bg-[#1a1a1a] text-white">
      <div className="container mx-auto px-4 py-6">
        {/* Logo Section */}
        <div className="mb-8">
          <Link href="/">
            <div className="flex items-center">
              {/* Placeholder for logo - replace with your actual logo */}
              <div className="relative h-16 w-16 overflow-hidden">
                <Image src="/assets/abr.png" alt="ABR Logo" fill className="object-contain  " />
              </div>
            </div>
          </Link>
        </div>

        {/* Navigation and Social Links */}
        <div className="flex flex-col md:flex-row md:items-center justify-between py-4">
          {/* Main Navigation */}
          <nav className="flex flex-wrap items-center space-x-0 md:space-x-2">
            <NavLink href="/">HOME</NavLink>
            <Divider />
            <NavLink href="/about-us">ABOUT US</NavLink>
            <Divider />
            <NavLink href="/contact-us">CONTACT US</NavLink>
            <Divider />
            <NavLink href="/all-podcast">ALL PODCAST</NavLink>
            <Divider />
            <NavLink href="/advertise">ADVERTISE</NavLink>
            <Divider />
            <NavLink href="/resources">RESOURCES</NavLink>
            <Divider />
            <NavLink href="/connect">CONNECT WITH ABR</NavLink>
          </nav>

          {/* Social Media Icons */}
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <SocialLink href="https://instagram.com" icon={<Instagram size={20} />} label="Instagram" />
            <SocialLink href="https://facebook.com" icon={<Facebook size={20} />} label="Facebook" />
            <SocialLink href="https://twitter.com" icon={<Twitter size={20} />} label="Twitter" />
            <SocialLink href="/location" icon={<MapPin size={20} />} label="Location" />
            <SocialLink href="https://linkedin.com" icon={<Linkedin size={20} />} label="LinkedIn" />
          </div>
        </div>

        {/* Copyright Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pt-4 text-sm">
          <div>© Copyright 2021. All Rights Reserved.</div>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <Link href="/terms" className="hover:underline">
              Terms & conditions
            </Link>
            <Link href="/privacy" className="hover:underline">
              Privacy policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Helper Components
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="px-2 py-1 text-sm font-medium hover:text-gray-300 transition-colors">
      {children}
    </Link>
  )
}

function Divider() {
  return <span className="hidden md:inline text-gray-600 mx-1">|</span>
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link href={href} aria-label={label} className="text-white hover:text-gray-300 transition-colors">
      {icon}
    </Link>
  )
}
