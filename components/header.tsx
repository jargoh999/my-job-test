"use client"

import { useState, useEffect, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState, AppDispatch } from "@/lib/redux/store"
import { searchPodcasts } from "@/lib/redux/slices/podcastSlice"
import Image from "next/image"
import Link from "next/link"
import { Search, Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SearchResults {
  data: any[];
  // Add more specific types if known
}

const navItems = [
  { label: "Home", href: "/" },
  { label: "Company", href: "#", hasDropdown: true },
  { label: "Resources", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Advertise", href: "/careers" },
]
export default function Header() {
  const [searchQuery, setSearchQuery] = useState('')
  const dispatch = useDispatch<AppDispatch>()
  const searchResults = useSelector((state: RootState) => state.podcasts.searchResults) as unknown as SearchResults | null
  const loading = useSelector((state: RootState) => state.podcasts.loading)
  const error = useSelector((state: RootState) => state.podcasts.error)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showSearchResults, setShowSearchResults] = useState(false)

  useEffect(() => {
    // Only search if query is at least 3 characters long
    if (searchQuery.length >= 3) {
      dispatch(searchPodcasts({
        query: searchQuery,
        page: 1,
        perPage: 10
      }))
      setShowSearchResults(true);
    } else {
      // Clear search results if query is too short
      dispatch(searchPodcasts({ query: '', page: 1, perPage: 10 }))
      setShowSearchResults(false);
    }
  }, [searchQuery, dispatch])

  useEffect(() => {
    // Clear search query and hide results after loading is complete and there are no results
    if (!loading && (!searchResults?.data || searchResults.data.length === 0)) {
      setSearchQuery('');
      setShowSearchResults(false);
    }
  }, [loading, searchResults])

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="relative h-8 w-24">
                <Image
                  src="/assets/ABR%20Logo%201.png"
                  alt="GTBank Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-13">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="text-sm font-bold text-black hover:text-orange-600 flex items-center"
              >
                {item.label}
                {item.hasDropdown && <ChevronDown className="ml-1 h-4 w-4" />}
              </Link>
            ))}
          </nav>

          {/* Search and Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#FFFFFF]" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-full bg-[#ababab] text-md focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder:text-[#FFFFFF]"
              />
              {/* Search Results Section */}
              <div className="absolute z-50 w-full left-0 mt-2">
                {loading && (
                  <div className="p-4 text-center text-gray-500">Searching...</div>
                )}

                {error && (
                  <div className="p-4 text-center text-red-500">{error}</div>
                )}

                {showSearchResults && searchResults?.data && searchResults.data.length > 0 && (
                  <div className="bg-white border border-gray-200 rounded-lg shadow-lg max-h-[500px] overflow-y-auto">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                      {searchResults.data.slice(0, 12).map((podcast: any) => (
                        <Link
                          key={podcast.id}
                          href={`/podcast`}
                          className="group relative block bg-white rounded-lg shadow-md overflow-hidden 
                                     transition-all duration-300 hover:shadow-xl hover:scale-105"
                          onClick={() => {
                            setSearchQuery('');
                            setShowSearchResults(false);
                          }}
                        >
                          <div className="relative">
                            <img
                              src={podcast.picture_url || "/placeholder.svg"}
                              alt={podcast.title}
                              className="w-full h-32 object-cover transition-transform duration-300 
                                         group-hover:brightness-75"
                            />
                          </div>
                          <div className="p-2">
                            <h3 className="text-xs font-semibold truncate mb-1">{podcast.title}</h3>
                            <p className="text-[10px] text-gray-500 truncate">{podcast.description}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-orange-600 focus:outline-none"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 py-3 space-y-3">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="block text-sm font-medium text-gray-700 hover:text-orange-600 py-2"
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-gray-200">
              <Button variant="outline" className="w-full mb-2 text-sm">
                Sign In
              </Button>
              <Button className="w-full bg-orange-600 hover:bg-orange-700 text-sm">Register</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
