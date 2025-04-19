import Image from "next/image"

export default function OurPartner() {
    return (
        <div className="w-full container mx-auto flex flex-col items-center justify-center bg-white py-8">
            <h2 className="text-4xl font-bold text-[#333333] mb-8 text-center">OUR GLOBAL PARTNERS</h2>
            <div className="w-full">
                <Image
                    src="/assets/allsupporter.png"
                    alt="Global Partners"
                    layout="responsive"
                    height={600}
                    width={1200}
                    className="object-contain"
                />
            </div>
        </div>
    )
}