"use client"

import React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, Clock, Send, MessageCircle, CheckCircle2, MapPin, X } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export default function ContactPage() {
  const [pageLoading, setPageLoading] = useState(true)
  const [contentReady, setContentReady] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setContentReady(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleLoadingComplete = () => {
    setPageLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'
      
      console.log('Sending request to:', `${apiUrl}/api/contact`) // Debug log
      
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
        }),
      })

      console.log('Response status:', response.status) // Debug log

      const data = await response.json()
      console.log('Response data:', data) // Debug log

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Failed to send message')
      }

      setSubmitted(true)
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
    } catch (error) {
      console.error('Full error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Failed to send message. Please try again.'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const [openAcc1, setOpenAcc1] = React.useState(true);
  const [openAcc2, setOpenAcc2] = React.useState(true);
  const [openAcc3, setOpenAcc3] = React.useState(true);
 
  const handleOpenAcc1 = () => setOpenAcc1((cur) => !cur);
  const handleOpenAcc2 = () => setOpenAcc2((cur) => !cur);
  const handleOpenAcc3 = () => setOpenAcc3((cur) => !cur);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        
        <section className="relative py-20 bg-linear-to-br from-rose-950 via-red-900 to-rose-950 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "radial-gradient(circle at 2px 2px, rgba(212,175,55,0.3) 1px, transparent 0)",
                backgroundSize: "40px 40px",
              }}
            />
          </div>
          <div className="relative container mx-auto px-4 text-center">
            <p className="text-amber-400 uppercase tracking-[0.3em] text-md mb-4 font-semibold">Relax in the heart of Calapan City</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4">
              Contact Us            
            </h1>
            <p className="text-lg text-stone-300 max-w-2xl mx-auto">
              A serene escape in the heart of Calapan City, Oriental Mindoro
            </p>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="max-w-7xl mx-auto px-4 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Left Column - Contact Information */}
            <section className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl font-black text-[#5C0A1E] leading-tight">
                  Ready to Create
                  <span className="block text-[#D4AF37]">
                    Unforgettable Memories?
                  </span>
                </h2>
                <p className="text-lg text-[#5C0A1E] leading-relaxed">
                  Whether you&apos;re planning a business trip, romantic getaway, or family vacation, our team is here to
                  ensure every detail is perfect.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="p-6 bg-[#F5E6C8]/30">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#5C0A1E] flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6 text-[#D4AF37]" />
                    </div>
                      <h3 className="font-serif font-semibold text-[#5C0A1E] text-2xl mb-1">Map</h3>
                  </div>
                  <div>
                    <p className="text-[#5C0A1E]/70 text-lg leading-relaxed">
                      #08 Nautical Highway, Tawiran, Calapan City, Oriental Mindoro
                    </p>
                  </div>
                </Card>

                <Card className="p-6 bg-[#F5E6C8]/30">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#5C0A1E] flex items-center justify-center shrink-0">
                      <Phone className="w-6 h-6 text-[#D4AF37]" />
                    </div>
                      <h3 className="font-serif font-semibold text-[#5C0A1E] text-2xl mb-1">Phone</h3>
                  </div>
                  <div>
                    <div className="text-[#5C0A1E]/70 text-lg leading-relaxed">
                      <p>Hotel: 288-7789</p>
                      <p>Restaurant: 288-7790</p>
                      <p>Takeout: 0918 957 2855</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-[#F5E6C8]/30">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#5C0A1E] flex items-center justify-center shrink-0">
                      <Mail className="w-6 h-6 text-[#D4AF37]" />
                    </div>
                      <h3 className="font-serif font-semibold text-[#5C0A1E] text-2xl mb-1">Email</h3>
                  </div>
                  <div>
                    <p className="text-[#5C0A1E]/70 text-lg leading-relaxed">
                      venciosgarden@yahoo.com
                    </p>
                  </div>
                </Card>

                <Card className="p-6 bg-[#F5E6C8]/30">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#5C0A1E] flex items-center justify-center shrink-0">
                      <Clock className="w-6 h-6 text-[#D4AF37]" />
                    </div>
                      <h3 className="font-serif font-semibold text-[#5C0A1E] text-2xl mb-1">Hours</h3>
                  </div>
                  <div>
                    <div className="text-[#5C0A1E]/70 text-lg leading-relaxed">
                      <p>Front Desk: 24/7</p> 
                      <p>Restaurant: 6AM – 11PM</p>
                    </div>
                  </div>
                </Card>
              </div>


              {/* Google Maps Embed */}
              <div className="my-8 border border-red-200 shadow-2xl overflow-hidden rounded-lg">
                <div className="relative w-full overflow-hidden rounded-lg">
                  <div className="w-full h-90 pb-[56.25%] sm:pb-[56.25%] md:pb-[60%] lg:pb-[56.25%]">
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3881.2570075086383!2d121.1689606!3d13.3964063!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bceece975a1a9d%3A0x287cc64012d92786!2sVencios%20Garden%20Hotel%20and%20Restaurant!5e0!3m2!1sen!2sph!4v1764657903028!5m2!1sen!2sph"
                      title="Vencio's Garden Hotel and Restaurant Map"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Right Column - Contact Form */}
            <section>
              <div className="shadow-2xl overflow-hidden rounded-lg bg-[#F5E6C8]/30">
                <div className="bg-[#5C0A1E] text-white relative overflow-hidden">
                  <div className="relative p-8">
                    <h3 className="text-3xl font-black text-white flex items-center mb-2">
                      <MessageCircle className="w-8 h-8 mr-3 text-[#D4AF37]" />
                      Get in Touch
                    </h3>
                    <p className="text-red-100 text-lg">Send us a message and we&apos;ll get back to you as soon as possible</p>
                  </div>
                </div>

                <div className="p-8">
                  {submitted ? (
                    <div className="text-center py-12">
                      <div className="w-24 h-24 rounded-full bg-linear-to-r from-green-600 to-green-500 flex items-center justify-center mx-auto mb-6 animate-bounce">
                        <CheckCircle2 className="w-12 h-12 text-white" />
                      </div>
                      <h3 className="text-3xl font-bold text-[#5C0A1E] mb-4">Message Sent!</h3>
                      <p className="text-[#5C0A1E]/80 mb-8 text-lg">
                        Thank you for reaching out. Our team will contact you within 30 minutes.
                      </p>
                      <Button
                        onClick={() => setSubmitted(false)}
                        className="bg-[#5C0A1E] text-[#F5E6C8] px-8 py-3 rounded-full font-semibold"
                      >
                        Send Another Message
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Error Message Display */}
                      {error && (
                        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center shrink-0">
                              <X className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-bold text-[#5C0A1E] mb-1">Error</h4>
                              <p className="text-[#5C0A1E]/80">{error}</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => setError(null)}
                              className="text-[#5C0A1E] transition-colors"
                              aria-label="Close error"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="block text-sm font-bold text-[#5C0A1E]" aria-required>Full Name *</label>
                          <Input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="border-2 border-red-200 focus:border-red-500 focus:ring-red-500 h-12 rounded-lg"
                            placeholder="John Smith"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-sm font-bold text-[#5C0A1E]" aria-required>Email Address *</label>
                          <Input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="border-2 border-red-200 focus:border-red-500 focus:ring-red-500 h-12 rounded-lg"
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="block text-sm font-bold text-[#5C0A1E]" aria-required>Phone Number *</label>
                          <Input
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            className="border-2 border-red-200 focus:border-red-500 focus:ring-red-500 h-12 rounded-lg"
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-sm font-bold text-[#5C0A1E]" aria-required>Subject *</label>
                          <Input
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            className="border-2 border-red-200 focus:border-red-500 focus:ring-red-500 h-12 rounded-lg"
                            placeholder="How can we help you?"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-bold text-[#5C0A1E]" aria-required>Your Message *</label>
                        <Textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          className="h-48 text-lg border-2 border-red-200 focus:border-red-500 focus:ring-red-500 resize-none rounded-lg"
                          placeholder="Tell us about your inquiry, special requests, or how we can make your stay perfect..."
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#5C0A1E] hover:from-red-800 hover:to-red-400 disabled:from-gray-400 disabled:to-gray-400 h-14 text-lg font-bold rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                      >
                        {loading ? (
                          <>
                            <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin mr-3" />
                            Sending Your Message...
                          </>
                        ) : (
                          <>
                            <Send className="w-6 h-6 mr-3" />
                            Send Message
                          </>
                        )}
                      </Button>

                      <p className="text-sm text-[#5C0A1E] text-center">
                        We respect your privacy and will never share your information with third parties.
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </section>
          </div>
        </section>

        {/* FAQ Section */}
        <div className="h-1 bg-[#D4AF37]"/>
        <section className="py-10 px-10 bg-[#F5E6C8]/30 shadow-lg">
          <div className="text-center my-5">
            <h2 className="text-3xl md:text-4xl font-bold text-[#5C0A1E]">
              Frequently Asked Questions
            </h2>
            <p className="py-5 text-[#5C0A1E]/90 text-lg ">
              Find answers about the most frequently asked questions in Vencio's Garden Hotel & Restaurant. Your queries, simplified. 
            </p>
          </div>
          <div className="flex items-center justify-center">
            <Accordion
              type="single"
              collapsible
              className="w-full max-w-3xl lg:max-w-6xl"
              defaultValue="item-1"
            >
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-2xl lg:text-3xl text-[#5C0A1E]">
                  Do you deliver Takeouts?
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-xl text-balance text-[#5C0A1E]/80">
                  <p>
                    <b>No.</b> But we transact to local couriers within Calapan:<br/>
                    <b>Hatid and Broooom Delivery Services</b>
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-2xl lg:text-3xl text-[#5C0A1E]">
                  Payment Methods
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-xl text-balance text-[#5C0A1E]/80">
                  <p>
                    We accept <b>Cash and GCash</b> Transactions for private transactions.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-2xl lg:text-3xl text-[#5C0A1E]">
                  Can we book in advanced our choosen KTV rooms?
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-xl text-balance text-[#5C0A1E]/80">
                  <p>
                    <b>Yes.</b> This would depend on the availability of the priate KTV rooms.
                    We strongly advise to place your reservation in <b>advance</b> to minimize 
                    waiting time.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-2xl lg:text-3xl text-[#5C0A1E]">
                  Payment Terms for KTV
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-xl text-balance text-[#5C0A1E]/80">
                  <p>
                    For advance bookings, please settle <b>50%</b> of the total bill as down payment.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger className="text-2xl lg:text-3xl text-[#5C0A1E]">
                  How many hours can we stay inside the KTV?
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-xl text-balance text-[#5C0A1E]/80">
                  <p>
                    Reservation is inclusive of 3 hours use of karaoke room.
                  </p>
                  <p>
                    <b>For every additional hour,</b> <u>₱398</u> will be automatically added to your total bill.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-6">
                <AccordionTrigger className="text-2xl lg:text-3xl text-[#5C0A1E]">
                  Discount for the Senior Citizen?
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-xl text-balance text-[#5C0A1E]/80">
                  <p>
                    Please be advised we will deduct 20% to the highest meal consumed by senior/s.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-7">
                <AccordionTrigger className="text-2xl lg:text-3xl text-[#5C0A1E]">
                  Payment Terms for Takeout Orders
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-xl text-balance text-[#5C0A1E]/80">
                  <p>
                    To avoid any delays, we kindly ask that you <b>settle your bill before</b> receiving your order.
                    Please also provide your <b>full name, list of orders</b> and <b>contact number</b> for any follow-up concerns.
                  </p>
                  <p>
                    For <b>GCash payments</b>, please send a screenshot of your transaction as proof of payment.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-8">
                <AccordionTrigger className="text-2xl lg:text-3xl text-[#5C0A1E]">
                  How can I receive my order?
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-xl text-balance text-[#5C0A1E]/80">
                  <p>
                    All takeout orders are either taken through pick-up or third-party delivery transactions.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </main>
    <Footer />
    </div>
  )
}