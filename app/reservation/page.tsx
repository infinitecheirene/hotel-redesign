"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
)

const BedIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    />
  </svg>
)

const UsersIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
)

const MaximizeIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
    />
  </svg>
)

const CalendarIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
)

const ClockIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

const SunIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
)

const MoonIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
    />
  </svg>
)

const StarIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)

const ChevronLeftIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
)

const ChevronRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
)

const venues = [
  { id: "1", name: "Main Hall", capacity: 500, price: 2500, size: "500 sqm" },
  { id: "2", name: "Audio Visual Room", capacity: 100, price: 800, size: "120 sqm" },
  { id: "3", name: "Conference Room A", capacity: 50, price: 500, size: "80 sqm" },
  { id: "4", name: "Conference Room B", capacity: 30, price: 350, size: "50 sqm" },
  { id: "5", name: "Executive Boardroom", capacity: 20, price: 400, size: "40 sqm" },
]

const rooms = [
  { id: "1", name: "Standard Garden Room", price: 150, capacity: 2, size: "30 sqm", bedType: "Queen Bed" },
  { id: "2", name: "Deluxe Garden Suite", price: 250, capacity: 2, size: "45 sqm", bedType: "King Bed" },
  { id: "3", name: "Premium Family Room", price: 380, capacity: 4, size: "65 sqm", bedType: "2 Queen Beds" },
  { id: "4", name: "Executive Suite", price: 320, capacity: 2, size: "55 sqm", bedType: "King Bed" },
  { id: "5", name: "Honeymoon Villa", price: 550, capacity: 2, size: "80 sqm", bedType: "Emperor Bed" },
  { id: "6", name: "Royal Penthouse", price: 750, capacity: 4, size: "120 sqm", bedType: "Emperor Bed + 2 Singles" },
]

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

type EventType = "single" | "multi"

