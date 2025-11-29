// app/rooms/[id]/page.tsx
"use client"

import { use, useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Immersive360Tour } from "@/components/immersive-360-tour"
import { Bed, Users, Maximize, Star, ArrowLeft } from "lucide-react"
import { notFound, useRouter } from "next/navigation"
import { BookingSection } from "@/components/booking-section"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface Panorama {
  id: string
  name: string
  panoramaUrl: string
  thumbnail: string
}

interface Room {
  id: number
  name: string
  full_description: string
  price: number
  capacity: number
  size: string
  bed_type: string
  amenities: string[]
  image: string | null
  images: string[]
  panoramas: Panorama[]
}

export default function RoomDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // Unwrap the params Promise using React.use()
  const unwrappedParams = use(params)
  const [room, setRoom] = useState<Room | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const fetchRoom = useCallback(async () => {
    try {
      const response = await fetch(`/api/rooms/${unwrappedParams.id}`)
      if (!response.ok) {
        throw new Error('Room not found')
      }
      const data = await response.json()
      setRoom(data.data)
    } catch (error) {
      console.error('Error fetching room:', error)
      router.push('/404')
    } finally {
      setLoading(false)
    }
  }, [unwrappedParams.id, router])

  useEffect(() => {
    fetchRoom()
  }, [fetchRoom])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5E6C8]/30">
        <Header />
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5C0A1E]"></div>
        </div>
      </div>
    )
  }

  if (!room) {
    return notFound()
  }

  // Transform panoramas for the tour component
  // Use Next.js API proxy route to bypass CORS issues
  const tourRooms = room.panoramas?.map(panorama => ({
    id: panorama.id,
    name: panorama.name,
    panoramaUrl: `/api/panorama?path=${encodeURIComponent(panorama.panoramaUrl)}`,
    thumbnail: `/api/panorama?path=${encodeURIComponent(panorama.thumbnail)}`,
  })) || []

  return (
    <div className="min-h-screen bg-[#F5E6C8]/30">
      <Header />
      <main className="pt-20">
        {/* Back Button */}
        <section className="container mx-auto px-4 py-6">
          <Button
            variant="ghost"
            className="text-[#5C0A1E] hover:text-[#8B1538]"
            asChild
          >
            <Link href="/rooms">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Rooms
            </Link>
          </Button>
        </section>

        {/* 360 Tour Section */}
        {tourRooms.length > 0 && (
          <section className="container mx-auto px-4 mb-12">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <Immersive360Tour 
                rooms={tourRooms} 
                initialRoomId={tourRooms[0].id} 
                isEmbedded 
              />
            </div>
          </section>
        )}

        {/* Room Details */}
        <section className="container mx-auto px-4 pb-20">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#5C0A1E] mb-4">
                  {room.name}
                </h1>
                <p className="text-[#5C0A1E]/70 text-lg leading-relaxed">
                  {room.full_description}
                </p>
              </div>

              {/* Room Features */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-lg">
                  <Bed className="w-8 h-8 text-[#D4AF37] mb-3" />
                  <h3 className="font-semibold text-[#5C0A1E] mb-1">Bed Type</h3>
                  <p className="text-[#5C0A1E]/70 text-sm">{room.bed_type}</p>
                </div>
                <div className="bg-white p-6 rounded-lg">
                  <Users className="w-8 h-8 text-[#D4AF37] mb-3" />
                  <h3 className="font-semibold text-[#5C0A1E] mb-1">Capacity</h3>
                  <p className="text-[#5C0A1E]/70 text-sm">{room.capacity} Guests</p>
                </div>
                <div className="bg-white p-6 rounded-lg">
                  <Maximize className="w-8 h-8 text-[#D4AF37] mb-3" />
                  <h3 className="font-semibold text-[#5C0A1E] mb-1">Room Size</h3>
                  <p className="text-[#5C0A1E]/70 text-sm">{room.size}</p>
                </div>
              </div>

              {/* Amenities */}
              <div className="bg-white p-8 rounded-lg">
                <h2 className="text-2xl font-serif font-bold text-[#5C0A1E] mb-6">Amenities</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {room.amenities.map((amenity, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Star className="w-5 h-5 text-[#D4AF37]" />
                      <span className="text-[#5C0A1E]/80">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Images */}
              {room.images && room.images.length > 0 && (
                <div className="bg-white p-8 rounded-lg">
                  <h2 className="text-2xl font-serif font-bold text-[#5C0A1E] mb-6">Room Gallery</h2>
                  <div className="grid md:grid-cols-3 gap-4">
                    {room.images.map((img, i) => (
                      <div key={i} className="relative aspect-[4/3] rounded-lg overflow-hidden group">
                        <Image
                          src={`/api/image?path=${encodeURIComponent(img)}`}
                          alt={`${room.name} view ${i + 1}`}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Booking Section */}
            <BookingSection room={room} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}