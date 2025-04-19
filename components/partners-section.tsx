import Image from "next/image"

const partners = [
  { name: "World Bank", logo: "/placeholder.svg?height=40&width=100" },
  { name: "Thomson Foundation", logo: "/placeholder.svg?height=40&width=100" },
  { name: "Sunbird", logo: "/placeholder.svg?height=40&width=100" },
  { name: "Pearson", logo: "/placeholder.svg?height=40&width=100" },
  { name: "University", logo: "/placeholder.svg?height=40&width=100" },
  { name: "Edx", logo: "/placeholder.svg?height=40&width=100" },
  { name: "Coursera", logo: "/placeholder.svg?height=40&width=100" },
  { name: "MIT", logo: "/placeholder.svg?height=40&width=100" },
  { name: "Partner 9", logo: "/placeholder.svg?height=40&width=100" },
  { name: "Partner 10", logo: "/placeholder.svg?height=40&width=100" },
]

export default function PartnersSection() {
  return (
    <div className="bg-white py-8 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-lg font-bold text-gray-900 uppercase mb-6">OUR GLOBAL PARTNERS</h2>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-6 items-center justify-items-center">
          {partners.map((partner, index) => (
            <div key={index} className="relative h-10 w-24">
              <Image
                src={partner.logo || "/placeholder.svg"}
                alt={partner.name}
                fill
                className="object-contain grayscale hover:grayscale-0 transition-all"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