export default function ReservationPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [eventType, setEventType] = useState<EventType>("single")
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [checkInDate, setCheckInDate] = useState<Date | null>(null)
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null)
  const [selectedVenue, setSelectedVenue] = useState<string>("")
  const [attendees, setAttendees] = useState("50")
  const [needRooms, setNeedRooms] = useState(false)
  const [selectedRooms, setSelectedRooms] = useState<{ [key: string]: number }>({})
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    organization: "",
    eventName: "",
    contactPerson: "",
    position: "",
    email: "",
    phone: "",
    details: "",
  })

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    return { firstDay, daysInMonth }
  }

  const { firstDay, daysInMonth } = getDaysInMonth(currentDate)

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const selectDate = (day: number) => {
    const selected = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (selected < today) return

    if (eventType === "single") {
      setSelectedDate(selected)
      setCheckInDate(null)
      setCheckOutDate(null)
    } else {
      if (!checkInDate || (checkInDate && checkOutDate)) {
        setCheckInDate(selected)
        setCheckOutDate(null)
        setSelectedDate(null)
      } else if (checkInDate && !checkOutDate) {
        if (selected > checkInDate) {
          setCheckOutDate(selected)
        } else if (selected < checkInDate) {
          setCheckInDate(selected)
          setCheckOutDate(null)
        } else {
          setEventType("single")
          setSelectedDate(selected)
          setCheckInDate(null)
          setCheckOutDate(null)
        }
      }
    }
  }

  const handleEventTypeChange = (type: EventType) => {
    setEventType(type)
    setSelectedDate(null)
    setCheckInDate(null)
    setCheckOutDate(null)
    setNeedRooms(false)
    setSelectedRooms({})
  }

  const isDateInRange = (day: number) => {
    if (!checkInDate || !checkOutDate) return false
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    return date > checkInDate && date < checkOutDate
  }

  const isCheckIn = (day: number) => {
    if (!checkInDate) return false
    return (
      checkInDate.getDate() === day &&
      checkInDate.getMonth() === currentDate.getMonth() &&
      checkInDate.getFullYear() === currentDate.getFullYear()
    )
  }

  const isCheckOut = (day: number) => {
    if (!checkOutDate) return false
    return (
      checkOutDate.getDate() === day &&
      checkOutDate.getMonth() === currentDate.getMonth() &&
      checkOutDate.getFullYear() === currentDate.getFullYear()
    )
  }

  const isSingleDate = (day: number) => {
    if (!selectedDate) return false
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentDate.getMonth() &&
      selectedDate.getFullYear() === currentDate.getFullYear()
    )
  }

  const isToday = (day: number) => {
    const today = new Date()
    return (
      today.getDate() === day &&
      today.getMonth() === currentDate.getMonth() &&
      today.getFullYear() === currentDate.getFullYear()
    )
  }

  const isPastDate = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today
  }

  const numberOfNights = useMemo(() => {
    if (eventType === "single") return 0
    if (!checkInDate || !checkOutDate) return 0
    const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }, [checkInDate, checkOutDate, eventType])

  const numberOfDays = eventType === "single" ? 1 : numberOfNights
  const selectedVenueData = venues.find((v) => v.id === selectedVenue)

  const roomTotal = useMemo(() => {
    if (eventType === "single" || numberOfNights === 0) return 0
    return Object.entries(selectedRooms).reduce((sum, [roomId, quantity]) => {
      const room = rooms.find((r) => r.id === roomId)
      return sum + (room ? room.price * quantity * numberOfNights : 0)
    }, 0)
  }, [selectedRooms, numberOfNights, eventType])

  const venueTotal = (selectedVenueData?.price || 0) * (numberOfDays || 1)
  const totalPrice = venueTotal + roomTotal

  const updateRoomQuantity = (roomId: string, quantity: number) => {
    if (quantity === 0) {
      const newRooms = { ...selectedRooms }
      delete newRooms[roomId]
      setSelectedRooms(newRooms)
    } else {
      setSelectedRooms({ ...selectedRooms, [roomId]: quantity })
    }
  }

  const isDateSelected = eventType === "single" ? !!selectedDate : !!checkInDate && !!checkOutDate

  const stepIcons = [CalendarIcon, UsersIcon, StarIcon]

  return (
    <div className="min-h-screen bg-stone-100">
      <Header />
      <main className="pt-20">
        {/* Hero Section - Burgundy gradient matching logo */}
        <section className="relative py-20 bg-gradient-to-br from-rose-950 via-red-900 to-rose-950 overflow-hidden">
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
            <p className="text-amber-400 uppercase tracking-[0.3em] text-sm mb-4 font-semibold">Book Your Event</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4">
              Event & Meeting Reservation
            </h1>
            <p className="text-lg text-stone-300 max-w-2xl mx-auto">
              Create unforgettable moments in our elegant venues at Vencios Garden
            </p>
          </div>
        </section>

        {/* Reservation Form */}
        <section className="py-16 -mt-8 relative z-10">
          <div className="container mx-auto px-4">
            {/* Progress Steps */}
            <div className="flex justify-center mb-12">
              <div className="flex items-center gap-2 md:gap-4 bg-white rounded-2xl shadow-xl p-4 md:p-6">
                {[
                  { num: 1, label: "Date & Venue" },
                  { num: 2, label: "Contact Info" },
                  { num: 3, label: "Review" },
                ].map((s, idx) => {
                  const Icon = stepIcons[idx]
                  return (
                    <div key={s.num} className="flex items-center">
                      <div className="flex flex-col items-center gap-2">
                        <div
                          className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold transition-all duration-500 ${step >= s.num ? "bg-gradient-to-br from-rose-800 to-red-900 text-white shadow-lg" : "bg-stone-100 text-stone-400 border-2 border-stone-200"}`}
                        >
                          {step > s.num ? <CheckIcon className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                        </div>
                        <span
                          className={`text-xs md:text-sm font-semibold hidden md:block transition-colors ${step >= s.num ? "text-rose-900" : "text-stone-400"}`}
                        >
                          {s.label}
                        </span>
                      </div>
                      {idx < 2 && (
                        <div
                          className={`w-12 md:w-24 h-1.5 mx-2 rounded-full transition-all duration-500 ${step > s.num ? "bg-gradient-to-r from-rose-800 to-red-900" : "bg-stone-200"}`}
                        />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="max-w-7xl mx-auto">
              <Card className="bg-white border-0 shadow-2xl rounded-3xl overflow-hidden">
                <div className="p-6 md:p-10">
                  {step === 1 && (
                    <div className="space-y-8">
                      <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-rose-950 mb-3">
                          Select Date & Venue
                        </h2>
                        <p className="text-stone-500 text-lg">Choose your event type, dates, and perfect venue</p>
                      </div>

                      {/* Event Type Toggle */}
                      <div className="flex justify-center mb-8">
                        <div className="inline-flex bg-stone-100 p-1.5 rounded-2xl">
                          <button
                            onClick={() => handleEventTypeChange("single")}
                            className={`flex items-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${eventType === "single" ? "bg-gradient-to-r from-rose-800 to-red-900 text-white shadow-lg" : "text-stone-500 hover:text-stone-700"}`}
                          >
                            <SunIcon className="w-5 h-5" />
                            <span>Single Day Event</span>
                          </button>
                          <button
                            onClick={() => handleEventTypeChange("multi")}
                            className={`flex items-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${eventType === "multi" ? "bg-gradient-to-r from-rose-800 to-red-900 text-white shadow-lg" : "text-stone-500 hover:text-stone-700"}`}
                          >
                            <MoonIcon className="w-5 h-5" />
                            <span>Multi-Day Event</span>
                          </button>
                        </div>
                      </div>

                      <div className="grid lg:grid-cols-2 gap-8">
                        {/* Left Column: Calendar */}
                        <div className="space-y-6">
                          <div>
                            <Label className="text-rose-950 mb-4 block text-lg font-bold flex items-center gap-2">
                              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                                <CalendarIcon className="w-4 h-4 text-white" />
                              </div>
                              {eventType === "single" ? "Event Date" : "Event Dates"}
                            </Label>
                            <div className="bg-stone-50 rounded-2xl border-2 border-stone-200 p-6">
                              {/* Calendar Header */}
                              <div className="flex items-center justify-between mb-6">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={previousMonth}
                                  className="h-12 w-12 p-0 border-2 border-stone-200 hover:bg-rose-800 hover:text-white hover:border-rose-800 transition-all rounded-xl bg-transparent"
                                >
                                  <ChevronLeftIcon className="w-5 h-5" />
                                </Button>
                                <h3 className="font-bold text-rose-950 text-xl">
                                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                                </h3>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={nextMonth}
                                  className="h-12 w-12 p-0 border-2 border-stone-200 hover:bg-rose-800 hover:text-white hover:border-rose-800 transition-all rounded-xl bg-transparent"
                                >
                                  <ChevronRightIcon className="w-5 h-5" />
                                </Button>
                              </div>

                              {/* Days of Week */}
                              <div className="grid grid-cols-7 gap-1 mb-2">
                                {daysOfWeek.map((day) => (
                                  <div key={day} className="text-center text-sm font-bold text-rose-900/70 py-2">
                                    {day}
                                  </div>
                                ))}
                              </div>

                              {/* Calendar Days */}
                              <div className="grid grid-cols-7 gap-1">
                                {Array.from({ length: firstDay }).map((_, i) => (
                                  <div key={`empty-${i}`} className="aspect-square" />
                                ))}
                                {Array.from({ length: daysInMonth }).map((_, i) => {
                                  const day = i + 1
                                  const inRange = isDateInRange(day)
                                  const isStart = isCheckIn(day)
                                  const isEnd = isCheckOut(day)
                                  const isSingle = isSingleDate(day)
                                  const isPast = isPastDate(day)

                                  return (
                                    <button
                                      key={day}
                                      onClick={() => selectDate(day)}
                                      disabled={isPast}
                                      className={`aspect-square rounded-xl flex items-center justify-center text-sm font-semibold transition-all duration-200
                                        ${
                                          isPast
                                            ? "text-stone-300 cursor-not-allowed"
                                            : isStart || isEnd || isSingle
                                              ? "bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-lg scale-105"
                                              : inRange
                                                ? "bg-amber-100 text-rose-900"
                                                : isToday(day)
                                                  ? "bg-rose-100 text-rose-900 ring-2 ring-rose-300"
                                                  : "bg-white text-stone-700 hover:bg-rose-50 hover:text-rose-900"
                                        }`}
                                    >
                                      {day}
                                    </button>
                                  )
                                })}
                              </div>
                            </div>

                            {/* Date Summary */}
                            <div className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-200">
                              {eventType === "single" ? (
                                selectedDate ? (
                                  <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-sm">
                                      <SunIcon className="w-4 h-4 text-amber-600" />
                                      <span className="font-semibold text-rose-950">Event Date:</span>
                                      <span className="text-stone-700">
                                        {selectedDate.toLocaleDateString("en-US", {
                                          weekday: "short",
                                          month: "short",
                                          day: "numeric",
                                          year: "numeric",
                                        })}
                                      </span>
                                    </div>
                                    <p className="text-xs text-stone-500">
                                      Single day event - no overnight accommodation needed
                                    </p>
                                  </div>
                                ) : (
                                  <p className="text-sm text-stone-500 text-center">
                                    Select your event date from the calendar above
                                  </p>
                                )
                              ) : checkInDate ? (
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2 text-sm">
                                    <span className="font-semibold text-rose-950">Check-in:</span>
                                    <span className="text-stone-700">
                                      {checkInDate.toLocaleDateString("en-US", {
                                        weekday: "short",
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                      })}
                                    </span>
                                  </div>
                                  {checkOutDate ? (
                                    <>
                                      <div className="flex items-center gap-2 text-sm">
                                        <span className="font-semibold text-rose-950">Check-out:</span>
                                        <span className="text-stone-700">
                                          {checkOutDate.toLocaleDateString("en-US", {
                                            weekday: "short",
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                          })}
                                        </span>
                                      </div>
                                      <div className="flex items-center gap-2 pt-2 border-t border-amber-200">
                                        <ClockIcon className="w-4 h-4 text-amber-600" />
                                        <span className="font-bold text-amber-700 text-lg">
                                          {numberOfNights} {numberOfNights === 1 ? "Night" : "Nights"}
                                        </span>
                                      </div>
                                    </>
                                  ) : (
                                    <p className="text-xs text-stone-500">Now select your check-out date</p>
                                  )}
                                </div>
                              ) : (
                                <p className="text-sm text-stone-500 text-center">
                                  Select check-in and check-out dates
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Venue & Attendees */}
                          <div className="space-y-6">
                            <div>
                              <Label className="text-rose-950 mb-3 block text-lg font-bold">Venue</Label>
                              <Select value={selectedVenue} onValueChange={setSelectedVenue}>
                                <SelectTrigger className="border-2 border-stone-200 h-14 text-base hover:border-amber-400 transition-colors bg-white">
                                  <SelectValue placeholder="Select your venue" />
                                </SelectTrigger>
                                <SelectContent>
                                  {venues.map((venue) => (
                                    <SelectItem key={venue.id} value={venue.id} className="text-base py-3">
                                      <div className="flex flex-col">
                                        <span className="font-semibold text-rose-950">{venue.name}</span>
                                        <span className="text-sm text-stone-500">
                                          ${venue.price}/day - {venue.size} - Max {venue.capacity} guests
                                        </span>
                                      </div>
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label className="text-rose-950 mb-3 block text-lg font-bold">Expected Attendees</Label>
                              <Input
                                type="number"
                                value={attendees}
                                onChange={(e) => setAttendees(e.target.value)}
                                className="border-2 border-stone-200 h-14 text-base hover:border-amber-400 transition-colors bg-white"
                                placeholder="Number of guests"
                              />
                            </div>

                            {/* Need Rooms Checkbox - Only for multi-day */}
                            {eventType === "multi" && numberOfNights > 0 && (
                              <div className="flex items-center space-x-3 p-4 bg-rose-50 rounded-xl border-2 border-rose-200">
                                <Checkbox
                                  id="needRooms"
                                  checked={needRooms}
                                  onCheckedChange={(checked) => {
                                    setNeedRooms(checked as boolean)
                                    if (!checked) setSelectedRooms({})
                                  }}
                                  className="w-5 h-5"
                                />
                                <label
                                  htmlFor="needRooms"
                                  className="text-base font-medium text-rose-950 leading-none cursor-pointer"
                                >
                                  I need accommodation rooms for attendees ({numberOfNights}{" "}
                                  {numberOfNights === 1 ? "night" : "nights"})
                                </label>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Right Column: Venue Details */}
                        <div className="space-y-6">
                          {selectedVenueData ? (
                            <div className="bg-gradient-to-br from-rose-50 to-amber-50 p-6 rounded-2xl border-2 border-rose-200 sticky top-24">
                              <h3 className="text-2xl font-serif font-bold text-rose-950 mb-4">
                                {selectedVenueData.name}
                              </h3>

                              {/* Venue Stats */}
                              <div className="grid grid-cols-3 gap-3 mb-6">
                                <div className="text-center p-3 bg-white rounded-xl border border-stone-200">
                                  <MaximizeIcon className="w-5 h-5 text-amber-600 mx-auto mb-1" />
                                  <p className="text-xs text-stone-500">Size</p>
                                  <p className="font-bold text-rose-950">{selectedVenueData.size}</p>
                                </div>
                                <div className="text-center p-3 bg-white rounded-xl border border-stone-200">
                                  <UsersIcon className="w-5 h-5 text-amber-600 mx-auto mb-1" />
                                  <p className="text-xs text-stone-500">Capacity</p>
                                  <p className="font-bold text-rose-950">{selectedVenueData.capacity}</p>
                                </div>
                                <div className="text-center p-3 bg-white rounded-xl border border-stone-200">
                                  <CalendarIcon className="w-5 h-5 text-amber-600 mx-auto mb-1" />
                                  <p className="text-xs text-stone-500">Price/Day</p>
                                  <p className="font-bold text-rose-950">${selectedVenueData.price}</p>
                                </div>
                              </div>

                              {/* Capacity Meter */}
                              {attendees && Number.parseInt(attendees) > 0 && (
                                <div className="mb-6">
                                  <div className="flex justify-between text-sm mb-2">
                                    <span className="text-stone-500">Capacity Usage</span>
                                    <span className="font-semibold text-rose-950">
                                      {Math.round((Number.parseInt(attendees) / selectedVenueData.capacity) * 100)}%
                                    </span>
                                  </div>
                                  <div className="h-3 bg-stone-200 rounded-full overflow-hidden">
                                    <div
                                      className="h-full bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-500"
                                      style={{
                                        width: `${Math.min((Number.parseInt(attendees) / selectedVenueData.capacity) * 100, 100)}%`,
                                      }}
                                    />
                                  </div>
                                  {Number.parseInt(attendees) > selectedVenueData.capacity && (
                                    <p className="text-xs text-red-600 mt-1">Warning: Exceeds venue capacity</p>
                                  )}
                                </div>
                              )}

                              {/* Live Pricing */}
                              {isDateSelected && (
                                <div className="border-t-2 border-rose-200 pt-4">
                                  <h4 className="font-semibold text-rose-950 mb-3">Booking Summary</h4>
                                  <div className="space-y-2 mb-4">
                                    <div className="flex justify-between text-sm">
                                      <span className="text-stone-500">Event Type</span>
                                      <span className="font-semibold text-rose-950">
                                        {eventType === "single"
                                          ? "Single Day"
                                          : `${numberOfNights} ${numberOfNights === 1 ? "Night" : "Nights"}`}
                                      </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                      <span className="text-stone-500">Venue Rate</span>
                                      <span className="text-rose-950">
                                        ${selectedVenueData.price} x {numberOfDays}{" "}
                                        {numberOfDays === 1 ? "day" : "days"}
                                      </span>
                                    </div>
                                    <div className="flex justify-between items-center pt-2 border-t border-stone-200">
                                      <span className="font-bold text-rose-950">Venue Total</span>
                                      <span className="text-2xl font-bold text-amber-600">${venueTotal}</span>
                                    </div>
                                  </div>

                                  {needRooms && Object.keys(selectedRooms).length > 0 && (
                                    <div className="mt-4 p-3 bg-amber-50 rounded-lg space-y-2">
                                      <p className="text-xs font-semibold text-rose-950 flex items-center gap-1">
                                        <BedIcon className="w-3 h-3" />
                                        Accommodation ({numberOfNights} {numberOfNights === 1 ? "night" : "nights"})
                                      </p>
                                      <div className="space-y-1">
                                        {Object.entries(selectedRooms).map(([roomId, quantity]) => {
                                          const room = rooms.find((r) => r.id === roomId)
                                          if (!room) return null
                                          return (
                                            <div key={roomId} className="flex justify-between text-xs">
                                              <span className="text-stone-600">
                                                {room.name} x {quantity}
                                              </span>
                                              <span className="text-rose-950 font-medium">
                                                ${room.price * quantity * numberOfNights}
                                              </span>
                                            </div>
                                          )
                                        })}
                                      </div>
                                      <div className="pt-2 border-t border-amber-200 flex justify-between">
                                        <span className="text-sm font-semibold text-rose-950">Rooms Total</span>
                                        <span className="text-lg font-bold text-amber-600">${roomTotal}</span>
                                      </div>
                                    </div>
                                  )}

                                  <div className="mt-4 p-4 bg-gradient-to-r from-rose-800 to-red-900 rounded-xl">
                                    <div className="flex justify-between items-center">
                                      <span className="text-white font-semibold">Grand Total</span>
                                      <span className="text-3xl font-bold text-amber-400">${totalPrice}</span>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* Amenities */}
                              <div className="mt-6 pt-4 border-t border-stone-200">
                                <h4 className="font-semibold text-rose-950 mb-3 text-sm">Included Amenities</h4>
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                  {[
                                    "WiFi",
                                    "Projector",
                                    "Sound System",
                                    "Air Conditioning",
                                    "Parking",
                                    "Catering Area",
                                  ].map((amenity) => (
                                    <div key={amenity} className="flex items-center gap-2 text-stone-600">
                                      <CheckIcon className="w-3 h-3 text-amber-600" />
                                      <span>{amenity}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="bg-stone-50 p-8 rounded-2xl border-2 border-dashed border-stone-300 text-center sticky top-24">
                              <CalendarIcon className="w-16 h-16 text-stone-300 mx-auto mb-4" />
                              <h3 className="text-lg font-semibold text-rose-950 mb-2">Select Your Venue</h3>
                              <p className="text-sm text-stone-500">
                                Choose {eventType === "single" ? "a date" : "dates"} and a venue to see detailed
                                information and pricing
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Room Selection - Only for multi-day */}
                      {eventType === "multi" && needRooms && numberOfNights > 0 && (
                        <div className="mt-8 p-6 bg-rose-50 rounded-2xl border-2 border-rose-200">
                          <h3 className="text-xl font-bold text-rose-950 mb-2 flex items-center gap-2">
                            <BedIcon className="w-5 h-5 text-amber-600" />
                            Select Accommodation Rooms
                          </h3>
                          <p className="text-sm text-stone-500 mb-6">
                            Pricing shown for {numberOfNights} {numberOfNights === 1 ? "night" : "nights"}
                          </p>
                          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {rooms.map((room) => (
                              <Card
                                key={room.id}
                                className="p-5 hover:shadow-lg transition-all duration-300 border-2 border-stone-200 hover:border-amber-400 bg-white"
                              >
                                <div className="mb-4">
                                  <h4 className="font-bold text-rose-950 mb-1">{room.name}</h4>
                                  <p className="text-lg font-bold text-amber-600">
                                    ${room.price}
                                    <span className="text-sm text-stone-500">/night</span>
                                  </p>
                                  <p className="text-sm text-rose-900/70 font-semibold">
                                    ${room.price * numberOfNights} total
                                  </p>
                                </div>
                                <div className="flex flex-wrap gap-2 text-xs text-stone-600 mb-4">
                                  <span className="flex items-center gap-1 bg-stone-100 px-2 py-1 rounded-full">
                                    <BedIcon className="w-3 h-3" />
                                    {room.bedType}
                                  </span>
                                  <span className="flex items-center gap-1 bg-stone-100 px-2 py-1 rounded-full">
                                    <UsersIcon className="w-3 h-3" />
                                    {room.capacity} guests
                                  </span>
                                  <span className="flex items-center gap-1 bg-stone-100 px-2 py-1 rounded-full">
                                    <MaximizeIcon className="w-3 h-3" />
                                    {room.size}
                                  </span>
                                </div>
                                <div className="flex items-center gap-3">
                                  <Label className="text-sm text-rose-950 font-semibold whitespace-nowrap">Qty:</Label>
                                  <Input
                                    type="number"
                                    min="0"
                                    value={selectedRooms[room.id] || 0}
                                    onChange={(e) => updateRoomQuantity(room.id, Number.parseInt(e.target.value) || 0)}
                                    className="h-10 text-base border-2 focus:border-amber-400 bg-white"
                                  />
                                </div>
                              </Card>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Price Summary */}
                      {selectedVenueData && isDateSelected && (
                        <div className="bg-gradient-to-br from-rose-100 to-amber-50 p-6 rounded-2xl border-2 border-rose-200">
                          <h3 className="text-xl font-bold text-rose-950 mb-4">Booking Summary</h3>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center pb-2 border-b border-stone-200">
                              <div>
                                <span className="text-rose-950 font-semibold">{selectedVenueData.name}</span>
                                <p className="text-sm text-stone-500">
                                  {eventType === "single"
                                    ? "1 day"
                                    : `${numberOfNights} ${numberOfNights === 1 ? "day" : "days"}`}
                                </p>
                              </div>
                              <span className="font-bold text-rose-950 text-lg">${venueTotal}</span>
                            </div>

                            {eventType === "multi" && needRooms && Object.keys(selectedRooms).length > 0 && (
                              <div className="space-y-2 pb-2 border-b border-stone-200">
                                <p className="text-sm font-semibold text-rose-950 mb-2">
                                  Accommodation ({numberOfNights} {numberOfNights === 1 ? "night" : "nights"}):
                                </p>
                                {Object.entries(selectedRooms).map(([roomId, quantity]) => {
                                  const room = rooms.find((r) => r.id === roomId)
                                  if (!room) return null
                                  const roomTotalPrice = room.price * quantity * numberOfNights
                                  return (
                                    <div key={roomId} className="flex justify-between text-sm pl-3">
                                      <span className="text-stone-600">
                                        {room.name} x {quantity} ({numberOfNights}{" "}
                                        {numberOfNights === 1 ? "night" : "nights"})
                                      </span>
                                      <span className="text-rose-950 font-semibold">${roomTotalPrice}</span>
                                    </div>
                                  )
                                })}
                              </div>
                            )}

                            <div className="flex justify-between items-center pt-3">
                              <span className="text-xl font-bold text-rose-950">Total Amount</span>
                              <div className="text-right">
                                <span className="text-3xl font-bold text-amber-600">${totalPrice}</span>
                                <p className="text-sm text-stone-500">
                                  {eventType === "single"
                                    ? "for 1 day"
                                    : `for ${numberOfNights} ${numberOfNights === 1 ? "night" : "nights"}`}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      <Button
                        className="w-full bg-gradient-to-r from-rose-800 to-red-900 hover:from-rose-900 hover:to-red-950 text-white h-14 text-lg font-bold shadow-lg transition-all duration-300 hover:shadow-xl"
                        onClick={() => setStep(2)}
                        disabled={!isDateSelected || !selectedVenue}
                      >
                        Continue to Contact Details
                      </Button>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-8">
                      <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-rose-950 mb-3">
                          Contact Information
                        </h2>
                        <p className="text-stone-500 text-lg">Tell us about your event</p>
                      </div>

                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div>
                          <Label className="text-rose-950 mb-2 block font-bold">Organization/Company *</Label>
                          <Input
                            className="border-2 border-stone-200 h-14 hover:border-amber-400 transition-colors bg-white"
                            placeholder="ABC Corporation"
                            value={formData.organization}
                            onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label className="text-rose-950 mb-2 block font-bold">Event Name *</Label>
                          <Input
                            className="border-2 border-stone-200 h-14 hover:border-amber-400 transition-colors bg-white"
                            placeholder="Annual Conference 2024"
                            value={formData.eventName}
                            onChange={(e) => setFormData({ ...formData, eventName: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label className="text-rose-950 mb-2 block font-bold">Contact Person *</Label>
                          <Input
                            className="border-2 border-stone-200 h-14 hover:border-amber-400 transition-colors bg-white"
                            placeholder="John Doe"
                            value={formData.contactPerson}
                            onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label className="text-rose-950 mb-2 block font-bold">Position</Label>
                          <Input
                            className="border-2 border-stone-200 h-14 hover:border-amber-400 transition-colors bg-white"
                            placeholder="Event Manager"
                            value={formData.position}
                            onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label className="text-rose-950 mb-2 block font-bold">Email *</Label>
                          <Input
                            className="border-2 border-stone-200 h-14 hover:border-amber-400 transition-colors bg-white"
                            type="email"
                            placeholder="john@company.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label className="text-rose-950 mb-2 block font-bold">Phone *</Label>
                          <Input
                            className="border-2 border-stone-200 h-14 hover:border-amber-400 transition-colors bg-white"
                            type="tel"
                            placeholder="+1 (555) 123-4567"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          />
                        </div>
                        <div className="sm:col-span-2 lg:col-span-3">
                          <Label className="text-rose-950 mb-2 block font-bold">Event Details & Special Requests</Label>
                          <textarea
                            className="w-full border-2 border-stone-200 rounded-xl p-4 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-amber-400 hover:border-amber-400 transition-colors resize-none bg-white"
                            placeholder="Please provide details about your event, required equipment, catering needs, setup preferences, etc."
                            value={formData.details}
                            onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <Button
                          variant="outline"
                          className="flex-1 border-2 border-rose-800 text-rose-800 h-14 text-lg font-semibold hover:bg-rose-800 hover:text-white transition-all bg-transparent"
                          onClick={() => setStep(1)}
                        >
                          Back
                        </Button>
                        <Button
                          className="flex-1 bg-gradient-to-r from-rose-800 to-red-900 hover:from-rose-900 hover:to-red-950 text-white h-14 text-lg font-bold shadow-lg transition-all duration-300"
                          onClick={() => setStep(3)}
                          disabled={
                            !formData.organization ||
                            !formData.eventName ||
                            !formData.contactPerson ||
                            !formData.email ||
                            !formData.phone
                          }
                        >
                          Continue to Review
                        </Button>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-8">
                      <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-rose-950 mb-3">
                          Review & Confirm
                        </h2>
                        <p className="text-stone-500 text-lg">Please review your booking details</p>
                      </div>

                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Event Details */}
                        <div className="bg-rose-50 p-6 rounded-2xl border-2 border-rose-200">
                          <h3 className="font-bold text-rose-950 mb-4 text-lg flex items-center gap-2">
                            <CalendarIcon className="w-5 h-5 text-amber-600" />
                            Event Details
                          </h3>
                          <div className="space-y-3 text-sm">
                            <div className="flex justify-between pb-2 border-b border-rose-200">
                              <span className="text-stone-500">Event Type</span>
                              <span className="text-rose-950 font-semibold">
                                {eventType === "single" ? "Single Day" : "Multi-Day"}
                              </span>
                            </div>
                            {eventType === "single" && selectedDate && (
                              <div className="flex justify-between pb-2 border-b border-rose-200">
                                <span className="text-stone-500">Date</span>
                                <span className="text-rose-950 font-semibold">
                                  {selectedDate.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  })}
                                </span>
                              </div>
                            )}
                            {eventType === "multi" && (
                              <>
                                <div className="flex justify-between pb-2 border-b border-rose-200">
                                  <span className="text-stone-500">Check-in</span>
                                  <span className="text-rose-950 font-semibold">
                                    {checkInDate?.toLocaleDateString("en-US", {
                                      month: "short",
                                      day: "numeric",
                                      year: "numeric",
                                    })}
                                  </span>
                                </div>
                                <div className="flex justify-between pb-2 border-b border-rose-200">
                                  <span className="text-stone-500">Check-out</span>
                                  <span className="text-rose-950 font-semibold">
                                    {checkOutDate?.toLocaleDateString("en-US", {
                                      month: "short",
                                      day: "numeric",
                                      year: "numeric",
                                    })}
                                  </span>
                                </div>
                                <div className="flex justify-between pb-2 border-b border-rose-200">
                                  <span className="text-stone-500">Duration</span>
                                  <span className="text-amber-600 font-bold">
                                    {numberOfNights} {numberOfNights === 1 ? "Night" : "Nights"}
                                  </span>
                                </div>
                              </>
                            )}
                            <div className="flex justify-between pb-2 border-b border-rose-200">
                              <span className="text-stone-500">Venue</span>
                              <span className="text-rose-950 font-semibold">{selectedVenueData?.name}</span>
                            </div>
                            <div className="flex justify-between pb-2 border-b border-rose-200">
                              <span className="text-stone-500">Capacity</span>
                              <span className="text-rose-950">{selectedVenueData?.capacity} people</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-stone-500">Expected Attendees</span>
                              <span className="text-rose-950 font-semibold">{attendees}</span>
                            </div>
                          </div>
                        </div>

                        {/* Contact Info */}
                        <div className="bg-amber-50 p-6 rounded-2xl border-2 border-amber-200">
                          <h3 className="font-bold text-rose-950 mb-4 text-lg">Contact Information</h3>
                          <div className="space-y-3 text-sm">
                            <div>
                              <span className="text-stone-500 block mb-1">Organization</span>
                              <span className="text-rose-950 font-semibold">{formData.organization}</span>
                            </div>
                            <div>
                              <span className="text-stone-500 block mb-1">Event Name</span>
                              <span className="text-rose-950 font-semibold">{formData.eventName}</span>
                            </div>
                            <div>
                              <span className="text-stone-500 block mb-1">Contact Person</span>
                              <span className="text-rose-950">{formData.contactPerson}</span>
                              {formData.position && <span className="text-stone-500"> - {formData.position}</span>}
                            </div>
                            <div>
                              <span className="text-stone-500 block mb-1">Email</span>
                              <span className="text-rose-950">{formData.email}</span>
                            </div>
                            <div>
                              <span className="text-stone-500 block mb-1">Phone</span>
                              <span className="text-rose-950">{formData.phone}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Accommodation */}
                      {eventType === "multi" && needRooms && Object.keys(selectedRooms).length > 0 && (
                        <div className="bg-rose-50 p-6 rounded-2xl border-2 border-rose-200">
                          <h3 className="font-bold text-rose-950 mb-4 text-lg flex items-center gap-2">
                            <BedIcon className="w-5 h-5 text-amber-600" />
                            Accommodation ({numberOfNights} {numberOfNights === 1 ? "night" : "nights"})
                          </h3>
                          <div className="space-y-2">
                            {Object.entries(selectedRooms).map(([roomId, quantity]) => {
                              const room = rooms.find((r) => r.id === roomId)
                              if (!room) return null
                              return (
                                <div key={roomId} className="flex justify-between items-center p-3 bg-white rounded-lg">
                                  <div>
                                    <span className="text-rose-950 font-semibold">{room.name}</span>
                                    <p className="text-sm text-stone-500">
                                      {quantity} {quantity === 1 ? "room" : "rooms"} x ${room.price}/night x{" "}
                                      {numberOfNights} {numberOfNights === 1 ? "night" : "nights"}
                                    </p>
                                  </div>
                                  <span className="text-rose-950 font-bold text-lg">
                                    ${room.price * quantity * numberOfNights}
                                  </span>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )}

                      {/* Total Pricing */}
                      <div className="bg-gradient-to-br from-rose-800 via-red-900 to-rose-900 p-8 rounded-2xl shadow-xl">
                        <div className="space-y-4">
                          <div className="flex justify-between items-center text-white/90 pb-3 border-b border-white/20">
                            <span className="text-lg">
                              Venue ({numberOfDays} {numberOfDays === 1 ? "day" : "days"})
                            </span>
                            <span className="text-xl font-bold">${venueTotal}</span>
                          </div>
                          {roomTotal > 0 && (
                            <div className="flex justify-between items-center text-white/90 pb-3 border-b border-white/20">
                              <span className="text-lg">Accommodation</span>
                              <span className="text-xl font-bold">${roomTotal}</span>
                            </div>
                          )}
                          <div className="flex justify-between items-center pt-2">
                            <span className="text-2xl font-bold text-white">Total Amount</span>
                            <div className="text-right">
                              <span className="text-4xl font-bold text-amber-400">${totalPrice}</span>
                              <p className="text-sm text-white/70">
                                {eventType === "single"
                                  ? "for 1 day"
                                  : `for ${numberOfNights} ${numberOfNights === 1 ? "night" : "nights"}`}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-5">
                        <p className="text-sm text-rose-950 leading-relaxed">
                          <strong className="text-amber-700">Important:</strong> This is a reservation request. Our
                          dedicated team will contact you within 24 hours to confirm availability and finalize all
                          booking details. We look forward to hosting your event at Vencios Garden!
                        </p>
                      </div>

                      <div className="flex gap-4">
                        <Button
                          variant="outline"
                          className="flex-1 border-2 border-rose-800 text-rose-800 h-14 text-lg font-semibold hover:bg-rose-800 hover:text-white transition-all bg-transparent"
                          onClick={() => setStep(2)}
                        >
                          Back
                        </Button>
                        <Button className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white h-14 text-lg font-bold shadow-lg transition-all duration-300">
                          Submit Reservation Request
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
