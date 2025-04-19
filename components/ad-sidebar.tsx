import Image from "next/image"

export default function AdSidebar() {
    return (
        <div className="space-y-6 h-[300px]">
            <div className="text-xs  font-medium text-gray-500 mb-2">ADVERTISEMENT</div>

            {/* First ad */}
            <div className="border rounded-none overflow-hidden">
                <Image
                    src="/assets/mtn.png"
                    alt="Advertisement"
                    width={400}
                    height={300}
                    className="w-full h-[500px]"
                />
            </div>

            {/* Second ad */}
            <div className="border rounded-none overflow-hidden">
                <Image
                    src="/assets/mtn.png"
                    alt="Advertisement"
                    width={400}
                    height={300}
                    className="w-full h-[500px]"
                />
            </div>
        </div>
    )
}
