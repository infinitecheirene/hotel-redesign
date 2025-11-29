"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronDown, Sparkles } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{
          backgroundImage: `url('/vencios_hero.webp')`,
        }}
      />

      {/* Multi-layer Gradient Overlay - Red to Black Theme (Lighter) */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/70 via-red-950/60 to-black/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

      {/* Decorative Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-3"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23F5E6C8' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Luxury Badge */}
        <div className="inline-flex items-center gap-2 bg-amber-500/20 backdrop-blur-sm border border-amber-400/30 rounded-full px-6 py-2 mb-8 shadow-lg">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="text-amber-300 text-sm font-medium tracking-wider">LUXURY GARDEN RETREAT</span>
          <Sparkles className="w-4 h-4 text-amber-400" />
        </div>

        {/* Main Heading with Better Typography */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 leading-tight">
          <span className="block text-amber-100 drop-shadow-2xl mb-2">Welcome to</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 drop-shadow-2xl tracking-tight">
            Vencios Garden
          </span>
        </h1>

        {/* Decorative Divider */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-400"></div>
          <svg viewBox="0 0 24 24" className="w-6 h-6 text-amber-400">
            <path
              fill="currentColor"
              d="M12 2L9.5 8.5L3 9.5L7.5 14L6.5 20.5L12 17L17.5 20.5L16.5 14L21 9.5L14.5 8.5L12 2Z"
            />
          </svg>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-400"></div>
        </div>

        {/* Description with Better Readability */}
        <p className="text-xl md:text-2xl text-amber-100 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
          Experience the perfect blend of <span className="text-amber-400 font-medium">luxury</span>, 
          <span className="text-amber-400 font-medium"> comfort</span>, and 
          <span className="text-amber-400 font-medium"> nature</span>.
          <br className="hidden md:block" />
          Your serene escape awaits in our beautiful garden retreat.
        </p>

        {/* CTA Buttons with Better Hierarchy */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button
            size="lg"
            className="bg-gradient-to-r from-amber-500 to-amber-600 text-red-900 hover:from-amber-400 hover:to-amber-500 hover:scale-105 transition-all duration-300 font-bold text-lg px-10 py-7 shadow-2xl shadow-amber-500/30 border border-amber-400"
            asChild
          >
            <Link href="/reservation">
              Book Your Stay
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-amber-300 text-amber-100 hover:bg-amber-500 hover:text-red-900 hover:border-amber-400 hover:scale-105 transition-all duration-300 font-semibold text-lg px-10 py-7 bg-black/30 backdrop-blur-sm"
            asChild
          >
            <Link href="/rooms">Explore Rooms</Link>
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap items-center justify-center gap-8 text-amber-200/90 text-sm">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="font-medium">5-Star Luxury</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-medium">Free Cancellation</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium">24/7 Service</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator with Pulse Animation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-amber-400 text-xs font-medium tracking-wider">SCROLL</span>
        <ChevronDown className="w-6 h-6 text-amber-400" />
      </div>

      {/* Decorative Corner Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 border-t-2 border-l-2 border-amber-400/30 opacity-50"></div>
      <div className="absolute bottom-20 right-10 w-20 h-20 border-b-2 border-r-2 border-amber-400/30 opacity-50"></div>
    </section>
  )
}