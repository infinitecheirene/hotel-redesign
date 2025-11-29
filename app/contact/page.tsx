import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import Image from "next/image"

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">

        {/* Hero Section */}
        <section className="relative py-32 bg-[#5C0A1E]">
          <div className="absolute inset-0 opacity-20">
            <Image
              src="/placeholder.svg?height=600&width=1920"
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>

          <div className="relative container mx-auto px-4 text-center">
            <p className="text-[#D4AF37] uppercase tracking-widest text-sm mb-3">Get in Touch</p>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#F5E6C8] mb-6">Contact Us</h1>
            <p className="text-[#F5E6C8]/80 max-w-3xl mx-auto text-lg">
              We&apos;re here to assist you with any inquiries or special requests
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-12">

              {/* Contact Info */}
              <div className="lg:col-span-1 space-y-6">
                <Card className="p-6 bg-[#F5E6C8]/30">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#5C0A1E] flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6 text-[#D4AF37]" />
                    </div>
                    <div>
                      <h3 className="font-serif font-semibold text-[#5C0A1E] mb-1">Address</h3>
                      <p className="text-[#5C0A1E]/70 text-sm">
                        123 Garden Boulevard
                        <br />
                        Paradise City, PC 12345
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-[#F5E6C8]/30">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#5C0A1E] flex items-center justify-center shrink-0">
                      <Phone className="w-6 h-6 text-[#D4AF37]" />
                    </div>
                    <div>
                      <h3 className="font-serif font-semibold text-[#5C0A1E] mb-1">Phone</h3>
                      <p className="text-[#5C0A1E]/70 text-sm">
                        +1 (555) 123-4567
                        <br />
                        +1 (555) 987-6543
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-[#F5E6C8]/30">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#5C0A1E] flex items-center justify-center shrink-0">
                      <Mail className="w-6 h-6 text-[#D4AF37]" />
                    </div>
                    <div>
                      <h3 className="font-serif font-semibold text-[#5C0A1E] mb-1">Email</h3>
                      <p className="text-[#5C0A1E]/70 text-sm">
                        info@venciosgarden.com
                        <br />
                        reservations@venciosgarden.com
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-[#F5E6C8]/30">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#5C0A1E] flex items-center justify-center shrink-0">
                      <Clock className="w-6 h-6 text-[#D4AF37]" />
                    </div>
                    <div>
                      <h3 className="font-serif font-semibold text-[#5C0A1E] mb-1">Hours</h3>
                      <p className="text-[#5C0A1E]/70 text-sm">
                        Front Desk: 24/7
                        <br />
                        Restaurant: 6AM - 11PM
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card className="p-8">
                  <h2 className="text-2xl font-serif font-bold text-[#5C0A1E] mb-6">Send Us a Message</h2>

                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-[#5C0A1E] mb-2 block">First Name</Label>
                        <Input className="border-[#5C0A1E]/30" placeholder="John" />
                      </div>
                      <div>
                        <Label className="text-[#5C0A1E] mb-2 block">Last Name</Label>
                        <Input className="border-[#5C0A1E]/30" placeholder="Doe" />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-[#5C0A1E] mb-2 block">Email</Label>
                        <Input className="border-[#5C0A1E]/30" type="email" placeholder="john@example.com" />
                      </div>
                      <div>
                        <Label className="text-[#5C0A1E] mb-2 block">Phone</Label>
                        <Input className="border-[#5C0A1E]/30" type="tel" placeholder="+1 (555) 123-4567" />
                      </div>
                    </div>

                    <div>
                      <Label className="text-[#5C0A1E] mb-2 block">Subject</Label>
                      <Input className="border-[#5C0A1E]/30" placeholder="How can we help you?" />
                    </div>

                    <div>
                      <Label className="text-[#5C0A1E] mb-2 block">Message</Label>
                      <textarea
                        className="w-full border border-[#5C0A1E]/30 rounded-md p-3 min-h-[150px] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                        placeholder="Tell us more about your inquiry..."
                      />
                    </div>

                    <Button type="submit" className="w-full bg-[#5C0A1E] hover:bg-[#8B1538] text-[#F5E6C8]" size="lg">
                      Send Message
                    </Button>
                  </form>
                </Card>
              </div>
            </div>

            {/* Map */}
            <div className="mt-16">
              <div className="bg-[#F5E6C8]/30 rounded-lg overflow-hidden h-[400px] relative">
                <Image
                  src="/placeholder.svg?height=400&width=1200"
                  alt="Hotel Location Map"
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
