// components/room-card.tsx
"use client"

import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bed, Users, Maximize, Eye } from "lucide-react"
import Link from "next/link"

interface Room {
  id: number
  name: string
  description: string
  price: number
  capacity: number
  size: string
  bedType: string
  amenities: string[]
  image: string
}

export function RoomCard({ room }: { room: Room }) {
  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  return (
    <Card className="overflow-hidden bg-white group p-0">
      {/* Image */}
      <Link href={`/rooms/${room.id}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={room.image || "/placeholder-room.jpg"}
            alt={room.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#5C0A1E]/60 to-transparent" />

          {/* 360 View Button */}
          <Button 
            size="sm" 
            className="absolute top-4 right-4 bg-[#D4AF37] text-[#5C0A1E] hover:bg-[#F5E6C8] shadow-lg z-10"
            asChild
          >
            <Link href={`/rooms/${room.id}`}>
              <Eye className="w-4 h-4 mr-2" />
              360° Tour
            </Link>
          </Button>

          {/* Price Tag */}
          <div className="absolute bottom-4 left-4">
            <span className="bg-[#D4AF37] text-[#5C0A1E] px-4 py-2 rounded font-bold">
              ₱{formatPrice(room.price)}
              <span className="text-xs font-normal">/night</span>
            </span>
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-serif font-bold text-xl text-[#5C0A1E] mb-2">
          {room.name}
        </h3>
        <p className="text-[#5C0A1E]/70 text-sm mb-4 line-clamp-2">
          {room.description}
        </p>

        {/* Room Details */}
        <div className="flex flex-wrap gap-3 mb-4 text-sm text-[#5C0A1E]/70">
          <span className="flex items-center gap-1">
            <Bed className="w-4 h-4 text-[#D4AF37]" />
            {room.bedType}
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-4 h-4 text-[#D4AF37]" />
            {room.capacity} Guests
          </span>
          <span className="flex items-center gap-1">
            <Maximize className="w-4 h-4 text-[#D4AF37]" />
            {room.size}
          </span>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-6">
          {room.amenities.slice(0, 3).map((amenity, i) => (
            <span 
              key={i} 
              className="px-2 py-1 bg-[#F5E6C8] text-[#5C0A1E] text-xs rounded"
            >
              {amenity}
            </span>
          ))}
          {room.amenities.length > 3 && (
            <span className="px-2 py-1 bg-[#F5E6C8] text-[#5C0A1E] text-xs rounded">
              +{room.amenities.length - 3} more
            </span>
          )}
        </div>

        {/* View Details Button */}
        <Button 
          className="w-full bg-[#5C0A1E] hover:bg-[#8B1538] text-[#F5E6C8]" 
          asChild
        >
          <Link href={`/rooms/${room.id}`}>View Details & Book</Link>
        </Button>
      </div>
    </Card>
  )
}