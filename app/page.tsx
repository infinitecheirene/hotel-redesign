"use client"

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { FeaturedRooms } from "@/components/featured-rooms"
import { AmenitiesSection } from "@/components/amenities-section"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  PartyPopper,
  Utensils,
  ArrowRight,
  BedDouble,
  Eye,
 } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        {/* Services Section */}
        <section className="py-16 bg-[#5C0A1E]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center mb-12">
              <p className="text-red-200 uppercase tracking-widest text-lg mb-3">
                What We Offer
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#D4AF37]">
                Our Services
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="py-10 px-6 bg-[#f5e5c5] shadow-lg border border-red-200 hover:scale-105 transition-transform duration-300 h-full">
                <CardHeader>
                  <div className="flex items-center gap-3 justify-center mb-2">
                    <BedDouble className="text-[#D4AF37] w-8 h-8" />
                    <h3 className="text-2xl font-bold text-[#5C0A1E]">Hotel Accommodation</h3>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-md text-justify mb-6">
                    Unwind in our comfortable, well-appointed rooms crafted to provide every guest a relaxing and delightful stay.
                  </p>
                  <div className="flex justify-end">
                    <Link href="/rooms">
                      <button className="group flex items-center hover:underline text-[#5C0A1E] font-medium">
                        <span className="mr-1">Learn More</span>
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <Card className="py-10 px-6 bg-[#f5e5c5] shadow-lg border border-red-200 hover:scale-105 transition-transform duration-300 h-full">
                <CardHeader>
                  <div className="flex items-center gap-3 justify-center mb-5 pb-5">
                    <Utensils className="text-[#D4AF37] w-8 h-8" />
                    <h3 className="text-2xl font-bold text-[#5C0A1E]">Seafood Café</h3>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-md text-justify mb-6">
                    Savor a symphony of flavors with fresh seafood specialties and Filipino favorites prepared to satisfy every craving.
                  </p>
                  <div className="flex justify-end">
                    <Link href="/restaurant">
                      <button className="group flex items-center hover:underline text-[#5C0A1E] font-medium">
                        <span className="mr-1">Learn More</span>
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <Card className="py-10 px-6 bg-[#f5e5c5] shadow-lg border border-red-200 hover:scale-105 transition-transform duration-300 h-full">
                <CardHeader>
                  <div className="flex items-center gap-3 justify-center mb-5 pb-5">
                    <PartyPopper className="text-[#D4AF37] w-8 h-8" />
                    <h3 className="text-2xl font-bold text-[#5C0A1E]">Catering Events</h3>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-md text-justify mb-6">
                    From weddings to corporate gatherings, we elevate your celebrations with tailored menus and exceptional service.
                  </p>
                  <div className="flex justify-end">
                    <Link href="/reservation">
                      <button className="group flex items-center hover:underline text-[#5C0A1E] font-medium">
                        <span className="mr-1">Learn More</span>
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <FeaturedRooms />
        
        {/* Restaurant Section */}
        <section className="py-10 bg-[#F5E6C8]/30">
          <div className="container mx-auto px-4">
            
            {/* Restaurant Venue */}
            <div className="py-10">
              <div className="text-center mb-12">
                <p className="text-[#D4AF37] uppercase tracking-widest text-lg mb-3">
                  Garden Dining Hub
                </p>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#5C0A1E]">
                  Vencio's Garden Seafood Cafe
                </h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: "RESTO VENUE",
                    image: "/restaurant-venue.jpg",
                    description: (
                      <>
                        Host your next celebration or corporate event at Vencio's Garden Seafood Cafe! With a spacious 
                        and charming ambiance, delectable menus, and attentive service, we&apos;ll make your gatherings unforgettable. 
                      </>
                    )
                  },
                  {
                    title: "THEMED KTVs",
                    image: "/themed-ktv.jpg",
                    description: (
                      <>
                        Perfect setting for your small gatherings, accommodating <b>10-20 people</b> comfortably. Whether it&apos;s a 
                        birthday, family reunion, or just a fun get-together, our KTV rooms offer a private and vibrant atmosphere. 
                      </>
                    )
                  },
                  {
                    title: "CATCH & GRILL",
                    image: "/catch&grill.png",
                    description: (
                      <>
                        Experience the ultimate aquafarm-to-table dining with our unique <b>Catch & Grill</b> experience. Catch your own hito 
                        and red tilapia straight from our pond, grill it to perfection, and savor it in our cozy alfresco kubo huts 
                        while being surrounded by mangrove trees. Perfect for groups of up to 5.
                      </>
                    )
                  }
                ].map((item, idx) => (
                  <Card
                    key={idx}
                    className="rounded-2xl overflow-hidden shadow-xl border border-red-300 
                              transition-all duration-300 hover:scale-105 
                              bg-linear-to-br from-white to-red-50 p-0 pb-5"
                  >
                    <CardHeader className="p-0">
                      <CardTitle className="p-0">
                        <div
                          className="h-80 bg-cover bg-center w-full opacity-80"
                          style={{ backgroundImage: `url(${item.image})` }}
                        />
                      </CardTitle>
                    </CardHeader>

                    <CardContent>
                      <div className="p-2">
                        <h3 className="text-2xl font-bold mb-4 text-[#5C0A1E]">
                          {item.title}
                        </h3>
                        <p className="mb-6 text-justify">{item.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Restaurant Menu */}
            <div className="py-16">
              <div className="text-center mb-12">
                <p className="text-[#D4AF37] uppercase tracking-widest text-lg mb-3">
                  Menu Highlights
                </p>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#5C0A1E]">
                  Choose Your Vencio's Craving
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: "RESTO MENU",
                    image: "/resto-menu.jpg",
                    link: "/restaurant",
                    description: (
                      <>
                        Dive into local <b>Seafood</b> and <b>Pinoy favorites</b> crafted to
                        satisfy every craving.
                      </>
                    )
                  },
                  {
                    title: "VENCIO'S TAKEOUTS",
                    image: "/takeout-menu.jpg",
                    link: "/restaurant",
                    description: (
                      <>
                        Celebrate every occasion with our best-selling <b>Palabok</b>,
                        classic Pinoy favorites, and delightful <b>Kakanin packages</b>.
                        Perfect for any gathering, big or small.
                      </>
                    )
                  },
                  {
                    title: "BUNS & ROLLS",
                    image: "/breads&rolls-menu.jpg",
                    link: "/restaurant",
                    description: (
                      <>
                        From fluffy <b>Ensaymada</b> to flavorful <b>Bread Floss</b> and soft
                        <b> Korean Buns</b>, our breads are made from scratch with love.
                      </>
                    )
                  }
                ].map((item, idx) => (
                  <Card
                    key={idx}
                    className="rounded-2xl overflow-hidden shadow-xl border border-red-300 
                              transition-all duration-300 hover:scale-105 
                              bg-linear-to-br from-white to-red-50 p-0 pb-5"
                  >
                    <CardHeader className="p-0">
                      <CardTitle className="p-0">
                        <div className="h-72 w-full bg-cover bg-center" style={{ backgroundImage: `url(${item.image})` }} />
                      </CardTitle>
                    </CardHeader>

                    {/* Content */}
                    <CardContent className="px-6">
                      <h3 className="text-2xl font-bold mb-3 text-[#5C0A1E] text-center">
                        {item.title}
                      </h3>

                      <p className="mb-6 text-justify leading-relaxed lg:h-28">
                        {item.description}
                      </p>

                      <Link href={item.link}>
                        <button
                          className="w-full py-3 rounded-lg font-semibold
                                    bg-[#5C0A1E] text-red-100 shadow-md
                                    transition-all duration-300 hover:bg-red-700 hover:scale-[1.03]"
                        >
                          View Menu
                        </button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Catering Section */}
        <section className="py-10 bg-[#F5E6C8]/30">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center justify-center items-center mb-12">
              <p className="text-[#D4AF37] uppercase tracking-widest text-lg mb-3">Event Catering</p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#5C0A1E] mb-5">Expert Catering for Every Event</h2>
              <p className="text-lg">We understand that every event is a milestone, whether it&apos;s a heartwarming celebration with loved ones or an inspiring corporate gathering, Vencio's Garden is always the first choice.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {[
                {
                  title: "DOME HALL",
                  image: "/dome-hall.jpg",
                  description: (
                    <>
                      Ideal venue with seperate buffet area fit for 100 guests. 
                    </>
                  )
                },
                {
                  title: "PAVILLION HALL",
                  image: "/pavillion-hall.png",
                  description: (
                    <>
                      Rustic vibe venue with dim lighting fit for social events.
                    </>
                  )
                },
                {
                  title: "RESTO VENUE",
                  image: "/resto-venue.jpg",
                  description: (
                    <>
                      Venue recommended for small gatherings.
                    </>
                  )
                },
                {
                  title: "EXTENSION HALL",
                  image: "/extension-hall.jpg",
                  description: (
                    <>
                      A venue with Overlooking Gazebo and commonly used as an extension for the dome hall.
                    </>
                  )
                }
              ].map((item, idx) => (
                <Card
                  key={idx}
                  className="rounded-2xl overflow-hidden shadow-xl border border-red-300 
                            bg-linear-to-br from-white to-red-50 p-0 pb-5"
                >
                  <CardHeader className="p-0">
                    <CardTitle className="p-0">
                      <div
                        className="h-80 bg-cover bg-center w-full opacity-80"
                        style={{ backgroundImage: `url(${item.image})` }}
                      />
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <div className="p-2">
                      <h3 className="text-2xl font-bold mb-4 text-[#5C0A1E]">
                        {item.title}
                      </h3>
                      <p className="mb-6 text-justify">{item.description}</p>

                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <AmenitiesSection />

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
        <div className="h-1 bg-[#D4AF37]"/>
      </main>
      <Footer />
    </div>
  )
}
