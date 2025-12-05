"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Utensils, Phone } from 'lucide-react'

const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
)

export default function RestaurantPage (){
    const [step, setStep] = useState(1)

    const stepIcons = [Utensils, Phone]

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">

        {/* Hero Section */}
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
            <p className="text-amber-400 uppercase tracking-[0.3em] text-lg mb-4 font-semibold">Where Flavor Meets Freshness</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4">
              A Place for Families, Friends & Good Food
            </h1>
            <p className="text-lg text-stone-300 max-w-2xl mx-auto">
              At Vencio&apos;s Garden Hotel & Restaurant, enjoy Filipino favorites and hearty meals perfect for any gathering—lunch, merienda, or dinner.
            </p>
          </div>
        </section>

        {/* RESTAURANT MENU */}
        <section className="py-10 px-2 lg:px-10 bg-[#F5E6C8]/30 shadow-lg">
            <div className="mx-auto px-4">
                {/* Progress Steps */}
                <div className="flex justify-center mb-12">
                    <div className="flex items-center gap-2 md:gap-4 bg-white rounded-2xl shadow-xl p-4 md:p-6">
                        {[
                        { num: 1, label: "Menu" },
                        { num: 2, label: "Contact Info" },
                        ].map((s, idx) => {
                        const Icon = stepIcons[idx]
                        return (
                            <div key={s.num} className="flex items-center">
                            <div className="flex flex-col items-center gap-2">
                                <div
                                className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold transition-all duration-500 ${step >= s.num ? "bg-linear-to-br from-rose-800 to-red-900 text-white shadow-lg" : "bg-stone-100 text-stone-400 border-2 border-stone-200"}`}
                                >
                                {step > s.num ? <CheckIcon className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                                </div>
                                <span
                                className={`text-xs md:text-sm font-semibold hidden md:block transition-colors ${step >= s.num ? "text-rose-900" : "text-stone-400"}`}
                                >
                                {s.label}
                                </span>
                            </div>
                            {idx < 1 && (
                                <div
                                className={`w-12 md:w-24 h-1.5 mx-2 rounded-full transition-all duration-500 ${step > s.num ? "bg-linear-to-r from-rose-800 to-red-900" : "bg-stone-200"}`}
                                />
                            )}
                            </div>
                        )
                        })}
                    </div>
                </div>

                <div className="flex justify-center">
                    <Tabs defaultValue="restaurant" className="w-full">
                    <TabsList>
                        <TabsTrigger 
                            value="restaurant" 
                            className="text-xl"
                        >
                            Restaurant
                        </TabsTrigger>

                        <TabsTrigger 
                            value="takeout" 
                            className="text-xl"
                        >
                            Takeout
                        </TabsTrigger>

                        <TabsTrigger 
                            value="buns-and-rolls" 
                            className="text-xl"
                        >
                            Buns & Rolls
                        </TabsTrigger>
                    </TabsList>

                    {/* Restaurant */}
                    <TabsContent value="restaurant">
                        <Card className="w-full">
                        <CardHeader>
                            <CardTitle className="text-3xl text-[#5C0A1E]">
                                Vencio&apos;s Garden Seafood Cafe
                            </CardTitle>
                            <CardDescription className="text-lg text-[#5C0A1E]/80">
                            Dine, Celebrate or let us cater your special moments <b>because every occasion deserve the best!</b>
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[1, 3, 4, 5].map((num) => (
                                    <div
                                        key={num}
                                        className="w-full h-[90vh] bg-cover bg-center rounded-lg shadow-lg border-2 border-[#5C0A1E]"
                                        style={{ backgroundImage: `url('/resto-menu-${num}.jpg')` }}
                                    />
                                ))}
                            </div>
                                <div className="mt-10 mb-5 flex items-center justify-end">
                                    <Link href="/contact">
                                        <Button className="text-xl h-full w-42">
                                            Ready to Order?
                                        </Button>
                                    </Link>
                                </div>
                        </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Take Out */}
                    <TabsContent value="takeout">
                        <Card className="w-full">
                        <CardHeader>
                            <CardTitle className="text-3xl text-[#5C0A1E]">
                                Takeout Orders
                            </CardTitle>
                            <CardDescription className="text-lg text-[#5C0A1E]/80">
                                Your Favorite Vencio&apos;s Dishes, Freshly Prepared and Ready to Go
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                <div
                                className="w-full h-[90vh] bg-cover bg-center rounded-lg shadow-lg border-2 border-[#5C0A1E]"
                                style={{ backgroundImage: "url('/takeout-1.png')" }}
                                />
                                <div
                                className="w-full h-[90vh] bg-cover bg-center rounded-lg shadow-lg border-2 border-[#5C0A1E]"
                                style={{ backgroundImage: "url('/takeout-2.png')" }}
                                />
                                <div
                                className="w-full h-[90vh] bg-cover bg-center rounded-lg shadow-lg border-2 border-[#5C0A1E]"
                                style={{ backgroundImage: "url('/takeout-5.png')" }}
                                />

                                <div className="flex flex-col gap-4 h-[90vh]">
                                    <div
                                        className="flex-1 w-full bg-contain bg-no-repeat bg-center rounded-lg shadow-lg border-2 border-[#5C0A1E]"
                                        style={{ backgroundImage: "url('/takeout-3.png')" }}
                                    />
                                    <div
                                        className="flex-1 w-full bg-contain bg-no-repeat bg-center rounded-lg shadow-lg border-2 border-[#5C0A1E]"
                                        style={{ backgroundImage: "url('/takeout-4.jpg')" }}
                                    />
                                </div>
                            </div>
                                <div className="mt-10 mb-5 flex items-center justify-end">
                                    <Link href={'/restaurant/${restaurant.id}'}>
                                        <Button className="text-xl h-full w-42">
                                            Ready to Order?
                                        </Button>
                                    </Link>
                                </div>
                        </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Buns & Rolls */}
                    <TabsContent value="buns-and-rolls">
                        <Card className="w-full">
                        <CardHeader>
                            <CardTitle className="text-3xl text-[#5C0A1E]">
                                Buns and Rolls
                            </CardTitle>
                            <CardDescription className="text-lg text-[#5C0A1E]/80">
                                Freshly Baked Treats Perfect for Any Craving
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div>
                                <div className="my-3 flex items-center justify-center">
                                    <h1 className="text-3xl text-[#5C0A1E] underline">Best Sellers</h1>
                                </div>
                                    <div className="grid grid-cols-4">
                                        
                                    </div>
                                <div className="my-3 flex items-center justify-center">
                                    <h1 className="text-3xl text-[#5C0A1E] underline">Gift a Customized Photo Cake to Your Loveones</h1>
                                </div>
                                    <div className="grid grid-cols-3">
                                        
                                    </div>
                            </div>
                                <div className="mt-10 mb-5 flex items-center justify-end">
                                    <Link href="/contact">
                                        <Button className="text-xl h-full w-42">
                                            Ready to Order?
                                        </Button>
                                    </Link>
                                </div>
                        </CardContent>
                        </Card>
                    </TabsContent>
                    </Tabs>
                </div>
            </div>
        </section>
      </main>
        <div className="h-1 bg-[#D4AF37]"/>
      <Footer />
    </div>
  )
}
