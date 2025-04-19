"use client"

import type * as React from "react"
import { Play, Calendar, Newspaper, Radio, Headphones, BookOpen} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { PolygonIcon } from "./Icons/PolygonIcon"
import Link from "next/link"

interface AdBoxProps extends React.HTMLAttributes<HTMLDivElement> {
    stationName?: string
    isLive?: boolean
}

export function AdBox({ className, stationName = "ABR Live Radio", isLive = true, ...props }: AdBoxProps) {
    return (
        <div
            className={cn(
                "flex w-full flex-wrap items-center justify-between gap-2 rounded-none bg-black text-white shadow-md md:flex-nowrap container mx-auto px-auto ",
                className,
            )}
            {...props}
        >
            

            <div className="flex flex-row items-center space-x-[60px]"
                style={{ backgroundImage: "url('assets/adcover.png')" }}

            >
                <Button variant="destructive" className="flex items-center rounded rounded-full h-8 w-4 m-3" >
                    <PolygonIcon />
                </Button>

                <div className="flex flex-col items-start">
                    <span className="text-sm font-medium text-white">Listen to {stationName}</span>
                    {isLive && <span className="text-xs uppercase tracking-wider text-white">ON AIR</span>}
                </div>
                <Button variant="ghost" size="sm" className="hidden items-center gap-1 text-white md:flex hover:bg-sticky bg-sticky hover:text-white cursor-pointer">
                    <Calendar className="h-4 w-4" />
                    <span>View schedules</span>
                </Button>

            </div>
            
            <Separator orientation="vertical" className="h-5 w-1 bg-red-500" />
            <div className="flex flex-grow justify-end gap-4 h-[40px] w-[130px] bg-black bg-cover">
                <Link href="/podcast">
                    <Button variant="ghost" size="sm" className="hidden items-center gap-1 text-white md:flex hover:bg-black hover:text-white cursor-pointer">
                        <Newspaper className="h-4 w-4" />
                        <span>Latest News</span>
                    </Button>
                </Link>

            <Link href="/episode">
                <Button variant="ghost" size="sm" className="hidden items-center gap-1 text-white md:flex hover:bg-black hover:text-white cursor-pointer">
                    <Radio className="h-4 w-4" />
                    <span>New Episodes</span>
                </Button>
            </Link>
                  
            <Link href="/service">
                <Button variant="ghost" size="sm" className="hidden items-center gap-1 text-white md:flex hover:bg-black hover:text-white cursor-pointer">
                    <BookOpen className="h-4 w-4" />
                    <span>Our Services</span>
                </Button>
                </Link>
            <Link href="/all-podcast">  
                <Button variant="ghost" size="sm" className="hidden items-center gap-1 text-white md:flex hover:bg-black hover:text-white cursor-pointer">
                    <Headphones className="h-4 w-4" />
                    <span>All Podcasts</span>
                </Button>
            </Link>
            </div>
        </div>
    )
}
