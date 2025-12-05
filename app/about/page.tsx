"use client"

import * as React from "react"
import { useState, useEffect, useRef, useMemo } from 'react'
import Image from 'next/image'
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Autoplay from "embla-carousel-autoplay"
import { Award, Heart, Leaf, Users, MapPin, ChevronLeft, ChevronRight, RotateCw } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

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

  const plugin = React.useRef(
    Autoplay ({ delay: 5000 })
  )

  const images = [
  "/slide-1.jpg",
  "/slide-2.jpg",
  "/slide-3.jpg",
  ];

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

        {/* Stats Section */}
        <section className="py-16 bg-[#5C0A1E] shadow-md">
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

        {/* Story Section */}
        <section className="py-10 bg-white-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
            <div>
              <p className="text-[#D4AF37] uppercase tracking-widest text-md lg:text-xl mb-3">A Place You Can Call Home</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#5C0A1E] mb-6 text-balance">Our Story</h2>
              <div className="space-y-4 text-[#5C0A1E]/90 text-xl">
                <p className="text-pretty text-justify">
                    Located in Tawiran, Calapan City, Oriental Mindoro, Vencio&apos;s Garden Hotel & Restaurant 
                    has been welcoming guests since 2008 with warm Filipino hospitality and exceptional service.
                </p>
                <p className="text-pretty text-justify">
                    Our hotel features 10 comfortable rooms surrounded by lush tropical gardens, creating a 
                    peaceful retreat for both business and leisure travelers. The serene garden setting provides 
                    the perfect escape while remaining conveniently close to the city center.
                </p>
                <p className="text-pretty text-justify">
                    Beyond accommodations, our restaurant has earned recognition as the #2 dining destination 
                    in Calapan on TripAdvisor, serving a delightful mix of Filipino, Asian, and international 
                    cuisine prepared with fresh, quality ingredients.
                </p>
                <p className="text-pretty text-justify">
                    Whether you&apos;re visiting for business, leisure, or hosting a special event, Vencio&apos;s Garden 
                    offers the perfect blend of comfort, nature, and genuine Filipino hospitality.
                </p>
              </div>
            </div>

            {/* Values Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 space-x-6 mt-10">
              <div
                className="h-100 lg:h-170 w-full bg-cover bg-center rounded-lg shadow-xl border border-red-900"
                style={{
                  backgroundImage: "url('/venciosloc.jpg')"
                }}
              />

              <div className="text-center ml-0 mb-12 lg:ml-5 mt-10 lg:mt-0">
                <p className="text-[#D4AF37] uppercase tracking-widest text-md lg:text-xl mb-3">The Commitment</p>
                <h2 className="text-3xl md:text-4xl font-bold text-[#5C0A1E] mb-4 text-balance">Our Values</h2>
                  <p className="text-[#5C0A1E]/80 text-md pb-5 px-5 text-justify">
                    At Vencio's, we are passionate about providing our guests with more than just a place to stay or dine. We strive to create an 
                    experience rooted in comfort, care, and sustainability. With plans to rebrand as a premier eco-tourism destination, our vision 
                    is to blend modern comforts with eco-friendly practices that honor the natural beauty of Oriental Mindoro. 
                  </p>

                <div className="container mx-auto px-4">
                  <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {values.map((value, index) => (
                      <div key={index} className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
                        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#5C0A1E] flex items-center justify-center">
                          <value.icon className="w-7 h-7 text-[#D4AF37]" />
                        </div>
                        <h3 className="font-serif font-semibold text-[#5C0A1E] text-xl mb-2">{value.title}</h3>
                        <p className="text-[#5C0A1E]/80 text-sm">{value.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-[#D4AF37] uppercase tracking-widest text-md lg:text-xl mb-3">
                What We Offer
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#5C0A1E]">
                Our Services
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "HOTEL",
                  image: "/icon-256x256.png",
                  description: (
                    <>
                      Relax in our well-appointed rooms, designed to cater to every traveler’s needs.
                    </>
                  )
                },
                {
                  title: "RESTAURANT",
                  image: "/resto-logo.png",
                  description: (
                    <>
                      Enjoy a symphony of flavors with our wide array of freshly prepared dishes,
                      from seafood specialties to hearty Filipino favorites.
                    </>
                  )
                },
                {
                  title: "CATERING",
                  image: "/catering-logo.jpg",
                  description: (
                    <>
                      Whether it’s a wedding, birthday, or corporate event, we deliver unforgettable
                      experiences with customized menus and exceptional service.
                    </>
                  )
                }
              ].map((item, idx) => (
                <Card
                  key={idx}
                  className="rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:scale-105 p-0 pb-5 mb-10"
                >
                  <CardHeader className="p-0 pt-6 flex justify-center">
                    <div className="w-38 h-38 rounded-full overflow-hidden shadow-md flex items-center justify-center bg-white">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={128}
                        height={128}
                        className="object-contain w-full h-full"
                      />
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="p-2">
                      <h3 className="text-2xl font-bold mb-4 text-[#5C0A1E] text-center">
                        {item.title}
                      </h3>
                      <p className="mb-6 text-justify text-[#5C0A1E]/80">
                        {item.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>


        {/* Banner Section */}
          <section className="py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center my-5">
                <h2 className="text-3xl md:text-4xl font-bold text-[#5C0A1E]">
                  COME AND EXPERIENCE THE <span className="text-[#D4AF37]">VENCIO&apos;S DIEFFERENCE</span>
                </h2>
              </div>
                <div className="my-5">
                  Whether you&apos;re here for business, leisure, or celebration, Vencio&apos;s Garden Hotel & Restaurant promises warm hospitality, great food, and a memorable stay.
                </div>
                <div className="flex items-center justify-center">
                  <Carousel
                    plugins={plugin.current ? [plugin.current] : []}
                    className="max-w-md my-3"
                  >
                    <CarouselContent>
                      {images?.map((img, index) => (
                        <CarouselItem key={index}>
                          <div>
                            <Card>
                              <CardContent className="flex aspect-square items-center justify-center p-0">
                                <Image
                                  src={img}
                                  alt={`Slide ${index + 1}`}
                                  width={500}
                                  height={500}
                                  className="w-full h-full object-contain rounded-xl"
                                />
                              </CardContent>
                            </Card>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                  </Carousel>
                </div>
            </div>
          </section>

        

        {/* CTA Section*/}
        <div className="h-1 bg-[#D4AF37]"/>
        <section className="pb-10 pt-16 bg-[#5C0A1E] shadow-lg">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-300">
                  Vencio's Garden
                </h2>
                <p className="text-[#ecd8af] uppercase tracking-widest text-md">
                  Hotel & Restaurant
                </p>
              </div>
              <div
                className="h-20 w-20 bg-center bg-contain bg-no-repeat"
                style={{ backgroundImage: "url('/logo.png')" }}
              />
            </div>


            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col sm:items-end items-start mb-12">
                <div className="text-gray-200 text-lg italic space-y-1 text-right">
                  <p>Hotel: 288-7789</p>
                  <p>Restaurant: 288-7790</p>
                  <p>Takeout: 0918 957 2855</p>
                  <p>Email: venciosgarden@yahoo.com</p>
                  <p>Facebook: @venciosgardenhotel</p>
                  <p>Instagram: @venciosgarden</p>
                  <p>#08 Nautical Highway, Tawiran, Calapan City, Oriental Mindoro</p>
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