import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { FeaturedRooms } from "@/components/featured-rooms"
import { AmenitiesSection } from "@/components/amenities-section"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeaturedRooms />
        <AmenitiesSection />
      </main>
      <Footer />
    </div>
  )
}
