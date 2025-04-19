'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/lib/redux/store';
import {
  fetchTopPodcasts,
  fetchTrendingEpisodes
} from '@/lib/redux/slices/podcastSlice';
import { fetchTopCategories } from '@/lib/redux/slices/categorySlice';

import HeroBanner from "@/components/hero-banner"
import CategorySection from "@/components/category-section"
import PartnersSection from "@/components/partners-section"
import NewsletterSection from "@/components/newsletter-section"
import { featuredContent, recentlyAdded, jobCategories, educational, development, fintech } from "@/data/content"
import { AdBox } from "@/components/ad-box"
import Adjoint from "@/components/ad-joint"
import CategoryBox from "@/components/category-box"
import EditorsPicksSection from "@/components/editor-section"
import EpisodeList from "@/components/episode"
import NewsCards from "@/components/news-category"
import PodcastCarousel from "@/components/podcast"
import EduCards from "@/components/educational-pod"
import EntCards from "@/components/entertainment-section"
import TechCards from "@/components/tech"
import OtherCards from "@/components/other-card"
import Reachout from "@/components/reachout"
import OurPartner from "@/components/our-partner"

export default function Home() {
  return (
    <div className="space-y-[70px]">

      <HeroBanner
        title="Everyday Transaction with Ease"
        imageUrl="/assets/first-monie.png"
      />
      <EditorsPicksSection />
      <PodcastCarousel />
      <EpisodeList />
      <CategoryBox />
      <NewsCards />
      <Adjoint />
      <EduCards />
      <EntCards />
      <TechCards />
      <OtherCards />
      <Reachout />
      <OurPartner />
    </div>
  )
}
