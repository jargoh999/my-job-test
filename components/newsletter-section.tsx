import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function NewsletterSection() {
  return (
    <div className="bg-pink-50 py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-6 md:mb-0">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Never stop learning!</h2>
            <p className="text-gray-600 mb-4">
              Join our newsletter to stay up to date with the latest trends and opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <Button className="bg-red-600 hover:bg-red-700">Sign Up</Button>
            </div>
          </div>
          <div className="md:w-1/3 relative h-40 w-full md:h-48">
            <Image
              src="/placeholder.svg?height=192&width=300"
              alt="Newsletter illustration"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
