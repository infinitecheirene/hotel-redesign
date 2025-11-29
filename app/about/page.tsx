"use client"
import { useState, useEffect, useRef, useMemo } from 'react'
import Image from 'next/image'
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Award, Heart, Leaf, Users, MapPin, ChevronLeft, ChevronRight, RotateCw } from "lucide-react"
import * as THREE from 'three'

const stats = [
  { value: "25+", label: "Years of Excellence" },
  { value: "150+", label: "Luxurious Rooms" },
  { value: "50K+", label: "Happy Guests" },
  { value: "4.9", label: "Guest Rating" },
]

const values = [
  {
    icon: Heart,
    title: "Hospitality",
    description: "We treat every guest like family, ensuring personalized care and attention to detail.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We strive for perfection in every aspect of our service and accommodations.",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    description: "We are committed to eco-friendly practices and preserving our beautiful gardens.",
  },
  {
    icon: Users,
    title: "Community",
    description: "We support local artisans and contribute to our community's growth.",
  },
]

// 360° Virtual Tour Component
const VirtualTour360 = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentStop, setCurrentStop] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isDragging, setIsDragging] = useState(false)

  // Tour stops along the route to your hotel (memoized to avoid recreating)
  const tourStops = useMemo(() => [
    {
      name: "Highway Exit",
      description: "Start your journey from the main highway exit",
      color: "#4A90E2",
      position: "14.6°N, 121.0°E"
    },
    {
      name: "Main Road Turn",
      description: "Turn right at the main intersection",
      color: "#7B68EE",
      position: "200m from highway"
    },
    {
      name: "Neighborhood Street",
      description: "Continue through the peaceful neighborhood",
      color: "#50C878",
      position: "500m from highway"
    },
    {
      name: "Hotel Entrance",
      description: "Welcome to Vencio's Garden Hotel!",
      color: "#D4AF37",
      position: "Arrival"
    }
  ], [])

  useEffect(() => {
    if (!containerRef.current) return

    // Store reference to container element
    const container = containerRef.current

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    )
    camera.position.set(0, 0, 0.1)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(container.clientWidth, container.clientHeight)
    container.appendChild(renderer.domElement)

    // Create 360° sphere
    const geometry = new THREE.SphereGeometry(500, 60, 40)
    geometry.scale(-1, 1, 1)

    // Create dynamic texture based on current stop
    const createTexture = () => {
      const canvas = document.createElement('canvas')
      canvas.width = 4096
      canvas.height = 2048
      const ctx = canvas.getContext('2d')
      if (!ctx) return new THREE.CanvasTexture(canvas)

      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      const stop = tourStops[currentStop]
      
      gradient.addColorStop(0, '#87CEEB')
      gradient.addColorStop(0.5, stop.color)
      gradient.addColorStop(1, '#2C5F2D')
      
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Add road/path texture
      ctx.fillStyle = 'rgba(80, 80, 80, 0.3)'
      ctx.fillRect(0, canvas.height * 0.6, canvas.width, canvas.height * 0.4)

      // Add location marker
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
      ctx.font = 'bold 120px Arial'
      ctx.textAlign = 'center'
      ctx.fillText(stop.name, canvas.width / 2, canvas.height / 2 - 100)

      ctx.font = '70px Arial'
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
      ctx.fillText(stop.description, canvas.width / 2, canvas.height / 2 + 20)

      ctx.font = '50px Arial'
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'
      ctx.fillText('📍 ' + stop.position, canvas.width / 2, canvas.height / 2 + 100)

      // Add instructions
      ctx.font = '45px Arial'
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'
      ctx.fillText('← Drag to look around → | Use arrows to navigate', canvas.width / 2, canvas.height - 100)

      // Add direction indicators
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
      ctx.font = 'bold 200px Arial'
      
      if (currentStop < tourStops.length - 1) {
        ctx.fillText('→', canvas.width * 0.85, canvas.height / 2)
      }
      
      if (currentStop > 0) {
        ctx.fillText('←', canvas.width * 0.15, canvas.height / 2)
      }

      // Add landmarks
      const landmarks = ['🌳', '🏠', '🚗', '🏨', '🌺']
      for (let i = 0; i < 15; i++) {
        ctx.font = `${Math.random() * 50 + 40}px Arial`
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.2})`
        ctx.fillText(
          landmarks[Math.floor(Math.random() * landmarks.length)],
          Math.random() * canvas.width,
          canvas.height * 0.4 + Math.random() * 200
        )
      }

      return new THREE.CanvasTexture(canvas)
    }

    const texture = createTexture()
    const material = new THREE.MeshBasicMaterial({ map: texture })
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    // Mouse/Touch controls
    let isUserInteracting = false
    let onPointerDownMouseX = 0
    let onPointerDownMouseY = 0
    let lon = 0
    let lat = 0
    let onPointerDownLon = 0
    let onPointerDownLat = 0

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      event.preventDefault()
      isUserInteracting = true
      setIsDragging(true)
      const clientX = 'clientX' in event ? event.clientX : event.touches[0].clientX
      const clientY = 'clientY' in event ? event.clientY : event.touches[0].clientY
      onPointerDownMouseX = clientX
      onPointerDownMouseY = clientY
      onPointerDownLon = lon
      onPointerDownLat = lat
    }

    const onPointerMove = (event: MouseEvent | TouchEvent) => {
      if (isUserInteracting) {
        event.preventDefault()
        const clientX = 'clientX' in event ? event.clientX : event.touches[0].clientX
        const clientY = 'clientY' in event ? event.clientY : event.touches[0].clientY
        lon = (onPointerDownMouseX - clientX) * 0.1 + onPointerDownLon
        lat = (clientY - onPointerDownMouseY) * 0.1 + onPointerDownLat
      }
    }

    const onPointerUp = () => {
      isUserInteracting = false
      setIsDragging(false)
    }

    const element = renderer.domElement
    element.addEventListener('mousedown', onPointerDown as EventListener)
    element.addEventListener('mousemove', onPointerMove as EventListener)
    element.addEventListener('mouseup', onPointerUp)
    element.addEventListener('touchstart', onPointerDown as EventListener)
    element.addEventListener('touchmove', onPointerMove as EventListener)
    element.addEventListener('touchend', onPointerUp)

    // Animation loop
    let animationId: number
    const animate = () => {
      animationId = requestAnimationFrame(animate)

      if (!isUserInteracting) {
        lon += 0.05
      }

      lat = Math.max(-85, Math.min(85, lat))
      const phi = THREE.MathUtils.degToRad(90 - lat)
      const theta = THREE.MathUtils.degToRad(lon)

      const x = 500 * Math.sin(phi) * Math.cos(theta)
      const y = 500 * Math.cos(phi)
      const z = 500 * Math.sin(phi) * Math.sin(theta)

      camera.lookAt(x, y, z)
      renderer.render(scene, camera)
    }

    animate()
    setIsLoading(false)

    // Handle resize
    const handleResize = () => {
      if (container) {
        camera.aspect = container.clientWidth / container.clientHeight
        camera.updateProjectionMatrix()
        renderer.setSize(container.clientWidth, container.clientHeight)
      }
    }
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
      element.removeEventListener('mousedown', onPointerDown as EventListener)
      element.removeEventListener('mousemove', onPointerMove as EventListener)
      element.removeEventListener('mouseup', onPointerUp)
      element.removeEventListener('touchstart', onPointerDown as EventListener)
      element.removeEventListener('touchmove', onPointerMove as EventListener)
      element.removeEventListener('touchend', onPointerUp)
      if (container && container.contains(element)) {
        container.removeChild(element)
      }
      geometry.dispose()
      material.dispose()
      texture.dispose()
      renderer.dispose()
    }
  }, [currentStop, tourStops])

  const goToStop = (index: number) => {
    if (index >= 0 && index < tourStops.length) {
      setCurrentStop(index)
    }
  }

  return (
    <div className="relative">
      <div 
        ref={containerRef} 
        className={`w-full h-[600px] rounded-lg overflow-hidden shadow-2xl bg-gray-900 ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
      />
      
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 rounded-lg">
          <div className="text-white text-xl flex items-center gap-3">
            <RotateCw className="w-6 h-6 animate-spin" />
            Loading Virtual Tour...
          </div>
        </div>
      )}

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          onClick={() => goToStop(currentStop - 1)}
          disabled={currentStop === 0}
          className={`p-3 rounded-full transition-all ${
            currentStop === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-[#5C0A1E] text-[#F5E6C8] hover:bg-[#5C0A1E]/90 shadow-lg'
          }`}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="text-center px-6">
          <p className="text-[#5C0A1E] font-semibold text-lg">
            Stop {currentStop + 1} of {tourStops.length}
          </p>
          <p className="text-[#5C0A1E]/70 text-sm">{tourStops[currentStop].name}</p>
        </div>

        <button
          onClick={() => goToStop(currentStop + 1)}
          disabled={currentStop === tourStops.length - 1}
          className={`p-3 rounded-full transition-all ${
            currentStop === tourStops.length - 1
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-[#5C0A1E] text-[#F5E6C8] hover:bg-[#5C0A1E]/90 shadow-lg'
          }`}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {tourStops.map((stop, index) => (
          <button
            key={index}
            onClick={() => goToStop(index)}
            className={`transition-all ${
              index === currentStop
                ? 'w-12 h-3 bg-[#5C0A1E] rounded-full'
                : 'w-3 h-3 bg-[#5C0A1E]/30 rounded-full hover:bg-[#5C0A1E]/50'
            }`}
            title={stop.name}
          />
        ))}
      </div>

      <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {tourStops.map((stop, index) => (
          <button
            key={index}
            onClick={() => goToStop(index)}
            className={`p-4 rounded-lg text-left transition-all ${
              index === currentStop
                ? 'bg-[#5C0A1E] text-[#F5E6C8] shadow-lg scale-105'
                : 'bg-white text-[#5C0A1E] hover:bg-[#F5E6C8] shadow'
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                index === currentStop ? 'bg-[#D4AF37] text-[#5C0A1E]' : 'bg-[#5C0A1E] text-[#F5E6C8]'
              }`}>
                {index + 1}
              </div>
              <h4 className="font-semibold">{stop.name}</h4>
            </div>
            <p className={`text-sm ${index === currentStop ? 'text-[#F5E6C8]/80' : 'text-[#5C0A1E]/70'}`}>
              {stop.description}
            </p>
          </button>
        ))}
      </div>

      <div className="mt-8 bg-gradient-to-r from-[#5C0A1E] to-[#8B1538] text-[#F5E6C8] p-6 rounded-lg">
        <h4 className="font-serif font-bold text-xl mb-3 text-center">How to Use Virtual Tour</h4>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            <p className="font-semibold mb-1">🖱️ Desktop</p>
            <p className="text-[#F5E6C8]/80">Click and drag to look around</p>
          </div>
          <div className="text-center">
            <p className="font-semibold mb-1">📱 Mobile</p>
            <p className="text-[#F5E6C8]/80">Touch and swipe to explore</p>
          </div>
          <div className="text-center">
            <p className="font-semibold mb-1">⬅️➡️ Navigate</p>
            <p className="text-[#F5E6C8]/80">Use arrows to move between stops</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <section className="relative py-32 bg-[#5C0A1E]">
          <div className="absolute inset-0 opacity-20">
            <Image 
              src="/placeholder.svg" 
              alt="" 
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="relative container mx-auto px-4 text-center">
            <p className="text-[#D4AF37] uppercase tracking-widest text-sm mb-3">Our Story</p>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#F5E6C8] mb-6">
              About Vencio&apos;s Garden
            </h1>
            <p className="text-[#F5E6C8]/80 max-w-3xl mx-auto text-lg">
              A legacy of luxury, comfort, and unparalleled hospitality since 1998
            </p>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-b from-white to-[#F5E6C8]/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-[#D4AF37] uppercase tracking-widest text-sm mb-3">Find Your Way</p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#5C0A1E]">
                360° Route to Our Hotel
              </h2>
              <p className="text-[#5C0A1E]/70 mt-4 max-w-2xl mx-auto">
                Take a virtual journey from the highway to our hotel entrance. Experience the route before you arrive!
              </p>
            </div>
            <VirtualTour360 />
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="relative w-full h-[600px]">
                  <Image 
                    src="/placeholder.svg" 
                    alt="Hotel Lobby" 
                    fill
                    className="rounded-lg shadow-xl object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
              <div>
                <p className="text-[#D4AF37] uppercase tracking-widest text-sm mb-3">Since 1998</p>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#5C0A1E] mb-6">A Garden of Dreams</h2>
                <div className="space-y-4 text-[#5C0A1E]/70 leading-relaxed">
                  <p>
                    Nestled in the heart of Paradise City, Vencio&apos;s Garden Hotel & Restaurant was founded with a
                    vision to create an oasis of tranquility and luxury.
                  </p>
                  <p>
                    What started as a small family-owned guesthouse has blossomed into one of the region&apos;s most
                    prestigious hospitality destinations, while never losing the warmth and personal touch that defines
                    us.
                  </p>
                  <p>
                    Our sprawling gardens, meticulously maintained over decades, serve as the living heart of our
                    property, offering guests a serene escape from the bustle of everyday life.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-[#5C0A1E]">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-4xl md:text-5xl font-serif font-bold text-[#D4AF37] mb-2">{stat.value}</p>
                  <p className="text-[#F5E6C8]/80 text-sm uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-[#F5E6C8]/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-[#D4AF37] uppercase tracking-widest text-sm mb-3">What We Stand For</p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#5C0A1E]">Our Values</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm text-center">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#5C0A1E] flex items-center justify-center">
                    <value.icon className="w-7 h-7 text-[#D4AF37]" />
                  </div>
                  <h3 className="font-serif font-semibold text-[#5C0A1E] text-lg mb-2">{value.title}</h3>
                  <p className="text-[#5C0A1E]/70 text-sm">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-[#D4AF37] uppercase tracking-widest text-sm mb-3">Visit Us</p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#5C0A1E]">Location & Contact</h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="rounded-lg overflow-hidden shadow-xl h-[400px]">
                <iframe
                  src="https://www.google.com/maps?q=https://maps.app.goo.gl/s8TZd3Ubg9jr573B7&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Hotel Location"
                ></iframe>
              </div>

              <div className="space-y-6">
                <div className="bg-[#5C0A1E] text-[#F5E6C8] p-6 rounded-lg">
                  <h3 className="font-serif font-bold text-xl mb-4">Address</h3>
                  <p className="mb-4">Paradise City, Philippines</p>
                  <a
                    href="https://maps.app.goo.gl/s8TZd3Ubg9jr573B7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#D4AF37] text-[#5C0A1E] px-6 py-3 rounded-lg hover:bg-[#D4AF37]/90 font-semibold"
                  >
                    <MapPin className="w-5 h-5" />
                    Open in Maps
                  </a>
                </div>

                <div className="bg-[#F5E6C8] p-6 rounded-lg">
                  <h3 className="font-serif font-bold text-xl text-[#5C0A1E] mb-4">Contact Us</h3>
                  <div className="space-y-3 text-[#5C0A1E]/80">
                    <p>📞 +63 XXX XXX XXXX</p>
                    <p>✉️ info@venciosgarden.com</p>
                    <p>🕒 24/7 Reception</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}