"use client"

import { useState } from "react"
import { Immersive360Tour } from "@/components/immersive-360-tour"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import Link from "next/link"

const rooms = [
  {
    id: "living-room",
    name: "Living Room",
    panoramaUrl: "/panorama-4345-707c634d-2e64-49f2-b379-5992f1f7becc.webp",
    thumbnail: "/panorama-4345-707c634d-2e64-49f2-b379-5992f1f7becc.webp",
  },
  {
    id: "master-bedroom",
    name: "Master Bedroom",
    panoramaUrl: "/panorama-4345-58396ee4-a4d0-4069-9080-6c8d306a471d.webp",
    thumbnail: "/panorama-4345-58396ee4-a4d0-4069-9080-6c8d306a471d.webp",
  },
  {
    id: "master-bathroom",
    name: "Master Bathroom",
    panoramaUrl: "/panorama-4346-948adaee-dc4b-4693-a0df-4bb6a2e9ffe8.webp",
    thumbnail: "/panorama-4346-948adaee-dc4b-4693-a0df-4bb6a2e9ffe8.webp",
  },
  {
    id: "second-bedroom",
    name: "2nd Bedroom",
    panoramaUrl: "/panorama-4346-b07b4b95-3c0e-4578-b90c-ee0d7cc75cd9.webp",
    thumbnail: "/panorama-4346-b07b4b95-3c0e-4578-b90c-ee0d7cc75cd9.webp",
  },
  {
    id: "kitchen",
    name: "Kitchen",
    panoramaUrl: "/panorama-4345-707c634d-2e64-49f2-b379-5992f1f7becc.webp",
    thumbnail: "/panorama-4345-707c634d-2e64-49f2-b379-5992f1f7becc.webp",
  },
  {
    id: "balcony",
    name: "Balcony",
    panoramaUrl: "/panorama-4345-58396ee4-a4d0-4069-9080-6c8d306a471d.webp",
    thumbnail: "/panorama-4345-58396ee4-a4d0-4069-9080-6c8d306a471d.webp",
  },
]

export function FeaturedRooms() {
  const [showTour, setShowTour] = useState(false)

  return (
    <section className="py-20 bg-[#F5E6C8]/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-[#D4AF37] uppercase tracking-widest text-sm mb-3">Virtual Tour</p>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#5C0A1E] mb-4">Explore Our Rooms in 360°</h2>
          <p className="text-[#5C0A1E]/70 max-w-2xl mx-auto mb-8">
            Experience our luxurious accommodations with immersive 360° virtual tours. Navigate through every room and
            discover every detail before you arrive.
          </p>
          <Button
            onClick={() => setShowTour(true)}
            className="bg-[#5C0A1E] hover:bg-[#8B1538] text-[#F5E6C8] px-8 py-6 text-lg"
          >
            <Eye className="w-5 h-5 mr-2" />
            Start Virtual Tour
          </Button>
        </div>

        {/* Embedded 360 Tour Preview */}
        <div className="rounded-xl overflow-hidden shadow-2xl">
          <Immersive360Tour rooms={rooms} isEmbedded />
        </div>

        {/* Book Now CTA */}
        <div className="text-center mt-8">
          <Button asChild className="bg-[#D4AF37] hover:bg-[#b8962f] text-[#5C0A1E] px-8 py-6 text-lg font-semibold">
            <Link href="/reservation">Book Your Stay Now</Link>
          </Button>
        </div>
      </div>

      {/* Fullscreen Tour Modal */}
      {showTour && (
        <div className="fixed inset-0 z-50">
          <Immersive360Tour rooms={rooms} onClose={() => setShowTour(false)} />
        </div>
      )}
    </section>
  )
}
