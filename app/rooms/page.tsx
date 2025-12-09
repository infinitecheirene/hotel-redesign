// app/rooms/page.tsx
"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RoomCard } from "@/components/room-card"

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
}

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRooms()
  }, [])

  const fetchRooms = async () => {
    try {
      const response = await fetch('/api/rooms?per_page=100')
      const data = await response.json()
      setRooms(data.data || [])
    } catch (error) {
      console.error('Error fetching rooms:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F5E6C8]/30">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 bg-[#5C0A1E] overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <Image 
              src="/room.jpg" 
              alt="" 
              fill
              className="object-cover" 
              priority
            />
          </div>
          <div className="relative container mx-auto px-4 text-center">
            <p className="text-amber-400 uppercase tracking-[0.3em] text-lg mb-4 font-semibold">
              Accommodations
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4">
              Our Rooms & Suites
            </h1>
            <p className="text-lg text-stone-300 max-w-2xl mx-auto">
              Discover our collection of elegantly appointed rooms, each with immersive 360° virtual tours to help you find your perfect stay.
            </p>
          </div>
        </section>

        {/* Rooms Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5C0A1E]"></div>
              </div>
            ) : rooms.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-[#5C0A1E]/60 text-lg">No rooms available at the moment.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {rooms.map((room) => (
                  <RoomCard 
                    key={room.id} 
                    room={{
                      id: room.id,
                      name: room.name,
                      description: room.full_description,
                      price: room.price,
                      capacity: room.capacity,
                      size: room.size,
                      bedType: room.bed_type,
                      amenities: room.amenities,
                      image: room.image ? `/api/image?path=${encodeURIComponent(room.image)}` : '/placeholder-room.jpg',
                    }} 
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}