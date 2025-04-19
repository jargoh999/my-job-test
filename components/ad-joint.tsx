import Image from "next/image"

export default function Adjoint() {
    return (
        <div className="w-full container mx-auto h-[350px] bg-white flex items-center justify-center">
            <Image
                src="/assets/ad.png"
                alt="ad"
                height={800}
                width={800}
                className="object-cover transition-all"
              />
        </div>
    )
}