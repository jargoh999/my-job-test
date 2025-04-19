import type React from "react"
import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { AdBox } from "@/components/ad-box"
import HeroBanner from "@/components/hero-banner"
import EditorsPicksSection from "@/components/editor-section"
import PodcastCarousel from "@/components/podcast"
import EpisodeList from "@/components/episode"
import CategoryBox from "@/components/category-box"
import NewsCards from "@/components/news-category"
import Adjoint from "@/components/ad-joint"
import { Providers } from "./provider"

const montserrat = Montserrat({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ayomide abdulrahman copyright @2025",
  description: "ayomide abdulrahman copyright @2025",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={montserrat.className}>
      <body className="">
        <Providers>
          <Header />
          <AdBox />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
