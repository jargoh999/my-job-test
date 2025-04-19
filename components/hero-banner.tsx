import Image from "next/image"

interface HeroBannerProps {
  title: string
  imageUrl: string
  bgColor?: string
}

export default function HeroBanner({ title, imageUrl, bgColor = "bg-white" }: HeroBannerProps) {
  return (
    <div
      className={`flex w-full h-[270px] items-center justify-center ${bgColor}`}
    // Adjust h-[80px] to match your AdBox if needed
    >
      <div className="flex items-center justify-center h-full w-full">
        <div className="relative h-[200px] w-[1000px]">
          <Image
            src={imageUrl || "/assets/first-monie.png"}
            alt={title}
            width={1000}
            height={130}
            className="object-contain mt-[20px]"
            priority
          />
          <span className="absolute top-0 right-0 text-black text-sm font-sm z-10 mb-8">
            Advertisement
          </span>
        </div>
      </div>
    </div>
  )
}